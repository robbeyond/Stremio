import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './less_sandbox/css/style.css';
import registerServiceWorker from './registerServiceWorker';


function Elements(props) {

   var toggleFunc = function (elemKey) {
        var favoriteList = localStorage.getItem("favorite");

        if (!favoriteList) {
            favoriteList = [];
            favoriteList.push(elemKey);
            localStorage.setItem("favorite", JSON.stringify(favoriteList));
        }
        else {
            favoriteList = JSON.parse(favoriteList);

            if (favoriteList.indexOf(elemKey) == -1) {
                favoriteList.push(elemKey);
            } else {
                favoriteList.splice(favoriteList.indexOf(elemKey), 1);
            }

            localStorage.setItem("favorite", JSON.stringify(favoriteList));
        }
    }

    return (
        <div className="elements">
            <p>{props.movie.name}</p>
            <img src={props.movie.poster}  alt=""></img>
            <img key={props.movie.imdb_id} onClick={toggleFunc.bind(null, props.movie.imdb_id)} className="toggle" src='https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_13-512.png' alt=""></img>
        </div>
    )
}

function Rows(props) {
    return (
        <div className="row">
            <h2>{props.row.type}</h2>

            {
                props.row.response.metas.map(function (index) {
                    return <Elements movie={index} />
                })
            }
        </div>
    );
}

function Library(props) {
    return (
        <div>
            {
                props.all.map(function (index) {
                    return <Rows row={index} />
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
// Each time 'updated' is emitted you should re-fresh the view
aggr.evs.on('updated', function() {

var getArray =  aggr.results;
getArray = getArray.slice(0, 6);

for(var i = 0; i < getArray.length; i++){
   getArray[i].response.metas = getArray[i].response.metas.slice(0,4);
}


ReactDOM.render(<Library all={getArray} />, document.getElementById('root'));
registerServiceWorker();

});




