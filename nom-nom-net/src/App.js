import Navbar from './navbar';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>

          {/*public routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/*Protected Routes*/}
          <Route path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} 
          />

        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
