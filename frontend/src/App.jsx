import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/UserLogin';
import SignupForm from './components/TempHeader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/test" element={<SignupForm />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/auth/login/" element={<Login />} /> 
        <Route path="/cart/" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;