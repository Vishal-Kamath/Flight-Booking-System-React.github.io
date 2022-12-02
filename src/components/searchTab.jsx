import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationButton from './navigationButton';
import queryString from 'query-string';

class SearchTab extends Component {
  state = { 
    source: '',
    destination: '',
    date: this.getDate(),
    passengers: ''
  } 

  getDate() {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }

  handleSearch(navigate) {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;
    const msgBox = document.getElementById('msgBox');
  
    if (!source || !destination || !date || !passengers) {
      if(!msgBox.classList.contains('failed'))
        msgBox.classList.add('failed');
      return msgBox.innerHTML = 'please fill all details';
    }
  
    if (source === destination) {
      if(!msgBox.classList.contains('failed'))
        msgBox.classList.add('failed');
      return msgBox.innerHTML = 'source and destination cannot be same';
    }
    
    navigate(`/search/?source=${source}&destination=${destination}&passengers=${passengers}&date=${date}`)
  }


  componentDidMount = () => {
    const queries = queryString.parseUrl(window.location.toString());
    if (queries.query.source) {
      this.setState({
        source: queries.query.source,
        destination: queries.query.destination,
        date: queries.query.date,
        passengers: queries.query.passengers
      })
    }
  }

  componentDidUpdate = () => {
    document.getElementById('source').value = this.state.source;
    document.getElementById('destination').value = this.state.destination;
    document.getElementById('date').value = this.state.date;
    document.getElementById('passengers').value = this.state.passengers;
  }


  render() { 
    const date = this.getDate()
    return ( 
      <div className="searchTabPage">
        <div className="searchTabContainer">
          <div id="msgBox"></div>
  
          <select type="text" className="source" name='source' id='source'>
            <option value="" selected disabled hidden>Source</option>
            <option value="Mumbai">Mumbai</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Goa">Goa</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
          
          
          <select type="text" className="destination" name='destination' id='destination'>
            <option value="" selected disabled hidden>Destination</option>
            <option value="Mumbai">Mumbai</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Goa">Goa</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
  
          <input type="date" className="date" name='date' id='date' min={date} defaultValue={date}/>
          
          <input type="number" className="passengers" name='passengers' id='passengers' min={1} max={9} placeholder='Passengers'/>
  
          <NavigationButton 
            value='Search'
            buttonFunction={this.handleSearch}
            buttonClass='btn search'/>
        </div>
        <Outlet />
      </div>
    );
  }
}
 
export default SearchTab;