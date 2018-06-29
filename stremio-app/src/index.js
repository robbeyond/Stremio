import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './less_sandbox/css/style.css';
import Stremio from './Stremio';
import registerServiceWorker from './registerServiceWorker';


function Elements(props){
    return(
        <div className="elements">
            <p>{props.movie.name}</p>
            <img src={props.movie.poster}></img>
            <img key={props.movie.imdb_id} className="toggle" src='https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_13-512.png'></img>
        </div>
    )
}


function Rows(props){
    return(
        <div className="row">
        <h2>{props.row.type}</h2>
        {
        props.row.response.metas.map(function(index) {
           return  <Elements movie={index} />
        })
    }
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

const dali =[];

// Each time 'updated' is emitted you should re-fresh the view
aggr.evs.on('updated', function() {
	// iterate through aggr.results
    // each result is a row of items that you have to display
    console.log(aggr);
    localStorage.setItem('testObject', JSON.stringify(aggr.results))
	

var dano =  JSON.parse(localStorage.getItem('testObject'));
console.log(dano);

    ReactDOM.render(<Rows row={dano[0]} />, document.getElementById('root'));
    registerServiceWorker();


});






