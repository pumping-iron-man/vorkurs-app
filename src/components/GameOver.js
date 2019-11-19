import React, { Component } from "react";

import './GameOver.css'
import DATA from '../data/app-data'


class GameOverView extends Component {
    
    userAnswers = this.props.location.state.userAnswers || 0

    constructor(props) {
        super(props)
        this.state = ({
            correctAnswers : 0,
            responseText : '',
            responseColor : '',
            answersResponseObj : [],
            correctAnswersObj: []
            
        })
    }

    // get the necessary data from the json file
    componentDidMount = () => {
        this.setState({
            answersResponseObj : DATA.resultcomments,
            correctAnswersObj: DATA.answers
        }, () => this.compareAnswers())
    }

    // according to the userPoints, which are right answers, the comment and the 
    // background color is chosen from the answerResponseObject
    setResponseText = (userPoints) => {
        let responseText = ''
        let responseColor = ''
        const answersResponseObj = this.state.answersResponseObj

        for(let elem=0; elem<answersResponseObj.length; elem++) {
            const responseNumber = answersResponseObj[elem][0]
            if(responseNumber >= userPoints) {
                responseText = answersResponseObj[elem][1]
                responseColor = answersResponseObj[elem][2]
                break
            }
        }
        this.setState({
            responseText,
            responseColor
        })
    }
    
    // the user answers are compared with the correct answers in the correctAnswersObject
    compareAnswers = () => {
        let correctAnswers = 0
        const correctAnswersObj = this.state.correctAnswersObj

        correctAnswersObj.forEach((element, index) => {
            if(element === this.userAnswers[index]) {
                correctAnswers++
            }
        })
        this.setState({
            correctAnswers
        }, () => this.setResponseText(correctAnswers))
    }

    // navigates to the start view
    onHome = () => {
        this.props.history.push('/')
    }

    // restarts the game and navigates to the first question of the game
    onRetry = () => {
        this.props.history.push('/game/1')
    }

    render() {
        const { responseColor, correctAnswers, correctAnswersObj } = this.state

        return (
            <React.Fragment>
                <p className="title">Geschafft!</p>
                <div>
                    <p style={{backgroundColor:responseColor}} className="quiz_result">Ergebnis: {correctAnswers}/{correctAnswersObj.length}</p>
                    <p className="result_comment">{this.state.responseText}</p>
                </div>
                <div className="footer_btn">
                    <button onClick={this.onHome}>Home</button>
                    <button onClick={this.onRetry}>Nochmal versuchen</button>    
                </div>
            </React.Fragment>
            )
        }
}

export default GameOverView 