import React from 'react'
import NavigationButton from './navigationButton';

import IndiGo from '../images/IndiGo.png';
import Vistara from '../images/Vistara.png';
import SpiceJet from '../images/SpiceJet.png';

const navigateToBookingDetails = (navigate, bookingId) => {
  navigate(`/bookingDetails/?booking_id=${bookingId}`)
}

const fetchFlightImg = (airlines) => {
  if (airlines === 'IndiGo') return IndiGo;
  if (airlines === 'Vistara') return Vistara;
  if (airlines === 'SpiceJet') return SpiceJet;
}

const BookingDetailsCard = (props) => {
  const {
    id,
    airlines,
    source,
    startDateTime,
    destination,
    endDateTime} = props.booking
  const startTime = new Date(startDateTime);
  const endTime = new Date(endDateTime);
  const travelTime = (endTime.getHours() - startTime.getHours()) + "h " + (endTime.getMinutes() - startTime.getMinutes()) + "m";
  return ( 
    <div className="booking">
      <div className="airlines">
        <img src={fetchFlightImg(airlines)} alt="flight_icon" />
        {airlines}
      </div>
      <div className="bookingDetails">
        <div className="Container">
          <div className="location">{source}</div>
          <div className="time">{startTime.toLocaleTimeString()}</div>
        </div>
        <div className="travelTime">{travelTime}</div>
        <div className="Container">
          <div className="location">{destination}</div>
          <div className="time">{endTime.toLocaleTimeString()}</div>
        </div>
      </div>
      <NavigationButton
        value='View'
        buttonClass='btn view'
        buttonFunction={navigateToBookingDetails} 
        functionParameter={id}/>
    </div>
  );
}
 
export default BookingDetailsCard;