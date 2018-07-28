import React, { Component } from 'react';
import Locations from './locations'
import './App.css';

/*Coordinates locations*/

const locations = [
  { name: 'Milano',
    lat: 45.4642035,
    lng: 9.189981999999986
  },

  { name: 'Bergamo',
    lat: 45.6982642,
    lng: 9.677269799999976 },


  { name: 'Brescia',
    lat: 45.5415526,
    lng: 10.211801899999955},

  { name: 'Como',
    lat: 45.8080597,
    lng: 9.085176499999989},

  { name: 'Cremona',
    lat: 45.133249,
    lng: 10.022651099999962},

  { name: 'Lecco',
    lat: 45.8565698,
    lng: 9.397670400000038},

  { name: 'Lodi',
    lat: 45.3097228,
    lng: 9.50371599999994},

  { name: 'Mantova',
    lat: 45.1564168,
    lng: 10.791375099999982},

  { name: 'Monza e della Brianza',
    lat: 45.623599,
    lng: 9.258801500000004},

  { name: 'Pavia',
    lat: 45.1847248,
    lng: 9.158206899999982},

  { name: 'Sondrio',
    lat: 46.1698583,
    lng: 9.878767400000015},

  { name: 'Varese',
    lat: 45.82059890000001,
    lng: 8.825057600000036},

]

class App extends Component {
  render() {
    return (
      <div  className="App">
           <div className='header'>
        <h1> Lombardy Cities </h1>
           </div>
        <div className='list'>
            <Locations locations={locations} />
        </div>
        <div id="map" role="Application" tabIndex='-1' aria-label='Lombardy Cities'></div>
      </div>
    )
  }
}

export default App;
