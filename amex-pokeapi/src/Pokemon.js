import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

let Pokemon = (props) => {
		return(
		<Link to={`/getPokemonDetails/${props.id}`}>{props.id} | {props.name}</Link>
		)
}


export default Pokemon;