import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "./firebase";
import Questions from "./components/Questions";

const App = () => {
  const [quiz, setQuiz] = useState([]);
  const [user, setUser] = useState([]);
  //const [answer, setAnswer] = useState([]);
  

  useEffect(() => {

    const fetchData = async () => {
      const db = firebase.firestore();
      const quizData = await db.collection("quiz").get();
      const userData = await db.collection("users").get();
      setQuiz(quizData.docs.map((doc) => doc.data()));
      setUser(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Questions quiz={quiz}/>
    </div>
  );
}

export default App;
