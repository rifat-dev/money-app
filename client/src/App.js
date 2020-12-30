import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from '../src/pages/home'
import Login from '../src/pages/login'
import Register from '../src/pages/register'
import Dashbord from '../src/pages/dashbord'
import Nav from './components/nav/nav'
import { connect } from 'react-redux'

function App({ auth }) {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {auth.isAuthenticated ?
            <Route path="/dashbord" component={Dashbord} />
            :
            <Route path="/login" component={Login} />
          }

        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
