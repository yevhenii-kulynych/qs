import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import MainView from './components/MainView/MainView'
import CreateView from './components/CreateView/CreateView'
import EditView from './components/EditView/EditView'
import CartView from './components/CartView/CartView'
import './App.css'


function App() {
return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={ MainView }/>
          <Route path="/create" component={ CreateView }/>
          <Route path="/edit" component={ EditView }/>
          <Route path="/cart" component={ CartView }/>
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
