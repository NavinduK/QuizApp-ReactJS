import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import QuestionBox from "./QuestionBox";
import UserInfo from "./UserInfo";
import Results from "./Results";

const Question = ({currentUser}) => {
  // States to Show / Hide child compinents
    const [startDisplay,setStartDisplay] = useState([]);
    const [quesDisplay,setQuesDisplay] = useState([]);
    const [resultDisplay,setResultDisplay] = useState([]);
    const [score2Display,setScore2Display] = useState([]);
    const [score3Display,setScore3Display] = useState([]);
    const [retryDisplay,setRetryDisplay] = useState([]);

    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [currentQuestion,setCurrentQuestion] = useState([]);
    const [answerInput,setAnswerInput] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [score,setScore] = useState(0);
    const [attempts,setAttempts] = useState(1);
    //const [score,setScore] = useState(0);
    //const [user, setUser] = useState([]);
    
    var logUserId = localStorage.getItem("logUserId");
    var logUserName = localStorage.getItem("logUserName");

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
      setCurrentQuestionIndex(0);
      setCurrentQuestion(quiz[0]);
      setResultDisplay("hide");
      setStartDisplay("hide");
      setQuesDisplay("show");
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
          setAnswerInput(0);
        }else{
          console.log("incorrect");
          setAnswerInput(0);
        }
        //alert(score);
      }else{
        alert("Select an answer");
      }
    }

    const scoreInitialize =()=>{
      if(attempts==1){
        localStorage.setItem("score1", score);
        setAttempts(attempts+1);
        setScore(0);
        console.log("s1 "+score);
      }else if(attempts==2){
        localStorage.setItem("score2", score);
        setAttempts(attempts+1);
        setScore(0);
        setScore2Display("show");
        console.log("s2 "+score);
      }else if(attempts==3){
        localStorage.setItem("score3", score);
        setAttempts(attempts+1);
        setScore(0);
        setScore3Display("show");
        addUserScore();
        console.log("s3 "+score);
        setRetryDisplay("hide")
      }
      setQuesDisplay("hide");
      setResultDisplay("show");
    }

    const addUserScore = () => {
      const db = firebase.firestore();
      db.collection("users").doc(logUserId).set({
        id:logUserId,
        email:logUserName,
        score1:localStorage.getItem("score1"),
        score2:localStorage.getItem("score2"),
        score3:localStorage.getItem("score3")
      })
      //setSpells([...spells, { name: newSpellName }]);
    };

      return (
        <div>
                <UserInfo logUserName={logUserName}/>
                <QuestionBox quesDisplay={quesDisplay} startDisplay={startDisplay} answerSet={answerSet} setNextQuestion={setNextQuestion} currentQuestion={currentQuestion} startQuiz={startQuiz}/>
                <Results startQuiz={startQuiz} retryDisplay={retryDisplay} resultDisplay={resultDisplay} score2Display={score2Display} score3Display={score3Display}/>
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