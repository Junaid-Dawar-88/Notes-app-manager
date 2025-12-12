import React from "react";
import Ui from "./ui/Ui";
import NotesData from "./component/notes-data/NotesData";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return <div>{user ? <NotesData /> : <Ui />}</div>;
};

export default App;
