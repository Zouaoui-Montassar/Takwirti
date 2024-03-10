import './App.css';
import Sign_up from './components/sign_up';
import Sign_in from './components/sign_in';
import Stats from './components/stats';
import MainPage from './components/MainPage';
import ParentCalendar from './components/parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRes from './components/DashboardRes';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage/>} />
          <Route path="/Dashboard" element={<DashboardRes/>} />
          <Route path="/calendar" element={<ParentCalendar/>} />
          <Route path="/signup" element={<Sign_up/>} />
          <Route path="/signin" element={<Sign_in/>} />
          <Route path="/stats" element={<Stats/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
