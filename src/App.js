import './App.css';
import React, { Component } from 'react';
import Menu from './components/Menu/Menu'
import routes from './routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  showContent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      });
      return <Switch> {result}</Switch>
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <div className="container">
            <div className="row">
              {this.showContent(routes)}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
