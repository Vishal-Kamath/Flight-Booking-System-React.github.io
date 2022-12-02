import './scss/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './components/navbar';
import SignUpPage from './components/signUpPage';
import SignInPage from './components/signInPage';
import UserPage from './components/userPage';
import SearchTab from './components/searchTab';
import SearchResults from './components/searchResults';
import BookingPage from './components/bookingPage';
import BookingDetailsPage from './components/bookingDetailsPage';

function App() {
  return (
    <BrowserRouter basename='/Flight-Booking-System-React.github.io'>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route path='user' element={<UserPage />} />
          <Route path='bookingDetails' element={<BookingDetailsPage />}/>
          <Route path='booking' element={<BookingPage />}/>
          <Route path='/' element={<SearchTab />}>
            <Route path='search' element={<SearchResults />}/>
          </Route>
        </Route>
        
        <Route path='/signin' element={<SignInPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='*' element={<h1>ERROR</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
