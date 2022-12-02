import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton = (props) => {
  const { value, buttonFunction, buttonClass, functionParameter } = props;
  const navigate = useNavigate();
  return (  
    <React.Fragment>
      {
        functionParameter !== undefined
        ? <button
            className={buttonClass}
            onClick={() => buttonFunction(navigate, functionParameter)}>
            {value}
          </button>
        : <button
            className={buttonClass}
            onClick={() => buttonFunction(navigate)}>
            {value}
          </button>
      }
    </React.Fragment>  
  );
}
 
export default NavigationButton;