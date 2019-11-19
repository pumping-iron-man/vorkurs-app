import React from 'react'

import './Start.css'


const StartView = ({ history }) => {

    // the user is taken to the first question of the game
    const onQuizStart = () => {
        history.push('/game/1')
    }
 
    // a react fragment is amongst other things used to avoid the use of an extra div
    return (
        <React.Fragment>
            <h1 id="startTitle">Vorkurs Quiz</h1>
            <p id="startSubtitle">Teste dein Wissen mit nur zehn Fragen</p>
            <button id="startBtn" onClick={onQuizStart}>Quiz starten</button>
        </React.Fragment>
    )
}

export default StartView;