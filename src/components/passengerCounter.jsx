import React from 'react';
import NavigationButton from './navigationButton';

const PassengerCounter = (props) => {
  const {handleAddPassenger, handleSubtractPassenger, passengerNumber} = props;
  return ( 
    <div className="passengerCounter">
      <NavigationButton 
        value='-'
        buttonFunction={handleSubtractPassenger} 
        buttonClass='counterButton' />

      {passengerNumber}
      
      <NavigationButton 
        value='+'
        buttonFunction={handleAddPassenger} 
        buttonClass='counterButton' />
    </div>
  );
}
 
export default PassengerCounter;