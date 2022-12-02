import React from 'react';

const Seat = (props) => {
  const {seatStatus, seatRow, seatColumn, handleSeatSelect} = props;
  return ( 
    <button 
      key={seatRow + seatColumn}
      className={`seatButton ${seatStatus}`} 
      onClick={() => handleSeatSelect(seatRow, seatColumn)}
      id={seatRow + seatColumn}>
      {seatRow}{seatColumn}
    </button>
  );
}
 
export default Seat;