import Navbar from './navbar';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import RecipeForm from './RecipeForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {AuthProvider} from './Context/AuthContext'

function App() {
  return (
    <Router>
    <AuthProvider>
       <div className="App">
      <Navbar />
      <div className="content">
        <Routes>

          {/*public routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/recipeForm' element={<RecipeForm />}/>

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
    </AuthProvider>
   
    </Router>
  );
}

export default App;
