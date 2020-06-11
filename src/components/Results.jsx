import React from 'react';

const Results = ({resultDisplay,score2Display,score3Display,startQuiz,retryDisplay}) => {

    return(
        <div>
            <div style={{display: 'none'}} className={resultDisplay} id="questionBox">
                <div className="result-container">
                    <div className="score-container">
                        <h4>Score 1 : {localStorage.getItem("score1")}</h4>
                        <h4 style={{display: 'none'}} className={score2Display}>Score 2 : {localStorage.getItem("score2")}</h4>
                        <h4 style={{display: 'none'}} className={score3Display}>Score 3 : {localStorage.getItem("score3")}</h4>
                    </div>
                    <div className={retryDisplay}>
                        <button className="btn3" onClick={startQuiz}>Try Again</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;