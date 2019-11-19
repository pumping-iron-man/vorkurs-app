import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import StartView from './components/Start'
import GameView from './components/Game'
import GameOverView from './components/GameOver'


const App = () => {
  return (
    <div className="App">
    {/* switch looks for the right component according to the path the browser-router routes to. 
        if there exists a page-not-found-site is rendered*/}
      <Switch>
        <Route exact path="/" component={StartView}/>
        <Route path="/game/:id" component={GameView}/>
        <Route path="/gameover" component={GameOverView}/>
        <Route render={() => (<h1>Page not found</h1>)}/>
      </Switch>
    </div>
  )
}

export default App;
