import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';


const Stars = (props) => {

  return (
    <div className="stars">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="glyphicon glyphicon-star"></i>
      )}
    </div>
  );
}

const Button = (props) => {
  return (
    <div className="equals-button">
      <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="answer-value"> 
      {props.selectedNumbers.map((number, i) =>
      <span key={i} onClick={() => props.unselectNumber(number)}>
        {number}
      </span>
      )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }
  
  return(
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          <span key={i} className={numberClassName(number)}
          onClick={() => props.selectNumber(number)}>
          {number}
          </span>
        )}
      </div>
    </div>
  );
};
Numbers.list = _.range(1,10)

class Game extends React.Component {
  state = {
    selectedNumbers: [], 
    randomNumberOfStars: 1 + Math.floor(Math.random()*9),
  };
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers
                                .filter(number => number !== clickedNumber)
    }));
  }
  render() {
    const { selectedNumbers, randomNumberOfStars } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="game-layout">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer selectedNumbers={selectedNumbers} 
                  unselectNumber={this.unselectNumber}  />
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers} 
                 selectNumber={this.selectNumber}
        />
      </div>
    );
  }
}

class App extends React.Component {
 render () {
   return (
     <div>
       <Game />
     </div>
   )
 }
}

export default App;
