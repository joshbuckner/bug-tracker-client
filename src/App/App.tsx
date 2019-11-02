import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Register from '../containers/Register/Register';
import Login from '../containers/Login/Login';
import Dashboard from '../containers/Dashboard/Dashboard';
import Menu from '../components/Menu/Menu';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bug Tracker</h1>
          <Menu />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </header>
      </div>
    </Router>
  );
}

export default App;
