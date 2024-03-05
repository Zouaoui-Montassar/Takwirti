import './App.css';
import SideBar from './components/SideBar';

const links = [
   {label: 'Accueil', path: '/'} ,
   {label: 'Page 1', path: '/page1'} ,
   {label: 'Page 2', path: '/page2' },
  // Add more links as needed
];

function App() {
  return (
    <div >
      <SideBar links={links}/>
    </div>
  );
}

export default App;
