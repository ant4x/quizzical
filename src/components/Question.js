import React from "react"
import { decode } from "html-entities"

export default function Question(props) {

    const { question, allAnswers, quizData, 
    name, updateData, questionNumber, isCompleted} = props

    function renderInput(i) {
        const inputEl = decode(allAnswers[i])
        
        const styles = {
        backgroundColor: quizData[questionNumber].isCorrect &&
         quizData[questionNumber].isChosen === inputEl ? 
         "#94D7A2" : 
         quizData[questionNumber].isWrong &&
         quizData[questionNumber].isChosen === inputEl ? 
         "#F8BCBC" : ""
    }
    
        return (
            <div>
                <input
                    className="quiz--input"
                    type="radio"
                    id={inputEl}
                    name={name}
                    value={inputEl}
                    checked={quizData[questionNumber].isChosen === `${inputEl}`}
                    onChange={updateData}
                    disabled={isCompleted}
                />
                <label
                    htmlFor={inputEl} className="quiz--label" style={styles}> {inputEl}
                </label>
            </div>
        )
    }

    return (
        <div className="quiz--question-el">
            <h1 className="quiz--question-title">{decode(question)}</h1>
            <div className="quiz--allInputs-block">
                <span>{renderInput(0)}</span>
                <span>{renderInput(1)}</span>
                <span>{renderInput(2)}</span>
                <span>{renderInput(3)}</span>
            </div>
        </div>
    )
}