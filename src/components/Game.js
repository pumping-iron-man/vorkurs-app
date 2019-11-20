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
            userAnswers : [],
            showSubmit : false
        }
    }

    // json data is loaded in the according state variables
    componentDidMount = () => {
        this.setState({
            questionsAnswers : DATA["q&a"],
            userAnswers: Object.keys(DATA["q&a"]).fill('')
        }, () => this.setQuestionAndAnswers())
    }

    // if forward button navigates to a page > 10, then the submit button is shown
    // if backward button navigates to a page < 1, then the backward button gets disabled
    // else forward and backward button are shown and submit button is not shown
    componentDidUpdate = () => {
        const { pageNumber, disabledPrev, showSubmit } = this.state
        
        // !disabledPrev and !showSubmit are needed otherwise is called again and again and 
        // finishes with a maximum update depth - error

        /** WHY: 
         *  setState calls a rerender, this will call the componentDidUpdate function, 
         *  this will go to the first if-clause, will see that the pageNumber is truly 1 and a 
         *  new setState call will start. with !disabledPrev and !showSubmit will be setted to 
         *  true, and for the next calls it will prevent the error from happening
         */
        if(pageNumber === 1 && !disabledPrev) {
            this.setState({
                disabledPrev : true
            })
            return
        }

        if(pageNumber === 10 && !showSubmit) {
            this.setState({
                showSubmit: true
            })
            return
        }

        // same logic gets applied here with the only difference that disabledPrev and
        // showSubmit are setted to false
        if((pageNumber > 1 && pageNumber < 10) && (disabledPrev || showSubmit)) {
            this.setState({
                disabledPrev : false,
                showSubmit: false
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
        const { pageNumber, userAnswers } = this.state
        const indexAnsweredOption = pageNumber - 1 
        
        // when the same button is clicked, the state will not get updated
        if(selectedAnswer === userAnswers[indexAnsweredOption]) {
            return
        }

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
                disabledPrev,
                showSubmit } = this.state
        const totalQuestions = Object.keys(questionsAnswers).length
        const userAnswerAtIndex = userAnswers[pageNumber - 1]
        let button 

        //show submit button on last page, otherwise show the forward button
        if(showSubmit) {
            button = <button id="submitBtn" onClick={this.onQuizEnd}>Submit</button>
        }
        else {
            button = <button className="navBtn" onClick={this.onNextQuestionPage}>
                        <IoIosArrowForward className="io-icon"/>
                    </button>
        }

        // if the data from the json file is not loaded/available, 
        // the loading-sign-text is shown, else the game will start
        if(questionsAnswers == null) {
            return <p>loading question {pageNumber} ...</p>
        }

        return (
            <div className="gameContainer">
                <button id="getResultBtn" onClick={this.onQuizEnd}>Test abschließen</button>
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
                    {button}
                </div>
            </div>
        )
    }
}

export default GameView