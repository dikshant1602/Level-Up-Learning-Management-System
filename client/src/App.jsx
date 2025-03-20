import { Routes, Route } from "react-router-dom"; // ✅ No extra Router
import AuthPage from "./pages/auth";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
