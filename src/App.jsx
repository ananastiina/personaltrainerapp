import './App.css'
import './index.css'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Typography } from "@mui/material";

function App() {

return (
<>

<AppBar position='fixed' > 
      
      <Typography variant="h6"> PT – Personal Training 
      </Typography>

      </AppBar>

<div className="App">
<nav>
<Link to={"/"}>Etusivu</Link>
<Link to={"/Trainings"}>Treenit</Link>
<Link to={"/Customers"}>Asiakkaat</Link>
</nav>
<Outlet />
</div>
</>
);
}
export default App