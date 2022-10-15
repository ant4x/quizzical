import React from "react"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"

export default function App() {

    const [started, setStarted] = React.useState(false)
    const [allQuestions, setAllQuestions] = React.useState([])
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [restarted, setRestarted] = React.useState(false)

    //Getting data from the API
    //Rearranging data for future use 
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results.map(obj => {
                const { question, correct_answer, incorrect_answers } = obj
                const allAnswers = [correct_answer, ...incorrect_answers]
                return {
                    question,
                    allAnswers: shuffleResults(allAnswers),
                    correctAnswer: correct_answer
                }
            })))
    }, [restarted])

    //Shuffling order of answers 
    function shuffleResults(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr
    }

    function startGame() {
        setStarted(true)
    }

    return (
        <div>
            {
                started === false ?
                    <Welcome startGame={startGame} /> :
                    <section>
                        <Quiz allQuestions={allQuestions}
                            isCompleted={isCompleted}
                            setIsCompleted={setIsCompleted}
                            setStarted={setStarted}
                            restarted={restarted}
                            setRestarted={setRestarted}
                             />
                    </section>
            }
        </div>
    )
}

// Some ToDos for the project development: 
// 1. Separate DataFetcher in a separate component (using render props?)
// 2. Error handling (catch err and control it in state)
// 3. Add a "Loading..." screen while the data is loading 