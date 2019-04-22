import React, {useState, useEffect} from 'react';
import axios from 'axios';

let PokemonDetails = (props) => {
	let [pokemonDetails, updatePokemonDetails] = useState({})

	useEffect(() => {
		let pokemonDetailsPromise = async () => {
			let pokemonDetails = await axios.get(`http://localhost:9000/getPokemonDetails/${props.match.params.id}`);
			updatePokemonDetails(pokemonDetails.data);
		}
		pokemonDetailsPromise();
	}, [])
		return(
			 '[{pokemonDetails}]'
		)
}


export default PokemonDetails;