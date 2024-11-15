import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
