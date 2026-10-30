import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BranchSelector from "./components/BranchSelector";
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-10">
    <p className="label-caps text-secondary">Atelier</p>
    <h1 className="headline-lg">{name}</h1>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <BranchSelector />
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Placeholder name="Home" />} />
        <Route path="/shop" element={<Placeholder name="Shop" />} />
        <Route
          path="/product/:id"
          element={<Placeholder name="Product Details" />}
        />
        <Route path="/cart" element={<Placeholder name="Cart (N)" />} />
        <Route path="/checkout" element={<Placeholder name="Checkout (N)" />} />
        <Route
          path="/orders/:id"
          element={<Placeholder name="Order Tracking (N)" />}
        />

        {/* Auth + Admin */}
        <Route path="/login" element={<Placeholder name="Login (L)" />} />
        <Route path="/admin/*" element={<Placeholder name="Admin (L, R)" />} />
      </Routes>
    </BrowserRouter>
  );
}
