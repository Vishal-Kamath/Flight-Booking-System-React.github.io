import React, { Component } from 'react';
import ip from '../utiles/ipAddress';
import queryString from 'query-string';
import ResultOutput from './resultOutput';



class SearchResults extends Component {
  state = { 
    results: []
  } 

  componentDidMount() {
    const queries = queryString.parseUrl(window.location.toString());
    fetch(`${ip}/api/search/?source=${queries.query.source}&destination=${queries.query.destination}&date=${queries.query.date}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          results: data
        })
      })
  }

  componentDidUpdate() {
    const queries = queryString.parseUrl(window.location.toString());

    fetch(`${ip}/api/search/?source=${queries.query.source}&destination=${queries.query.destination}&date=${queries.query.date}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          results: data
        })
      })
  }

  handleBookingPage = (navigate, flight_id) => {
    const queries = queryString.parseUrl(window.location.toString());
    navigate(`/booking/?flight_id=${flight_id}&passengers=${queries.query.passengers}`)
  }

  render() { 
    const { results } = this.state;
    return (
      <div className="resultsContainer" id="resultsContainer">
        {
          results.map(flight => (
            <ResultOutput key={flight.flight_id} flight={flight} handleBookingPage={this.handleBookingPage}/>
          ))
        }
      </div>
    );
  }
}
 
export default SearchResults;