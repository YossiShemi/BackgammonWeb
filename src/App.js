import './App.css';
import React from 'react';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Game from './game/components/game/Game';
import Footer from './components/footer/Footer';
import {HashRouter as Router, Route} from 'react-router-dom';

 


function App() {


  return (
    <div className="App">
    <Router>
      <Header/>
      <Route  exact  path="/"  component={Homepage}   />     
      <Route path="/Register" component={Register}  />
      <Route path="/Login" component={Login}  />
      <Route path="/Game" component={Game}  />
      <Footer/>
    </Router>
    
    </div>
  );
}

export default App;
