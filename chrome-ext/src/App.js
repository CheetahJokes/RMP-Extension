import logo from './logo.svg';
import './App.css';



function App(){
  return(
    <body style="margin: 0; padding: 0; border:none">
    <div style="width: 500px; height: 600px;  display: flex; flex-direction: column; justify-content: space-between; border:none">
    
      <div class = "bg-gray-500 p-4 shadow-lg text-black w-70 h-20 flex items-center justify-center">
        <h2 class=" text-center text-2xl font-bold text-white">Rate My Professor Extension</h2>
      </div>
    
      <div class = " p-4 flex items-center justify-center">
        <button id="get-selection" class = "btn-block flex justify-center mt-4 px-6 py-3 bg-green-800 text-white text-xl rounded">Get Selection</button>
        <script src="popup.js"></script>
      </div>
    </div>
  </body>
  );}


export default App;
