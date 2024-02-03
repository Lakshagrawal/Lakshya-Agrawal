import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar'
// import Xyz from './components/Xyz'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container">
      <Home></Home>
      {/* <Xyz></Xyz> */}
      </div>
     
    </div>
  );
}

export default App;
