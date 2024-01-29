import './App.css';
import About from './Component/About';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import { useState } from 'react';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
  };
  setTimeout(() => {
    setAlert(null);
  }, 1800);
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert  alert={alert} />
    <Routes>
    <Route exact path="/" element={<Home showAlert={showAlert}  />}></Route>
    <Route exact path="/about" element={<About  />}></Route>
    <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
    <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
    </Routes>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
