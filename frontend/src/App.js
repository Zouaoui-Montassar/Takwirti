import './App.css';
import Sign_in from './pages/Sign_in';
import Stats from './components/Stats';
import MainPage from './pages/MainPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashboardRes from './components/DashboardRes';
import ParentCalendar from './components/Parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Terrain from './components/Terrain';
import Responsable from './pages/Responsable';
import TerrainsResp from './components/TerrainsResp';
import PageUtilisateur from './pages/PageUtilisateur';
import Detail from './components/Detail';
import Profile from './components/Profile';
import Sign_up from './pages/sign_up';
import { ReservationAdd } from './components/ReservationAdd';
import ReservationEdit from './components/ReservationEdit';
import ReservationList from './components/ReservationList';
import List from './components/List';
import SearchBox from './components/SearchBox';
import TerrainList from './components/TerrainList';
import ProfileModif from './components/ProfileModif';

const data = [
  { id: 1, name: 'Item 1', image:'/Section 1 image.jpg' },
  { id: 2, name: 'Item 2', image:'/Section 2 image.png' },
  { id: 3, name: 'Item 3', image:'/Section 3 image.jpg' },
  { id: 4, name: 'Item 4', image:'/Section 3 image.jpg' },
  { id: 5, name: 'Item 5', image:'/Section 3 image.jpg' },
  // Add more items as needed
];

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
          <Route path="/" element={<MainPage HomePage={true}/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/sidebar" element={<SideBar links={links}/>} />
          <Route path="/calendar" element={<ParentCalendar/>} />
          <Route path="/signuprespo" element={<Sign_up xxx={"responsable"}/>} />
          <Route path="/signupparti" element={<Sign_up xxx={"particulier"}/>} />
          <Route path="/signin" element={<Sign_in/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path='/responsable' element={<Responsable/>}/>
          <Route path='/terrain/add' element={<Terrain func={"add"} id={"9876543210fedcba"}/>}/>
          <Route path='/terrain/responsable' element={<TerrainsResp/>}/>
          <Route path='/particulier' element={<PageUtilisateur/>}/> 
          <Route path="/terrain/detail/:id" element={<Detail/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/modifier" element={<ProfileModif/>} />

          <Route path="/Reservation/add/:idUser/:idTer" element={<ReservationAdd/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/reservation/list" element={<ReservationList/>} />
          <Route path="/reservation/edit" element={<ReservationEdit/>} />
          <Route path='/terrain/update/:id' element={<Terrain func={"update"}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
