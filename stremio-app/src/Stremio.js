import React from 'react';

var list = [];

function Elements(element){
    return(
         <div>
            <h1>{element.name}</h1>
            <img src={element.poster} />
            <img key={element.id} src="" />
        </div>
    );
}

const client = require('./stremio-addon-client')
const officialAddons = require('./stremio-official-addons')
const aggregators = require('./stremio-aggregators')

const col = new client.AddonCollection()

// Load official add-ons
col.load(officialAddons)

// Create an aggregator to get all rows
const aggr = new aggregators.Catalogs(col.addons)

aggr.run()

// Each time 'updated' is emitted you should re-fresh the view
aggr.evs.on('updated', function() {
	// iterate through aggr.results
    // each result is a row of items that you have to display
    console.log(aggr.results);
	aggr.results.forEach(function(result) {
		//console.log(result.type)
		// each object in result.response.metas is an item that you have to display
		if (result.response && result.response.metas){
            list = Elements(result.response.metas[0]) ;
        }
    })


});


class Stremio extends React.Component{

    render(){
        return  (
        <div>{list}</div>
        )
    }
    
}

export default Stremio;