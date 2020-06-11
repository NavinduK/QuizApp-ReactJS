import React from 'react';

const QuestionBox = ({currentQuestion,answerSet,startQuiz,setNextQuestion,startDisplay,quesDisplay}) => {

    return (
        <div>
            <div className={startDisplay}>
                <div className="button-container">
                    <button className="btn1" onClick={startQuiz}><span>Start</span> </button>
                </div>
                
            </div>
            <div style={{display: 'none'}} className={quesDisplay} id="questionBox">
                <div className="quiz-container">
                    <div>
                        <div className="question">
                            <h4 id="q">{currentQuestion?.ques}</h4>
                        </div>
                        <div>
                            <button value="1" onClick={answerSet}>{currentQuestion?.ans1}</button>
                            <button value="2" onClick={answerSet}>{currentQuestion?.ans2}</button>
                        </div>
                        <div>
                            <button value="3" onClick={answerSet}>{currentQuestion?.ans3}</button>
                            <button value="4" onClick={answerSet}>{currentQuestion?.ans4}</button>
                        </div>
                        <button className="next-button" onClick={setNextQuestion}>Next Question</button>
                    </div>
                </div>
            </div>
            <ul className="bg-bubbles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
    </div>
    );
}

export default QuestionBox;