import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserNavContainer from './userNavContainer';
import Cookie from 'js-cookie';
import ip from '../utiles/ipAddress';

class NavBar extends Component {
  state = {  
    loggedIn: false,
    user: {},
    bookingDetails: []
  };

  componentDidMount = () => {
    const accessToken = Cookie.get('accessToken');
    if (!accessToken) {
      return this.setState({
        loggedIn: false,
        user: {},
        bookingDetails: []
      })
    } 
    fetch(`${ip}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Authorization) {
          this.setState({
            loggedIn: true,
            user: data.user,
            bookingDetails: data.bookingDetails
          })
        }
        if (!data.Authorization) {
          this.setState({
            loggedIn: false,
            user: {},
            bookingDetails: []
          })
        }
      })
  }

  handleRefresh = () => {
    const accessToken = Cookie.get('accessToken');
    if (!accessToken) {
      return this.setState({
        loggedIn: false,
        user: {},
        bookingDetails: []
      })
    } 
    fetch(`${ip}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Authorization) {
          this.setState({
            loggedIn: true,
            user: data.user,
            bookingDetails: data.bookingDetails
          })
        }
        if (!data.Authorization) {
          this.setState({
            loggedIn: false,
            user: {},
            bookingDetails: []
          })
        }
      })
  }

  

  handleLogout = () => {
    const consfirmOutput = window.confirm('Are you sure you want to Logout')
    if(!consfirmOutput) return
    Cookie.remove('accessToken');
    this.setState({
      loggedIn: false,
      user: {}
    })
    window.location.assign('/')
  }

  render() {
    return (
      <React.Fragment>
        <header className='navBar'>
          <div className="logo">
            <Link to={'/'}>
              <span style={{color: '#00aaff'}}>Air</span>Easy
            </Link>
          </div>
          <UserNavContainer 
            loggedIn={this.state.loggedIn} 
            username={this.state.user.username } 
            handleRefresh={this.handleRefresh}/>
        </header>
        <Outlet 
          context={{
            user: this.state.user, 
            bookingDetails: this.state.bookingDetails ,
            handleLogout: this.handleLogout }}/>
      </React.Fragment>
    );
  }
}
 
export default NavBar;