import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import MainPage from "./components/MainPage";
import InvoiceList from "./pages/InvoiceList";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/invoices"
          element={
            // <PrivateRoute>
              <InvoiceList />
            // </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App