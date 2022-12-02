import React from 'react';
import NavigationButton from './navigationButton';
import IndiGo from '../images/IndiGo.png';
import Vistara from '../images/Vistara.png';
import SpiceJet from '../images/SpiceJet.png';

const fetchFlightImg = (airlines) => {
  if (airlines === 'IndiGo') return IndiGo;
  if (airlines === 'Vistara') return Vistara;
  if (airlines === 'SpiceJet') return SpiceJet;
}

const ResultOutput = (props) => {
  const { flight, handleBookingPage } = props;
  let startTime = new Date(flight.startDateTime);
  let endTime = new Date(flight.endDateTime);
  let travelTime = (endTime.getHours() - startTime.getHours()) + "h " + (endTime.getMinutes() - startTime.getMinutes()) + "m";
  return ( 
    <div className="result">
      <div className="airline">
        <img src={fetchFlightImg(flight.airlines)} alt="flight_icon" />
        {flight.airlines}
      </div>
      <div className="resultContainer">
        <div className="Container">
          <div className="time">{startTime.toLocaleTimeString()}</div>
          <div className="location">{flight.source}</div>
          <div className="airport">{flight.startAirport}</div>
        </div>
        <div className="travelTime">{travelTime}</div>
        <div className="Container">
          <div className="time">{endTime.toLocaleTimeString()}</div>
          <div className="location">{flight.destination}</div>
          <div className="airport">{flight.endAirport}</div>
        </div>
        <div className="price">&#129689; {flight.price}</div>
      </div>
      <NavigationButton 
        value='View'
        buttonFunction={handleBookingPage}
        functionParameter={flight.flight_id}
        buttonClass='btn bookingNavigate'/>
    </div>
  );
}

 
export default ResultOutput;