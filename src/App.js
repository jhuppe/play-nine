import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/react-fontawesome/css/font-awesome.min.css';

const Stars = (props) => {
  return (
    <div className="col-5">
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
    </div>
  );
}

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="col-5"> 
      ...
    </div>
  );
}

const Numbers = (props) => {
  return(
    <div className="card text-center">
      <div>
        <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
    </div>
  )
}

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
