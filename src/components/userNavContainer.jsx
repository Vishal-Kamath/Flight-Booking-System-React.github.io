import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from '../svg/userIcon.svg';

const UserNavContainer = (props) => {
  const {loggedIn, username, handleRefresh } = props;
  const location = useLocation();
  return ( 
    <nav>
      {
        !loggedIn
        ? <React.Fragment>
            <Link className='btn sign' to={'/signin'}>Sign In</Link>
            <Link className='btn sign' to={'/signup'}>Sign Up</Link>
          </React.Fragment>
        : location.pathname !== '/user'
          ? <Link className='btn user' to={'/user'} onClick={() => handleRefresh()}>
              <img src={UserIcon} alt={'User Icon'}/>
              {username}
            </Link>
          : null
      }
    </nav>
  );
}
 
export default UserNavContainer;