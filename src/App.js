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

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route exact path="/about" element={<About />}></Route>
    </Routes>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
