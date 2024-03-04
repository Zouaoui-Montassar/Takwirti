import './App.css';
import Sign_up from './components/sign_up';
import Sign_in from './components/sign_in';
import Calendar from './components/calendar';
import Calendar1 from './components/calendar';

function App() {
  return (
    <div className="App">
      <Calendar/>
      <Sign_up/>
      <Sign_in/>
    </div>
  );
}

export default App;
