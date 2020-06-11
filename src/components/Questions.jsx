import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import QuestionBox from "./QuestionBox";

const Question = ({currentUser}) => {
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [currentQuestion,setCurrentQuestion] = useState([]);
    const [answerInput,setAnswerInput] = useState([]);
    const [startHide,setStartHide] = useState([]);
    const [startShow,setStartShow] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [score,setScore] = useState(0);
    //const [score,setScore] = useState(0);

    //const [user, setUser] = useState([]);
    
    var logUserId = localStorage.getItem("logUserId");
    var logUserName = localStorage.getItem("logUserName");
    var logUserScore = {
        score1: -1,
        score2: -1,
        score3: -1
    }

    useEffect(() => {
      //console.log(logUserId);
      const fetchData = async () => {
        const db = firebase.firestore();
        const quizData = await db.collection("quiz").get();
        //const userData = await db.collection("users").get();
        setQuiz(quizData.docs.map((doc) => doc.data()));
        //setUser(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      fetchData();
    }, []);

    const startQuiz= () => {
      setCurrentQuestion(quiz[currentQuestionIndex]);
      setStartHide("hide");
      setStartShow("show");
    }

    const answerSet=(e)=>{
      setAnswerInput(e.target.value);
    }

    const setNextQuestion = () =>{
      if(currentQuestionIndex<quiz.length){
        setCurrentQuestionIndex(currentQuestionIndex+1);
        setCurrentQuestion(quiz[currentQuestionIndex]);
        checkQuestion();
      }else{
        // alert(score);
        scoreInitialize();
      }
    }

    const checkQuestion = () =>{
      if(answerInput!=0){
        if(answerInput==currentQuestion.ansC){
          setScore(score+1);
          console.log("correct");
        }else{
          console.log("incorrect");
        }
        //alert(score);
      }else{
        alert("Select an answer");
      }
    }

    const scoreInitialize =()=>{
      if(logUserScore.score1<0){
        logUserScore.score1=score;
        console.log(logUserScore.score1);
      }else if(logUserScore.score2<0){
        logUserScore.score2=score;
        //alert(logUserScore.score2);
      }else if(logUserScore.score2<0){
        logUserScore.score3=score;
        //alert(logUserScore.score3);
      }
      
    }

    const addUserScore = () => {
      const db = firebase.firestore();
      db.collection("users").add({ username: logUserName, });
      db.collection("users").doc(logUserId).set({
        username: logUserName,
        score1: logUserScore.score1,
        score2: logUserScore.score2,
        score3: logUserScore.score3
    })
      //setSpells([...spells, { name: newSpellName }]);
    };

      return (
        <div>
                <div className="user-info">
                  <button className="signout-btn" onClick={() => firebase.auth().signOut()}>Logout</button>
                  <h5 className="user-name">User : {logUserName}</h5>
                </div>
                <QuestionBox startShow={startShow} startHide={startHide} answerSet={answerSet} setNextQuestion={setNextQuestion} currentQuestion={currentQuestion} startQuiz={startQuiz}/>
                {/* <button 
                    onClick={
                        function onSubmit({}){
                            //alert(quiz.ansC+" : "+answerInput);
                            //const db = firebase.firestore();
                            if(answerInput==quiz.ansC){
                              //setScore();
                              alert("Correct!");
                              //db.collection("users").doc(user.id).set({ ...user, score });
                            }
                            else{
                              alert("Incorrect!");
                              //alert(answerInput);
                            }
                          }
                    }>Submit
                </button> */}
                
        </div>
      );
}

export default Question;