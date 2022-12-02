import React from 'react';
import Cookie from 'js-cookie';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import IndiGo from '../images/IndiGo.png';
import Vistara from '../images/Vistara.png';
import SpiceJet from '../images/SpiceJet.png';

import MaleIcon from '../svg/maleIcon.svg'
import FemaleIcon from '../svg/femaleIcon.svg'
import ip from '../utiles/ipAddress';

const fetchFlightImg = (airlines) => {
  if (airlines === 'IndiGo') return IndiGo;
  if (airlines === 'Vistara') return Vistara;
  if (airlines === 'SpiceJet') return SpiceJet;
}

const fetchGenderIcon = (gender) => {
  if (gender === 'Male') return <img id='gender' src={MaleIcon} alt="" />
  if (gender === 'Female') return <img id='gender' src={FemaleIcon} alt="" />
  if (gender === 'Others') return null
}

const handleDeleteFlight = (id) => {
  const consfirmOutput = window.confirm('Are you sure you want to CANCEL Your flight')
  if(!consfirmOutput) return

  const accessToken = Cookie.get('accessToken');
  if (!accessToken) return
  fetch(`${ip}/api/booking/bookingDetails/?booking_id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': accessToken,
      'Content-type': 'appliction/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if(data.message === 'successful')
        window.location.assign(window.location.href)
    })
}

const handleDownload = (booking) => {
  const {
    passengerFirstName,
    passengerLastName,
    passengerGender,
    bookingGroupId,
    seatRow,
    seatColumn,
    price
  } = booking;
  const { 
    id,
    airlines,
    startDateTime,
    endDateTime,
    startAirport,
    endAirport,
    source,
    destination
  } = bookingGroupId;
  const startTime = new Date(startDateTime);
  const endTime = new Date(endDateTime);
  const travelTime = (endTime.getHours() - startTime.getHours()) + "h " + (endTime.getMinutes() - startTime.getMinutes()) + "m";

  const doc = new jsPDF('landscape');
  if (airlines === 'IndiGo') doc.addImage(IndiGo, 'SVG', 20, 20, 10, 10);
  if (airlines === 'Vistara') doc.addImage(Vistara, 'SVG', 20, 20, 10, 10);
  if (airlines === 'SpiceJet') doc.addImage(SpiceJet, 'SVG', 20, 20, 10, 10);
  doc.text(35, 27, airlines);
  doc.text(150, 27, `booking id: ${id}`);
  autoTable(doc, {
    margin: { top: 40 , left: 20, right: 20},

    head: [['Source Details', '', 'Destination Details', '']],
    body: [
      ['Source', {content: source, styles: {fontStyle: 'bold'}} ,'Destination', {content: destination, styles: {fontStyle: 'bold'}} ],
      ['Date', {content: startTime.toLocaleDateString(), styles: {fontStyle: 'bold'}} ,'Date', {content: endTime.toLocaleDateString(), styles: {fontStyle: 'bold'}} ],
      ['Time', {content: startTime.toLocaleTimeString(), styles: {fontStyle: 'bold'}} ,'Time', {content: endTime.toLocaleTimeString(), styles: {fontStyle: 'bold'}} ],
      ['Airport', {content: startAirport, styles: {fontStyle: 'bold'}} ,'Airport', {content: endAirport, styles: {fontStyle: 'bold'}} ],
    ],
  })
  doc.text(20, 90, `Travel Time: ${travelTime}`);
  autoTable(doc, {
    margin: { left: 20, right: 20},
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Passenger Details', '']],
    body: [
      ['Name', {content: passengerFirstName + ' ' + passengerLastName, styles: {fontStyle: 'bold'}}],
      ['Gender', {content: passengerGender, styles: {fontStyle: 'bold'}}],
      ['Seat No', {content: seatRow + seatColumn, styles: {fontStyle: 'bold'}}],
      ['Price', {content: price, styles: {fontStyle: 'bold'}}],
    ],
  })
  doc.text(120, 180, 'Thank you for flying with us');
  doc.save(`${passengerFirstName}_${passengerLastName}.pdf`);
}

const BookingDetails = (props) => {
  const {
    _id,
    passengerFirstName,
    passengerLastName,
    passengerGender,
    bookingGroupId,
    seatRow,
    seatColumn,
    price
  } = props.booking;
  const { 
    airlines,
    startDateTime,
    endDateTime,
    startAirport,
    endAirport,
    source,
    destination
  } = bookingGroupId;
  const startTime = new Date(startDateTime);
  const endTime = new Date(endDateTime);
  const travelTime = (endTime.getHours() - startTime.getHours()) + "h " + (endTime.getMinutes() - startTime.getMinutes()) + "m";
  return (  
    <div className="bookingDetailsCard">
      <div className="airlines">
        <img src={fetchFlightImg(airlines)} alt="flight_icon" />
        {airlines}
        
      </div>
      <div className="passengerName">
        {passengerFirstName} {passengerLastName}
        {fetchGenderIcon(passengerGender)}
      </div>
      <div className="bookingDetails">
        <div className="Container">
          <div className="location">{source}</div>
          <div className="time">{startTime.toLocaleTimeString()}</div>
          <div className="airport">{startAirport}</div>
        </div>
        <div className="travelTime">{travelTime}</div>
        <div className="Container">
          <div className="location">{destination}</div>
          <div className="time">{endTime.toLocaleTimeString()}</div>
          <div className="airport">{endAirport}</div>
        </div>
      </div>
      <div className="seatAndPrice">
        <div className="seat">Seat: {seatRow}{seatColumn}</div>
        <div className="price">Price: {price}&#129689;</div>
      </div>
      <button className="btn download" onClick={() => handleDownload(props.booking)}>Download</button>
      <button className="btn cancel" onClick={() => handleDeleteFlight(_id)}>Cancel Flight</button>
    </div>
  );
}
 
export default BookingDetails;