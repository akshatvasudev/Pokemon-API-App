import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pokemon from './Pokemon.js'

let Pokemons = () => {
	let [pokemonList, updatePokemonList] = useState({});

	useEffect(() => {
		let nationalPokedexPromise = async () => {
			let nationalPokedex = await axios.get('http://localhost:9000/getNationalPokedex');
			updatePokemonList(nationalPokedex.data);
		}
		nationalPokedexPromise();
	}, [])
	let generatePokemonsMarkup = (pokemonList) => {
		let pokemonsMarkup = [];
		for(let p in pokemonList){
			pokemonsMarkup.push(<Pokemon id={pokemonList[p].id} name={pokemonList[p].name} url={pokemonList[p].url} />);
		}
		return pokemonsMarkup;
	}
	return(
			<React.Fragment>
				{generatePokemonsMarkup(pokemonList)}
			</React.Fragment>
		
	)
}

export default Pokemons;