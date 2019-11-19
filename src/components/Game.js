import React, { Component } from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import CustomButton from './customBtn'

import DATA from '../data/app-data'
import './Game.css'


class GameView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageNumber : 1,
            questionsAnswers : {},
            question : '',
            answerOptions : [],
            disabledPrev: false,
            disabledNext: false,
            userAnswers : [],
        }
    }

    // json data is loaded in the according state variables
    componentDidMount = () => {
        this.setState({
            questionsAnswers : DATA["q&a"],
            userAnswers: Object.keys(DATA["q&a"]).fill('')
        }, () => this.setQuestionAndAnswers())
    }

    // if forward button navigates to a page > 10, then the forward button gets disabled
    // if backward button navigates to a page < 1, then the backward button gets disabled
    componentDidUpdate = () => {
        const { pageNumber, disabledPrev, disabledNext } = this.state
                
        if(pageNumber === 1 && !disabledPrev) {
            this.setState({
                disabledPrev : true
            })
            return
        }

        if(pageNumber === 10 && !disabledNext) {
            this.setState({
                disabledNext : true
            })
            return
        }

        if((pageNumber > 1 && pageNumber < 10) && (disabledPrev || disabledNext)) {
            this.setState({
                disabledPrev : false,
                disabledNext : false
            })
        }
    }

    // for every page with the help of the pagenumber the according question 
    // and answer options are setted
    setQuestionAndAnswers = () => {
        const { pageNumber, questionsAnswers } = this.state
        const qaId = pageNumber - 1

        this.setState({
            question : Object.keys(questionsAnswers)[qaId],
            answerOptions : Object.values(questionsAnswers)[qaId]
        })
    }

    // for every back and forth navigation, the update function is called to set
    // the path and the according question and answer options
    onUpdate = (pageNumber) => {
        this.setState({
            pageNumber
        }, () => {
            this.props.history.push('/game/' + pageNumber)
            this.setQuestionAndAnswers()
        })
    }

    onPrevQuestionPage = () => {
        const pageNumber = this.state.pageNumber - 1

        this.onUpdate(pageNumber)
    }

    onNextQuestionPage = () => {
        const pageNumber = this.state.pageNumber + 1

        this.onUpdate(pageNumber)
    }

    // the selected answer button is saved in a state variable
    onSelectedAnswer = (selectedAnswer) => {
        const indexAnsweredOption = this.state.pageNumber - 1 

        this.setState(prevState => {
            let newUserAnswers = prevState.userAnswers
            newUserAnswers[indexAnsweredOption] = selectedAnswer
            
            return { userAnswers : newUserAnswers }
        })
    }

    // when the user wants to finish the quiz, he gets navigated to the game over view with 
    // its selected answers
    onQuizEnd = () => {
        this.props.history.push({
            pathname : '/gameover',
            state : { userAnswers : this.state.userAnswers }
        })
    }

    render() {
        const { answerOptions, 
                questionsAnswers, 
                pageNumber, 
                userAnswers, 
                question, 
                disabledNext, 
                disabledPrev } = this.state
        const totalQuestions = Object.keys(questionsAnswers).length
        const userAnswerAtIndex = userAnswers[pageNumber - 1]

        // if the data from the json file is not loaded/available, the loading-sign-text is shown
        if(questionsAnswers == null) {
            return <p>loading question {pageNumber} ...</p>
        }
        return (
            <div className="gameContainer">
                <button onClick={this.onQuizEnd} id="getResultBtn">Test abschließen</button>
                <div className="questionAnswersContainer">
                    <p className="question">{question}</p>
                    <div id="answerButtons">
                        {
                            answerOptions.map((answer, index) => {
                                return <CustomButton 
                                            btnText={answer} 
                                            key={index} 
                                            clickedAnswer={userAnswerAtIndex}
                                            onSelectedAnswer={this.onSelectedAnswer}/>
                            })
                        }
                    </div>
                </div>
                <div className="footerDiv">
                    <button 
                        className="navBtn" 
                        onClick={this.onPrevQuestionPage}
                        disabled={disabledPrev}>
                        <IoIosArrowBack className="io-icon"/>
                    </button>
                    <p id="questionNumber">{pageNumber}/{totalQuestions}</p>
                    <button 
                        className="navBtn" 
                        onClick={this.onNextQuestionPage}
                        disabled={disabledNext}>
                        <IoIosArrowForward className="io-icon"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default GameView