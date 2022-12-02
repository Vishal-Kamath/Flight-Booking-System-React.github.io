import React, { Component } from 'react';
import queryString from 'query-string';
import Cookie from 'js-cookie';
import ip from '../utiles/ipAddress';
import BookingDetails from './bookingDetails';

class BookingDetailsPage extends Component {
  state = {  
    bookingDetailsArray: [],
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
        if(data[0] === undefined) return window.location.assign('/user')
        this.setState({
          bookingDetailsArray: data
        })
      })
  }

  render() { 
    return (
      <div className="bookingDetailsPage">
        {
          this.state.bookingDetailsArray.map(booking => (
            <BookingDetails booking={booking} />
          ))
        }
      </div>
    );
  }
}
 
export default BookingDetailsPage;