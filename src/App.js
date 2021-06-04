import logo from './logo.svg';
import './App.css';
import Firebase from './components/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Record from './pages/Record';
import ForgotPassword from './pages/ForgotPassword';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' render={ () => <Redirect to="login" />}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/record' component={Record}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
