import './App.css';
import First from './components/First';
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
      <Route exact path='/' element={<First/>} /> 
        <Route exact path='/word/easy' element={<Home level={1}/>} /> 
        <Route exact path='/word/medium' element={<Home level={2}/>} /> 
        <Route exact path='/word/hard' element={<Home level={3}/>} /> 
      </Routes>
    </div>
  );
}

export default App;
