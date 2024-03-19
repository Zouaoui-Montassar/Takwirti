import './App.css';
import Sign_up from './components/sign_up';
import Sign_in from './components/sign_in';
import Stats from './components/stats';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashboardRes from './components/DashboardRes';
import ParentCalendar from './components/parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTerrain from './components/AddTerrain';

const links = [
  {label: 'Accueil', path: '/'} ,
  {label: 'Page 1', path: '/page1'} ,
  {label: 'Page 2', path: '/page2' },
 // Add more links as needed
];

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/sidebar" element={<SideBar links={links}/>} />
          <Route path="/calendar" element={<ParentCalendar/>} />
          <Route path="/signup" element={<Sign_up/>} />
          <Route path="/signin" element={<Sign_in/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path='/addterrain' element={<AddTerrain/>}></Route>
          <Route path='/dashboard' element={<DashboardRes/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
