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
      <button>=</button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="answer-value"> 
      {props.selectedNumbers.map((number, i) =>
      <span key={i}>{number}</span>
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
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="game-layout">
          <Stars numberOfStars={this.state.randomNumberOfStars} />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers} 
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
