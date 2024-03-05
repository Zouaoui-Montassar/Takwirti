import './App.css';
import Sign_up from './components/sign_up';
import Sign_in from './components/sign_in';
import ParentComponent from './components/parentcalendar';
import List from './components/list';


function App() {
  return (
    <div className="App">
      <ParentComponent/>
      <Sign_up/>
      <Sign_in/>
      <List date="2003-03-05" />

    </div>
  );
}

export default App;
