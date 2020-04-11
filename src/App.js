import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';

import Home from './components/Home';
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
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}

export default App;
