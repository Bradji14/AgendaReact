import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import LoadingPage from "./animation/animation";

function App() {
  return (
      <BrowserRouter>

        <Routes>
          <Route path="/citasOnline" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
