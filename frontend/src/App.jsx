import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TournamentPage from "./pages/TournamentPage";
import TournamentReg from "./pages/TournamentReg";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminTournament from "./pages/AdminTournament"; 
import ProtectedRoute from "./ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import { useEffect, useState } from "react";

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token); 
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/tournaments" element={<TournamentPage />} />
      <Route path="/tournamentReg/:tournamentId" element={<TournamentReg />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ✅ Pass isAdminLoggedIn to ProtectedRoute */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
            <AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tournaments"
        element={
          <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
            <AdminTournament />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
