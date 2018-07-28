import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import scriptLoader from 'react-async-script-loader'
import fetchJsonp from 'fetch-jsonp';
import './App.css'

var markers =[];
var allInfowindows = [];

class locations extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: this.props.locations,
      map: {},
      infos: [],
      query: ''
    }
  }


  componentDidMount() {
        this.state.list.map((item, index)  => {
          return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${item.name}&format=json&callback=wikiCallback`)
          .then(response => response.json()).then((responseJson) => {
            let info = [...this.state.infos, [responseJson, responseJson[2][0], responseJson[3][0]]]
            this.updateInfo(info)
          }).catch(error =>
            console.error(error))
        })
    }


  componentWillReceiveProps({isScriptLoaded}) {
    if(isScriptLoaded){
      var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: 45.4790671, lng: 9.8452433},
            zoom: 12
        });

      this.setState({map: map});

    }

    else {
      console.log("Error in loading map");
    }
                
    }

  updateInfo = (info) => {
    this.setState({infos: info})
  }
  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }


  componentDidUpdate(){

    const { list, query, map} = this.state
    let showingList = list
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingList = list.filter((item) => match.test(item.name))
  }
  else {
      showingList = list
    }

    markers.forEach(mark => {
      mark.setMap(null)
    });

    markers = [];
    allInfowindows = [];
    showingList.map((marker, index) => {
      let getInfo = this.state.infos.filter((single) => marker.name === single[0][0]).map(second =>
        { if (second.length === 0) {
          return 'No information found for selected location';
        }
        else if (second[1] !== '') {
          return second[1];
        }
        else {
          return 'No information found for selected location';
        }

        });
      let infoContent = `<div className="infowindow"> <h3>${marker.name}</h3> <p>${getInfo}</p> </div>`;
      let addInfo = new window.google.maps.InfoWindow({content: infoContent});
      let addMarker = new window.google.maps.Marker({
        position: {lat: marker.lat, lng: marker.lng},
        map: map,
        name: marker.name,
        animation: window.google.maps.Animation.DROP
        });

      markers.push(addMarker);
      allInfowindows.push(addInfo);

      addMarker.addListener('click', function() {
        allInfowindows.forEach(item => {item.close()});
        addInfo.open(map, addMarker);
      });
    })
  }

    listItem = (item, event) => {
      let selected = markers.filter((current) => current.name === item.name)
      window.google.maps.event.trigger(selected[0], 'click')
    }
  
  render() {

    const {list, query} = this.state;

    let showingList = list
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingList = list.filter((item) => match.test(item.name))
  }
  else {
      showingList = list
  }

	return (

      <div className='Locations-list'>
				<div className='locations-search' tabIndex='1' role='search' aria-label='Search'>
          <input
            className='search-locations'
            type='text'
            placeholder='Search'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

        </div>
				<ul tabIndex='2' aria-label='Lombardy's Towns>
					{showingList.map((item, index) => (
						<li key={index} className='list-item'
            tabIndex={index+2} 
            onClick={this.listItem.bind(this, item)}>
							{item.name}
						</li>
					))}
				</ul>
      </div>


		)
	}
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=AIzaSyBNADcqq0EjkYlzKYuD2M_SojZTXuHe5y4`]) (locations);
