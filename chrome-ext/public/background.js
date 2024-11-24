function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSearchResults') {
    (async () => {
      try {
        const schoolData = await getSchoolInfo(request.textInput); // Assuming getSchoolInfo is defined elsewhere
        const schoolNamesAndIds = schoolData.map(({ node }) => ({
          id: node.id,
          name: node.name,
        }));

        console.log('Sending response:', schoolNamesAndIds);
        sendResponse({ school_names_and_id: schoolNamesAndIds });
      } catch (error) {
        console.error('Error fetching school data:', error);
        sendResponse({ error: 'Failed to fetch school data' });
      }
    })();

    return true; // Indicate the listener will send a response asynchronously
  }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'rate_professor') {
        // This function must be marked as async to use await inside it.
        (async () => {
            try {
                // Await the result of the API call
                
                const professor_data = await GetProfessorRating(request.professor, 'U2Nob29sLTYwMQ==');
                //console.log(JSON.stringify(professor_data, null, 2))
                //console.log(professor_data.firstName);
                
                // Accessing specific values
                const avgDifficultyRounded = professor_data.avgDifficultyRounded;
                const avgRatingRounded = professor_data.avgRatingRounded;
                const department = professor_data.department;
                const school = professor_data.school.name;

                const numRatings = professor_data.numRatings;
                //const schoolName = professor_data.school.name;
                const wouldTakeAgainPercentRounded = professor_data.wouldTakeAgainPercentRounded;
                const fullName = professor_data.firstName + " " + professor_data.lastName;
                                
                // Access the ratings array
                const ratingsArray = professor_data.ratings.edges;
                
                // Initialize an array to hold the extracted ratings information
                const extractedRatings = [];
                const tagsArray = [];

                // Iterate through the ratings and extract relevant data
                ratingsArray.forEach(ratingEdge => {
                    const rating = ratingEdge.node;

                    // Create an object with all relevant information from each rating
                    const ratingInfo = {
                        attendanceMandatory: rating.attendanceMandatory,
                        class: rating.class,
                        comment: rating.comment,
                        date: rating.date,
                        difficultyRatingRounded: rating.difficultyRatingRounded,
                        isForOnlineClass: rating.isForOnlineClass,
                        qualityRating: rating.qualityRating,
                        thumbsDownTotal: rating.thumbsDownTotal,
                        thumbsUpTotal: rating.thumbsUpTotal
                    };

                    // Push the rating info object into the extractedRatings array
                    extractedRatings.push(ratingInfo);
                });

                professor_data.teacherRatingTags.forEach(tag => {
                  const inputTag = {
                    tagName: tag.tagName,
                    tagCount: tag.tagCount,
                  }
                  tagsArray.push(inputTag);
                });
                console.log(tagsArray);
                //console.log(extractedRatings)
                
                sendResponse({fullName, department, avgDifficultyRounded, avgRatingRounded, wouldTakeAgainPercentRounded, numRatings, extractedRatings, school, tagsArray});
            } catch (error) {
                console.error('Error fetching professor data:', error);
                sendResponse({ error: 'Failed to fetch professor data' });
            }
        })();
        return true; // Indicates that you want to send a response asynchronously
    }
});


function getSchoolIDQuery(schoolName){
    const schoolQuery = 
    `{
    newSearch {
        schools(query: {text:"${schoolName}"},first:5) {
        edges{
            node{
                id
                name
            }
        }
    }
}}`
  return schoolQuery;
};


function GetProfessorRatingQuery(professorName, schoolID) {
    return `
    query {
      newSearch {
        teachers(query: { text: "${professorName}", schoolID: "${schoolID}" }, first: 1) {
          edges {
            node {
              id
              firstName
              lastName
              school {
                name
              }
              avgDifficultyRounded
              avgRatingRounded
              wouldTakeAgainPercentRounded
              department
              numRatings
              teacherRatingTags{
                tagName
                tagCount
              }
              ratings {
                edges {
                  node {
                    class
                    attendanceMandatory
                    qualityRating
                    difficultyRatingRounded
                    comment
                    thumbsDownTotal
                    thumbsUpTotal
                    date
                    isForOnlineClass
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}


async function getJSON(query) {
    try {
      const response = await fetch('https://www.ratemyprofessors.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Basic dGVzdDp0ZXN0', // Ensure this is your actual token
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
      //console.log(JSON.stringify(result, null, 2)); // Pretty print JSON result
    } catch (error) {
      console.error('Error:', error);
    }
};


  async function getSchoolInfo(schoolName) {
    try { 
      const query = getSchoolIDQuery(schoolName);
      const result = await getJSON(query);

      if (result.data && result.data.newSearch && result.data.newSearch.schools && result.data.newSearch.schools.edges.length > 0) {
        const schoolInfo = result.data.newSearch.schools.edges;
        //console.log(JSON.stringify(schoolInfo));
        return schoolInfo;
        //console.log('School ID:', schoolID);
      } else {
        console.log('No school found or no ID available.');
      }
    } catch (error) {
      console.error('Error retrieving school ID:', error);
    }
  };



  async function GetProfessorRating(professorName, schoolIDInput) {
    const schoolID = await schoolIDInput;
    console.log(`Fetching rating for Professor ${professorName} at ${schoolID}`);
    try { 
      const query = GetProfessorRatingQuery(professorName, schoolID);
      //console.log(query)
      result = await getJSON(query);
      result = result.data.newSearch.teachers.edges[0].node
      //console.log('Result:', JSON.stringify(result, null, 2));
    
      return result;
    }
    catch (error) {
      console.error('Error retrieving school ID:', error);
      throw new Error('Error retrieving school ID:', error)
    }
  };
  
 /* async function main(){
    const start = Date.now();

    schoolID = getSchoolID("Michigan State University");
    await GetProfessorRating("Richard Enbody", schoolID);

    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
};

main();
*/