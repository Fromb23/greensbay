import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/UserLogin';
import CartSummary from './pages/Checkout';
import SignupForm from './components/TempHeader';
import PageTitleUpdater from './components/PageTitleUpdater';

function App() {
  return (
    <Router>
      <PageTitleUpdater />
      <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/test" element={<SignupForm />} />
        <Route path="/auth/login/" element={<Login />} /> 
        <Route path="/cart/" element={<CartPage />} />
        <Route path="/checkout/summary" element={<CartSummary />} />

      </Routes>
    </Router>
  );
}

export default App;