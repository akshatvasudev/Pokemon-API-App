const express = require('express')
const axios = require('axios')
const app = express()
const port = 9000

let pokeMap = {};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getNationalPokedex', (req, res) => {
	console.log('req recieved');
    axios.get('http://pokeapi.co/api/v2/pokedex/1').then((data) => {
    	console.log('API call made');
        let speciesPromises = data.data.pokemon_entries.map((species) => {
            return axios.get(species.pokemon_species.url);
        });
        //speciesPromises = speciesPromises.filter(temp => temp != false);
        
        axios.all(speciesPromises).then(axios.spread((...speciesDetails) => {
        	let index = 0;
        	speciesDetails.map((specie) => {
        		specie.data.varieties.map((variety) => {
        			let _index = index++;
        			if(!pokeMap[_index]){
        				pokeMap[_index] = {
        					name:variety.pokemon.name,
        					id: _index,
        					url: variety.pokemon.url,
        					habitat: specie.data.habitat.name,
        					evolution_chain: specie.data.evolution_chain.url
        				}
        			}
        		})
        	});
        	res.send(pokeMap);
        })).catch(() => {
    		res.send('error1');
    });
    }).catch(() => {
    	res.send('error0');
    })
});

app.get('/getPokemonDetails/:id', (req, res) => {	
	//console.log(req.params.id, pokeMap[req.params.id],pokeMap[req.params.id].url);
	axios.get(pokeMap[req.params.id].url).then((data) => {
		axios.get(pokeMap[req.params.id].evolution_chain).then((evolution_chain_data) => {
			let _allPokemonData = Object.assign({},data.data, {evolution_chain_data: evolution_chain_data.data},{habitat:pokeMap[req.params.id].habitat});
			res.send(_allPokemonData);
		})
		
	})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))