import React from 'react';
import './App.css';
import Answer from './Answer.js';
import Button from './Button.js';
import DoneFrame from './DoneFrame.js';
import Numbers from './Numbers.js';
import Stars from './Stars.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import '../node_modules/font-awesome/css/font-awesome.min.css';


var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null,
    });
    state = Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers
                .filter(number => number !== clickedNumber)
        }));
    }
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus);
    };
    redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1,
        }), this.updateDoneStatus);
    }
    possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' }
            }
        });
    }
    render() {
        const {
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus,
          } = this.state;

        return (
            <div className="container">
                <h1>PLAY NINE </h1>
                <hr />

                <div className="game-layout">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                        redraws={redraws}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        answerIsCorrect={answerIsCorrect} />
                    <Answer selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber} />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} /> :
                    <Numbers selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers} />
                }
                <div>
                    <br />
                    <br />
                    <h2>INSTRUCTIONS</h2>
                        <ul className="list-group">
                        <li className="list-group-item">1. The goal of this game is to use each number only 
                                                            once during the game and not run out of number options.</li>
                        <li className="list-group-item">2. Each turn, you get a random number of stars. Select the number 
                                                            or numbers that add up to that number of stars, then click the 
                                                            equal sign. If you chose correctly, the button will turn green, 
                                                            and you can click it again to submit.</li>
                            <li className="list-group-item">3. The game finishes once you have either used
                                                            all the available numbers or used all your redraws.</li>

                        </ul>

                </div>
            </div>
        );
    }
}

export default Game;