import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Notfallbetreuung from './pages/Notfallbetreuung/Notfallbetreuung';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Notfallbetreuung" component={Notfallbetreuung} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;

