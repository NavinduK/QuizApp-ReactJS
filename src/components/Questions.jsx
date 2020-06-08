import React, {useState } from "react";
import firebase from "../firebase";

const Questions = ({quiz}) => {
    const [score, setScore] = useState([]);
    var answerInput=0;

      return (
        <div>
            
          {quiz.map((quiz) => (
            <div key={quiz.ques}>
              <h4>{quiz.ques}</h4>
              
                <label><input type="radio" name="ans" value="1" onChange={(e) => answerInput=e.target.value}/> {quiz.ans1}</label>
                <label><input type="radio" name="ans" value="2" onChange={(e) => answerInput=e.target.value}/> {quiz.ans2}</label>
                <label><input type="radio" name="ans" value="3" onChange={(e) => answerInput=e.target.value}/> {quiz.ans3}</label>
                <label><input type="radio" name="ans" value="4" onChange={(e) => answerInput=e.target.value}/> {quiz.ans4}</label>

                <button 
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
                </button>
              
            </div>
          ))}
          
        </div>
      );
}

export default Questions;