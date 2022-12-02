import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ip from '../utiles/ipAddress';
import Cookie from 'js-cookie';

function handleSignIn(e, navigate) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const msgBox = document.getElementById('msgBox');
  

  if (!username || !password ) {
    if(!msgBox.classList.contains('failed')) {
      msgBox.classList.add('failed');
    }
    return msgBox.innerHTML = 'Please fill all detaills';
  }

  fetch(`${ip}/api/signin`,{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(res => res.json())
    .then(async data => {
      if (data.message === 'success') {
        if (msgBox.classList.contains('failed')) 
          msgBox.classList.remove('failed');
        msgBox.classList.add('success');
        msgBox.innerHTML = data.message;
        Cookie.set('accessToken', data.accessToken, { expires: 30, path: '/' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        return navigate('/');
      }
      if (!msgBox.classList.contains('failed')) 
        msgBox.classList.add('failed');
      return msgBox.innerHTML = data.message;
    })
  
}

const SignInPage = () => {
  const navigate = useNavigate();
  return ( 
    <div className="signPage">
      <div className="signContainer">
        <div className="logo">
          <Link to={'/'}>
            <span style={{color: '#00aaff'}}>Air</span>Easy
          </Link>
        </div>

        <div id="msgBox"></div>

        <form>

          <div className="formGroup">
            <input type="text" className="formInput" name='username' id='username' placeholder=' ' />
            <label htmlFor="username" className="formLabel">Username</label>
          </div>

          <div className="formGroup">
            <input type="password" className="formInput" name='password' id='password' placeholder=' ' />
            <label htmlFor="password" className="formLabel">Password</label>
          </div>

          <input type="reset" className='btn sign' value={'reset'}/>
          <input type="submit" className='btn sign' value={'submit'} onClick={(e) => handleSignIn(e, navigate)}/>
        </form>
      </div>

      <div className="orContainer">
        <div className="orText">OR</div>
      </div>

      <div className="signContainer">
        <p>Don't have an account <Link to="/signup">Sign up</Link> here</p> 
      </div>
    </div>
  );
}
 
export default SignInPage;