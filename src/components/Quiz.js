import React from "react"
import Question from "./Question"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

export default function Quiz(props) {

    const [quizData, setQuizData] = React.useState(getInitialData())
    const [numberOfCorrectResults, setNumberOfCorrectResults] = React.useState(0)

    const { allQuestions, isCompleted, setIsCompleted, restarted, setRestarted } = props

    function getInitialData() {
        const newArr = []
        for (let i = 0; i < props.allQuestions.length; i++) {
            newArr.push({
                name: `question${i}`,
                correctAnswer: decode(props.allQuestions[i].correctAnswer),
                isChosen: "",
                isCorrect: false,
                isWrong: false,
            })
        }
        return newArr
    }

    function updateData(event) {
        const { name, value } = event.target
        setQuizData(prevData => prevData.map(data => {
            return name === data.name ? {
                ...data,
                isChosen: value,
            } : data
        }))
    }

    function checkAnswers() {
        const allCorrectAnswers = []
        props.allQuestions.map(q => {
            allCorrectAnswers.push(q.correctAnswer)
        })

        for (let i = 0; i < allCorrectAnswers.length; i++) {

            if (allCorrectAnswers[i] !== quizData[i].isChosen) {
                setQuizData(prevData => prevData.map(data => {
                    return (allCorrectAnswers[i] === data.correctAnswer) ?
                        {
                            ...data,
                            isWrong: !data.isWrong
                        } : data
                }))
            } else if (allCorrectAnswers[i] === quizData[i].isChosen) {
                setQuizData(prevData => prevData.map(data => {
                    return (allCorrectAnswers[i] === data.correctAnswer) ?
                        {
                            ...data,
                            isCorrect: !data.isCorrect
                        } : data
                }))
            } else if (quizData[i].isChosen === "") {
                return
            }
        }
    }

    React.useEffect(() => {
        const numberOfCorrectResults = []
        quizData.map(q => q.isCorrect ? numberOfCorrectResults.push(q) : "")
        setNumberOfCorrectResults(numberOfCorrectResults.length)
    }, [isCompleted])

    function renderResults(event) {
        event.preventDefault()
        checkAnswers()
        setIsCompleted(true)
    }

    function resetQuiz(event) {
        event.preventDefault()
        setRestarted(prevData => !prevData)
        setIsCompleted(false)
    }

    React.useEffect(() => {
        setQuizData(getInitialData())
    }, [props.allQuestions])

    // console.log(quizData)

    const allQuestionsElement = props.allQuestions.map(q => {
        const { question, allAnswers } = q
        const index = props.allQuestions.indexOf(q)
        return (
            <Question
                key={nanoid()}
                question={question}
                allAnswers={allAnswers}
                quizData={quizData}
                name={"question" + index}
                updateData={updateData}
                questionNumber={index}
                isCompleted={isCompleted}
            />
        )
    })

    return (
        <form className="quiz--form">
            {allQuestionsElement}
            {isCompleted && <h3 className="quiz--result">You scored {numberOfCorrectResults} of {quizData.length} correct answers</h3>}
            {!isCompleted && <button className="quiz--btn" onClick={renderResults}>CHECK ANSWERS</button>}
            {isCompleted && <button className="quiz--btn" onClick={resetQuiz}>CONTINUE</button>}
        </form>
    )
}
