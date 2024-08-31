function handleMessage(request, sender, sendResponse) {
    if (request.action === 'getSelection') {
      const selectedText = window.getUniversalSelection();
      sendResponse({ selection: selectedText});
    }
  }


  document.addEventListener('DOMContentLoaded', function() {
    // Get references to the input field and button
    const searchInput = document.getElementById('search-input');
    const selectButton = document.getElementById('select_school');

    // Add event listener to the button
    selectButton.addEventListener('click', function() {
        // Get the value from the input field
        const inputValue = searchInput.value.trim();

        // Save the input value (you can save it to local storage, send it to background script, etc.)
        console.log('Selected School:', inputValue);

        // Example: Save to local storage
        chrome.storage.local.set({ selectedSchool: inputValue }, function() {
            console.log('School name saved:', inputValue);
        });

        // You can also close the popup if needed
        // window.close();
    });
  });

// Attach an event listener to the button


  // Handle messages if running in content script context
  if (window.location.href) {
    chrome.runtime.onMessage.addListener(handleMessage);
  }

  
  // Handle popup interactions
  if (document.getElementById('get-selection')) {
    document.getElementById('get-selection').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
          const selectedText = response.selection || 'No text selected';
  
          // Send selected text to background script to reverse it
          chrome.runtime.sendMessage({ action: 'rate_professor', professor: selectedText}, (response) => {
          
  
            // Load existing accordion data
            chrome.storage.local.get(['accordionData'], (result) => {
              accordionData = result.accordionData || [];
  
              // Append new text to the data array
              num_stars = []
              for (let i = 0; i < 5; i++){
                if(i < response.avgRatingRounded){
                  num_stars.push("enabled");
                }
                else{
                  num_stars.push("disabled");
                }
              }
              //console.log("YOOOO " + response.numRatings);
              accordionData.push(
                { prof_name: response.fullName, 
                  num_stars: num_stars, 
                  avgRating : response.avgRatingRounded,
                  department: response.department, 
                  difficulty : response.avgDifficultyRounded, 
                  numRatings : response.numRatings,
                  TAP: response.wouldTakeAgainPercentRounded, 
                  ratings : response.extractedRatings,
                },
              );

              
              // Save updated accordion data
              chrome.storage.local.set({ accordionData: accordionData }, () => {
                // Render the updated accordion
                renderAccordion(accordionData);
              });
            });
          });
        });
      });
    });
  }
  
  if (document.getElementById('clear-accordion')) {
    document.getElementById('clear-accordion').addEventListener('click', () => {
      // Clear accordion data from storage
      chrome.storage.local.remove('accordionData', () => {
        const container = document.getElementById('accordion-container');
        if (container) {
          container.innerHTML = ''; // Clear all accordion collapses
        }
      });
    });
  }
  
  // Function to render the accordion
  function renderAccordion(accordionData) {
    const container = document.getElementById('accordion-container');
    container.innerHTML = ''; // Clear existing accordions
  
    accordionData.forEach(data =>{
      const newAccordion = `
        <div class="collapse collapse-arrow rounded mb-2" style="background-color: rgb(28, 33, 43); color: rgb(122, 193, 187); width: 100%; max-width: 600px;">
          <input type="checkbox" />
          <div class="collapse-title justify-between text-xl font-medium px-6 py-4 flex items-center">${data['prof_name']}
            <div class="rating ml-4 flex pointer-events-none mr-5">
              <input type="radio" name="rating-1" class="mask mask-star-2 bg-red-400 mr-1" ${data['num_stars'][0]}/>
              <input type="radio" name="rating-2" class="mask mask-star-2 bg-red-400 mr-1" ${data['num_stars'][1]}/>
              <input type="radio" name="rating-3" class="mask mask-star-2 bg-red-400 mr-1" ${data['num_stars'][2]}/>
              <input type="radio" name="rating-4" class="mask mask-star-2 bg-red-400 mr-1" ${data['num_stars'][3]}/>
              <input type="radio" name="rating-5" class="mask mask-star-2 bg-red-400 mr-1" ${data['num_stars'][4]}/>
            </div>
          </div>
          <div class="collapse-content">
          
            <div class="flex flex-col items-center rounded text-center p-4" style="background-color: rgb(28, 33, 43);">
              <p class="text-center mb-4 font-bold text-lg">${"Department: "+data['department']}</p>


              <div class="stats shadow w-full">
                <div class="stat place-items-center flex-1">
                  <div class="stat-title text-xs">Number of Ratings</div>
                  <div class="stat-value text-sm">${data['numRatings']}</div>
                </div>

                <div class="stat place-items-center flex-1">
                  <div class="stat-title text-xs">Take Again Percentage</div>
                  <div class="stat-value text-secondary text-sm">${data['TAP'] + "%"}</div>
                </div>

                <div class="stat place-items-center flex-1">
                  <div class="stat-title text-xs">Average Difficulty</div>
                  <div class="stat-value text-sm">${Math.round(data['difficulty'] * 10) / 10}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      `;
      container.insertAdjacentHTML('beforeend', newAccordion);
    });
  }
  
  // Load accordion data on popup open
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['accordionData'], (result) => {
      const accordionData = result.accordionData || [];
      renderAccordion(accordionData);
    });
  });



  function getUniversalSelection() {
    let selection = document.getSelection().toString().trim();

    if (!selection) {
        // Check Shadow DOMs
        const allShadowRoots = document.querySelectorAll('*');
        allShadowRoots.forEach(element => {
            if (element.shadowRoot) {
                selection = element.shadowRoot.getSelection().toString().trim();
                if (selection) return selection;
            }
        });

        // Check within iframes
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
            try {
                const iframeDoc = iframes[i].contentWindow.document;
                selection = iframeDoc.getSelection().toString().trim();
                if (selection) break;
            } catch (e) {
                console.log('Cannot access iframe due to cross-origin restrictions.');
            }
        }
    }

    return selection;
}