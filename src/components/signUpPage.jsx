import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ip from '../utiles/ipAddress';

function getDate() {
  let date = new Date();
  const year = date.getFullYear() - 18;
  date.setFullYear(year);
  return date.toISOString().slice(0, 10);
}

function handleCreateUser(e, navigate) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const msgBox = document.getElementById('msgBox');
  

  if (!name || !email || !gender || !dob || !username || !password || !confirmPassword) {
    if(!msgBox.classList.contains('failed')) {
      msgBox.classList.add('failed');
    }
    return msgBox.innerHTML = 'Please fill all detaills';
  }

  if (password !== confirmPassword) {
    if(!msgBox.classList.contains('failed')) {
      msgBox.classList.add('failed');
    }
    return msgBox.innerHTML = "Passwords don't match";
  }

  if (password.length < 6) {
    if(!msgBox.classList.contains('failed')) {
      msgBox.classList.add('failed');
    }
    return msgBox.innerHTML = "Password should have atleast 6 characters";
  }


  fetch(`${ip}/api/signup`,{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      dob: dob,
      username: username,
      password: password
    })
  })
    .then(res => res.text())
    .then(async text => {
      if (text === 'success') {
        if (msgBox.classList.contains('failed')) 
          msgBox.classList.remove('failed');
        msgBox.classList.add('success');
        msgBox.innerHTML = text;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return navigate('/signin');
      }
      if (!msgBox.classList.contains('failed')) 
        msgBox.classList.add('failed');
      return msgBox.innerHTML = text;
    })
  
}

const SignUpPage = () => {
  let date = getDate()
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
            <input type="text" className="formInput" name='name' id='name' placeholder=' '/>
            <label htmlFor="name" className="formLabel">Name</label>
          </div>

          <div className="formGroup">
            <input type="email" className="formInput" name='email' id='email' placeholder=' '/>
            <label htmlFor="email" className="formLabel">Email</label>
          </div>

          <div className="formGroup">
            <select name="gender" id="gender" className='formSelect'>
              <option value='' selected disabled hidden></option>
              <option className="formOption" value="Male">Male</option>
              <option className="formOption" value="Female">Female</option>
              <option className="formOption" value="Others">Others</option>
            </select>
            <label htmlFor="gender" className="formLabel">Gender</label>
          </div>

          <div className="formGroup">
            <input type="date" className="formInput" name='dob' id='dob' max={date} defaultValue={date}/>
            <label htmlFor="dob" className="formLabel">date of birth</label>
          </div>

          <div className="formGroup">
            <input type="number" className="formInput" name='mobileNumber' id='mobileNumber' placeholder=' '/>
            <label htmlFor="mobileNumber" className="formLabel">Mobile Number</label>
          </div>

          <div className="formGroup">
            <input type="text" className="formInput" name='username' id='username' placeholder=' '/>
            <label htmlFor="username" className="formLabel">Username</label>
          </div>

          <div className="formGroup">
            <input type="password" className="formInput" name='password' id='password' placeholder=' '/>
            <label htmlFor="password" className="formLabel">Password</label>
          </div>

          <div className="formGroup">
            <input type="password" className="formInput" name='confirmPassword' id='confirmPassword' placeholder=' '/>
            <label htmlFor="confirmPassword" className="formLabel">Confirm Password</label>
          </div>

          <input type="reset" className='btn sign' value={'reset'}/>
          <input type="submit" className='btn sign' value={'submit'} onClick={(e) => handleCreateUser(e, navigate)}/>
        </form>
      </div>

      <div className="orContainer">
        <div className="orText">OR</div>
      </div>

      <div className="signContainer">
        <p>Already have an account <Link to="/signin">Sign in</Link> here</p> 
      </div>
    </div>
  );
}
 
export default SignUpPage;