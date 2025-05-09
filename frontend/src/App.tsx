import { Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import ProtectedRoute from "./pages/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { ShareBrain } from "./components/shareBrain/ShareBrain";

function App() {
  const { token } = useAuth()
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<ProtectedRoute user={token}>
        <Dashboard />
      </ProtectedRoute>} />
      <Route path="/shared-brain/:hash" element={<ShareBrain />} />
    </Routes>

  )
}

export default App
