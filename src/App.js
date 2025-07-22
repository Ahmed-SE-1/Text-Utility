import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Alert from './components/Alert';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  const[mode, setMode] = useState("light")
  const[alertMode, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },3000);
  }

  const toggleMode =()=>{
    if(mode === 'light'){
      setMode("dark");
      document.body.style.backgroundColor = 'rgb(4, 4, 109)';
      showAlert("Dark Mode Enable","success")
      setInterval(() => {
        document.title = 'Text Utility is amazing  experience'
      }, 3000);
      setTimeout(() => {
        document.title = 'Text Utility is amazing  experience'
      }, 5000);
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enable","success")
      setInterval(() => {
        document.title = 'Text Utility'
      }, 3000);
    }
  }

  return (
    <>
    <Router>
      <Navbar title="HERMOINE" aboutText="About" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alertMode}/>
      <div className='container'>
      <Routes>
          <Route exact path="/" element={<Textform heading="Enter Text To Analyze" mode={mode} />}>
          </Route>
          <Route exact path="/about" element={ <About mode={mode} />}>
          </Route>
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
