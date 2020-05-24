import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Header from './components/Header';
import './global.css';


class App extends Component{

  state = {
    firebaseInicialized: false
  };

  componentDidMount(){
    firebase.isInicialized().then(resultado => {
      //Devolve o usuario
      this.setState({firebaseInicialized: resultado});
      
    })
  }


  render(){
    return  this.state.firebaseInicialized !== false ? (
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}

export default App;
