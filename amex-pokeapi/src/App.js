import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemons from './Pokemons.js'
import PokemonDetails from './PokemonDetails.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path ="/" component={Pokemons} />
          <Route exact path ="/getPokemonDetails/:id" component={PokemonDetails} />
        </Router>
      </div>
    );
  }
}

export default App;
