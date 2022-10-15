import React from "react"

export default function Welcome(props) {
    return (
        <main className="welcome--main">
            <h1 className="welcome--title">Quizzical</h1>
            <p className="welcome--subtitle">5 easy questions to flex your brain</p>
            <button className="welcome--btn" onClick={props.startGame}>START!</button>
        </main>
    )
}