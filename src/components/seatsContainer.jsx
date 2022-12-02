import React from 'react';
import Seat from './seat';

 
const SeatsContainer = (props) => {
  return (
    <React.Fragment>
      <div className="seatsLabel">Seats</div>
      <div className="seatsContainer">
        <div className="seats">
          {
            props.seatsArray.map(seat => (
              <Seat 
                seatStatus={seat.status}
                seatRow={seat.seatRow} 
                seatColumn={seat.seatColumn}
                handleSeatSelect={props.handleSeatSelect}/>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  );
}
 
export default SeatsContainer;