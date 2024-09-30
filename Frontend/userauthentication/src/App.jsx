import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );

}


export default App
