import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import UserDetailsContainer from './userPage/userDetailsContainer';


const UserPage = () => {
  const navigate = useNavigate();
  const {user, bookingDetails, handleLogout, handleRefresh} = useOutletContext();
  if (!user.username) return navigate('/')
  return (  
    <div className="userPage">
      <UserDetailsContainer 
        user={user}
        bookingDetails={bookingDetails}
        handleLogout={handleLogout} 
        handleRefresh={handleRefresh}/>
    </div>
  );
}
 
export default UserPage;