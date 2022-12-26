import React, { Component } from 'react';
import queryString from 'query-string';
import Cookie from 'js-cookie';
import ip from '../utiles/ipAddress';
import BookingDetails from './bookingDetails';
import { Navigate } from 'react-router-dom';

class BookingDetailsPage extends Component {
  state = {  
    bookingDetailsArray: [],
    navigate: false,
  } 

  componentDidMount = () => {
    const queries = queryString.parseUrl(window.location.toString());
    const accessToken = Cookie.get('accessToken');
    fetch(`${ip}/api/booking/bookingDetails/?booking_id=${queries.query.booking_id}`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if(data[0] === undefined) {
          this.setState({
            navigate: true
          })
        }
        this.setState({
          bookingDetailsArray: data
        })
      })
  }

  refresh = () => {
    const queries = queryString.parseUrl(window.location.toString());
    const accessToken = Cookie.get('accessToken');
    fetch(`${ip}/api/booking/bookingDetails/?booking_id=${queries.query.booking_id}`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if(data[0] === undefined) {
          this.setState({
            navigate: true
          })
        }
        this.setState({
          bookingDetailsArray: data
        })
      })
  }

  render() { 
    return (
      <React.Fragment>
        <div className="bookingDetailsPage">
          {
            this.state.bookingDetailsArray.map(booking => (
              <BookingDetails booking={booking} refresh={this.refresh}/>
            ))
          }
        </div>
        {
          this.state.navigate && (<Navigate to="/user" />)
        }
        
      </React.Fragment>
    );
  }
}

export default BookingDetailsPage;