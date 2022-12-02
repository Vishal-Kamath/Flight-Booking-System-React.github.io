import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import UserIcon from '../svg/userIcon.svg';
import BookingDetailsCard from './bookingDetailsCard';

const UserPage = () => {
  const navigate = useNavigate();
  const {user, bookingDetails, handleLogout} = useOutletContext();
  if (!user.username) return navigate('/')
  return (  
    <div className="userPage">
      <div className="userDetailsContainer">
        <div className="userImageContainer">
          <img src={UserIcon} alt={'User Icon'}/>
        </div>
        <div className="userDetails">
          <div className="username">{user.username}</div>
          <table>
            <tr>
              <td>Name:</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>DOB:</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <td>Coins:</td>
              <td>
                {user.coins}
                &#129689;
              </td>
            </tr>
          </table>
          <button className="btn logout" onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>
      <div className="bookingDetailsContainer">
        {
          bookingDetails.map(booking => (
            <BookingDetailsCard booking={booking} />
          ))
        }
      </div>
    </div>
  );
}
 
export default UserPage;