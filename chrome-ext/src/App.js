import logo from './logo.svg';
import './App.css';

function App1() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-6xl'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function App(){
  return(
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Extension Overlay</h2>
      <button class="btn btn-sm btn-circle btn-ghost" onclick="closeOverlay()">✕</button>
      </div>
      <div class="mb-6">
        <p class="text-gray-600">This is a simple Chrome extension overlay using Tailwind CSS and DaisyUI. You can add any content you need here.</p>
        </div>
        <div class="space-y-4">
          <button class="btn btn-primary w-full">Primary Action</button>
          <button class="btn btn-secondary w-full">Secondary Action</button>
          </div>
          <div class="mt-6 text-center">
            <button class="btn btn-link text-gray-500" onclick="closeOverlay()">Cancel</button>
            </div>
            </div>
            </div>
  );}


export default App;
