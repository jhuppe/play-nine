import React from 'react';
import './App.css';
import Game from './Game.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

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
