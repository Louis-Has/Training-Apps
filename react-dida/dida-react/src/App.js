import "./App.css";
import Main from "./LoginPages/Main";
import Login from "./LoginPages/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/account"></Redirect>
        </Route>
        <Route path="/account" component={Login}></Route>
        <Route path="/webapp" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
