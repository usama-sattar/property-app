import './App.css';
import { Switch, Route } from "react-router-dom";
import Auth from './components/auth'
import Dashboard from './components/dashboard'
import AuthContextProvider from "./context/auth";
import  Ads  from './components/ads';

function App() {
  return (
    <div>
      <AuthContextProvider>
       <Switch>
        <Route   exact path='/' component={Auth}/>
          <Route  path='/login' component={Auth}/>
          <Route  path='/dashboard' component={Dashboard}/>
          <Route  path='/ads' component={Ads}/>
      </Switch>
      </AuthContextProvider>
    </div>
  );
}
export default App;
