import React from 'react'


const CustomButton = ({ btnText, clickedAnswer, onSelectedAnswer }) => {

    const styles = {
        clicked : {
            color: '#fff',
            backgroundColor: '#FEBD23'  
        },
        notClicked : {
            color: '#fff',
            backgroundColor : '#FFD778'
        }
    }

    // on button click the parent function given as a prop is called with btnText as the parameter
    const onAnswerOptionClick = () => {
        onSelectedAnswer(btnText)
    }
    
    // assign css-class according to clicked or not clicked button
    const btn_classname = (btnText === clickedAnswer) ? styles.clicked : styles.notClicked

    return (
        <div>
            <button
                style={btn_classname}
                onClick={onAnswerOptionClick}>
                {btnText}
            </button>
        </div>
    )
}

export default CustomButton