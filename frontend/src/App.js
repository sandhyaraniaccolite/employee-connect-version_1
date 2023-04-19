
import './App.css';
import Context, { Authentication } from './Components/Authentication';
import RoleBasedRoutes from './Components/RoleBasedRoutes';

function App() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (<Authentication>
      <RoleBasedRoutes/>
      {console.log(date)}
    </Authentication>
    
  );

}

export default App;