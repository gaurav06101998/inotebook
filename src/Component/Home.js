import React from "react";
import AddNote from "./AddNote";


function Home(props) {
  const {showAlert} =props
  return (
   <AddNote showAlert={showAlert} />
  );
}

export default Home;
