import React, { Component } from 'react'
import ip from '../utiles/ipAddress';
import NavigationButton from './navigationButton';
import queryString from 'query-string';
import SeatsContainer from './seatsContainer';
import Cookie from 'js-cookie';
import generateUUID from '../utiles/generateUUID';

import IndiGo from '../images/IndiGo.png';
import Vistara from '../images/Vistara.png';
import SpiceJet from '../images/SpiceJet.png';
import PassengerCounter from './passengerCounter';

class BookingPage extends Component {
  state = { 
    flight: {},
    seatsArray: [],

    passengerNumber: [],
    passengerFName: [],
    passengerLName: [],
    passengerGender: [],
    passengersSeatArray: [],
    selectedPassenger: 0,

    bookButtonValue: '',
    bookButtonFunction: null,
    bookButtonClass: 'btn book'
  } 
  componentDidMount = () => {
    const queries = queryString.parseUrl(window.location.toString());
    fetch(`${ip}/api/booking/?flight_id=${queries.query.flight_id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        let passengers = parseInt(queries.query.passengers);
        let passengerFNameArray = [];
        let passengerLNameArray = [];
        let passengerGender = [];
        let passengersSeatArray = [];
        let passengerNumber = [];
        for(let i = 0; i < passengers; i++) {
          passengerFNameArray.push('');
          passengerLNameArray.push('');
          passengerGender.push('');
          passengersSeatArray.push(`P${i + 1}`);
          passengerNumber.push(i + 1)
        }
        this.setState({
          flight: data,
          passengerNumber: passengerNumber,
          passengerFName: passengerFNameArray,
          passengerLName: passengerLNameArray,
          passengerGender: passengerGender,
          passengersSeatArray: passengersSeatArray
        })
      })
    
    fetch(`${ip}/api/booking/seats/?flight_id=${queries.query.flight_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'Application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const seatsArray = data.sort((a, b) => {
          return a.seatRow - b.seatRow || a.seatColumn.localeCompare(b.seatColumn);
        });
        this.setState({
          seatsArray: seatsArray
        })
      })

    const accessToken = Cookie.get('accessToken');
    if (!accessToken) {
      return this.setState({
        bookButtonValue: 'Sign in to Book',
        bookButtonFunction: this.handleNavigate
      })
    } 
    fetch(`${ip}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Authorization) {
          this.setState({
            bookButtonValue: 'Book',
            bookButtonFunction: this.handleBooking
          })
        }
        if (!data.Authorization) {
          this.setState({
            bookButtonValue: 'Sign in to Book',
            bookButtonFunction: this.handleNavigate
          })
        }
      })
  }

  stateUpdate = () => {
    const queries = queryString.parseUrl(window.location.toString());
    fetch(`${ip}/api/booking/?flight_id=${queries.query.flight_id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        let passengers = parseInt(queries.query.passengers);
        let passengerFNameArray = this.state.passengerFName;
        let passengerLNameArray = this.state.passengerLName;
        let passengerGender = this.state.passengerGender;
        let passengersSeatArray = this.state.passengersSeatArray;
        let passengerNumber = this.state.passengerNumber;
        
        if (passengers > passengerNumber.length) {
          let count = passengers - passengerNumber.length;
          let passengerCount = passengerNumber.length
          for (let i = 0; i < count; i++) {
            passengerFNameArray.push('');
            passengerLNameArray.push('');
            passengerGender.push('');
            passengersSeatArray.push(`P${passengerCount + 1}`);
            passengerNumber.push(passengerCount + 1)
          }
        }

        if (passengers < passengerNumber.length) {
          let count = passengerNumber.length - passengers;
          for (let i = 0; i < count; i++) {
            passengerFNameArray.pop();
            passengerLNameArray.pop();
            passengerGender.pop();
            const seat = passengersSeatArray.pop();
            passengerNumber.pop();
            if(seat[0] !== 'P') {
              const currentButton = document.getElementById(seat);
              currentButton.classList.remove('Passenger');
              currentButton.innerHTML = seat;
            }
          }
        }
        
        this.setState({
          flight: data,
          passengerNumber: passengerNumber,
          passengerFName: passengerFNameArray,
          passengerLName: passengerLNameArray,
          passengerGender: passengerGender,
          passengersSeatArray: passengersSeatArray
        })
      })
  }

  handleSeatSelect = (seatRow, seatColumn) => {
    let { passengersSeatArray, selectedPassenger } = this.state;
    let passengerNumber = selectedPassenger + 1;

    if (passengersSeatArray[selectedPassenger] !== `P${passengerNumber}`) {
      const prevButton = document.getElementById(passengersSeatArray[selectedPassenger]);
      prevButton.innerHTML = passengersSeatArray[selectedPassenger];
      prevButton.classList.remove("Passenger");
    }

    const currentButton = document.getElementById(seatRow + seatColumn);
    if(currentButton.innerHTML[0] === 'P') {
      let psgNumber = parseInt(currentButton.innerHTML[1])
      currentButton.innerHTML = passengersSeatArray[psgNumber - 1];
      currentButton.classList.remove("Passenger");
      passengersSeatArray[psgNumber - 1] = `P${psgNumber}`;
    }
    passengersSeatArray[selectedPassenger] = currentButton.innerHTML; 
    currentButton.innerHTML = `P${(passengerNumber)}`;
    currentButton.classList.add("Passenger");
  }

  selectPassenger = (passengerNumber) => {
    let passengerIndex = passengerNumber - 1;
    this.setState({
      selectedPassenger: passengerIndex
    })
  }

  handleNavigate = (navigate) => {
    navigate('/signin');
  }

  handleBooking = async (navigate) => {
    const passengerFName = this.state.passengerFName;
    const passengerLName = this.state.passengerLName;
    const passengerGender = this.state.passengerGender;
    const passengersSeatArray = this.state.passengersSeatArray;
    const passengerNumber = this.state.passengerNumber;

    let i = 0;
    for (; i < passengerNumber.length; i++) {
      if (passengerFName[i] === '') return alert('Please fill all details');
      if (passengerLName[i] === '') return alert('Please fill all details');
      if (passengerGender[i] === '') return alert('Please fill all details');
      if (passengersSeatArray[i][0] === 'P') return alert('Please fill all details');
    }

    const accessToken = Cookie.get('accessToken');
    const { 
      flight_id,
      airlines,
      source, 
      destination, 
      startDateTime, 
      endDateTime, 
      startAirport,
      endAirport,
      price } = this.state.flight;
    const groupUUID = generateUUID();

    const data = await fetch(`${ip}/api/booking`, {
      method: 'POST',
      headers: {
        'Authorization': accessToken,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        flight_id: flight_id,
        groupUUID: groupUUID,
        airlines: airlines,
        source: source,
        destination: destination,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        startAirport: startAirport,
        endAirport: endAirport,
        passengerFirstName: passengerFName,
        passengerLastName: passengerLName,
        passengerGender: passengerGender,
        passengersSeatArray: passengersSeatArray,
        price: price
      })
    })
      .then(res => res.json())
    
    if (data.message !== 'success') {
      return this.setState({
        bookButtonClass: 'btn book failed',
        bookButtonValue: data.message
      })
    }

    this.setState({
      bookButtonClass: 'btn book success',
      bookButtonValue: 'Success'
    })
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate(`/bookingDetails/?booking_id=${groupUUID}`);
  }

  handleChange = (nameOfTheChange, passengerNumber) => {
    const inputTag = document.getElementsByName(nameOfTheChange)[passengerNumber - 1];
    const changedState = this.state[nameOfTheChange];
    changedState[passengerNumber - 1] = inputTag.value;
  }

  fetchFlightImg = (airlines) => {
    if (airlines === 'IndiGo') return IndiGo;
    if (airlines === 'Vistara') return Vistara;
    if (airlines === 'SpiceJet') return SpiceJet;
  }

  handleAddPassenger = (navigate) => {
    let passengerCount = this.state.passengerNumber.length;
    passengerCount++;

    if (passengerCount > 9) return;

    navigate(`/booking/?flight_id=${this.state.flight.flight_id}&passengers=${passengerCount}`);
    this.stateUpdate();
  }

  handleSubtractPassenger = (navigate) => {
    let passengerCount = this.state.passengerNumber.length;
    passengerCount--;

    if (passengerCount < 1) return;

    navigate(`/booking/?flight_id=${this.state.flight.flight_id}&passengers=${passengerCount}`);
    this.stateUpdate();
  }
  

  render() { 
    const {
      airlines, 
      source, 
      destination, 
      startDateTime, 
      endDateTime, 
      startAirport, 
      endAirport, 
      price} = this.state.flight;
    const seatsArray = this.state.seatsArray
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);
    return (
      <div className="bookingPage">
        <div className="bookingContainer">
          <div className="airlines">
            <img src={this.fetchFlightImg(airlines)} alt="flight_icon" />
            {airlines}
          </div>
          <div className="sourceDetails">
            <table>
              <tr>
                <th>Source Details</th>
              </tr>
              <tr>
                <td>Source:</td>
                <td>{source}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{startTime.toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td>{startTime.toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Airport:</td>
                <td>{startAirport}</td>
              </tr>
            </table>
          </div>
          <div className="destinationDetails">
            <table>
              <tr>
                <th>Destination Details</th>
              </tr>
              <tr>
                <td>Destination:</td>
                <td>{destination}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{endTime.toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td>{endTime.toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Airport:</td>
                <td>{endAirport}</td>
              </tr>
            </table>
          </div>
          <div className="price">
            Price: 
            {price}&#129689;
          </div>
          <div className="passengersLabel">
            <div className="label">Passengers</div>
            <PassengerCounter 
              handleAddPassenger={this.handleAddPassenger}
              handleSubtractPassenger={this.handleSubtractPassenger}
              passengerNumber={this.state.passengerNumber.length}/>
          </div>
          <div className="bookingSection">
            {
              this.state.passengerNumber.map(passenger => (
                <div className="passengerField">
                  <div className="passengerNumber">Passenger {passenger}</div>
                  <div className="formGroup">
                    <input type="text" className="formInput" name='passengerFName' id={`passenger${passenger}FName`} placeholder=' ' onChange={() => this.handleChange('passengerFName', passenger)}/>
                    <label htmlFor={`passenger${passenger}FName`} className="formLabel">First Name</label>
                  </div>
                  <div className="formGroup">
                    <input type="text" className="formInput" name='passengerLName' id={`passenger${passenger}LName`} placeholder=' ' onChange={() => this.handleChange('passengerLName', passenger)}/>
                    <label htmlFor={`passenger${passenger}LName`} className="formLabel">Last Name</label>
                  </div>
                  <div className="formGroup">
                    <select name="passengerGender" id="gender" className='formSelect' onChange={() => this.handleChange('passengerGender', passenger)}>
                      <option value='' selected disabled hidden></option>
                      <option className="formOption" value="Male">Male</option>
                      <option className="formOption" value="Female">Female</option>
                      <option className="formOption" value="Others">Others</option>
                    </select>
                    <label htmlFor="gender" className="formLabel">Gender</label>
                  </div>
                  <button className="btn select" onClick={() => this.selectPassenger(passenger)}>Select</button>
                </div>
              ))
            }
          </div>
          <SeatsContainer 
            seatsArray={seatsArray}
            handleSeatSelect={this.handleSeatSelect}/>

          <NavigationButton 
            value={this.state.bookButtonValue}
            buttonFunction={this.state.bookButtonFunction}
            buttonClass={this.state.bookButtonClass} />
        </div>
      </div>
    );
  }
}
 
export default BookingPage;