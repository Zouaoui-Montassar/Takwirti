import './App.css';
import Sign_up from './components/Sign_up';
import Sign_in from './components/Sign_in';
import Stats from './components/Stats';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashboardRes from './components/DashboardRes';
import ParentCalendar from './components/Parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTerrain from './components/AddTerrain';
import Responsable from './components/Responsable';
import MesTerrains from 'components/MesTerrains';

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
          <Route path='/responsable' element={<Responsable/>}/>
          <Route path='/addterrain' element={<AddTerrain/>}/>
          <Route path='/mesterrains' element={<MesTerrains/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
