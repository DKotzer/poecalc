import "./App.css";
import { useState } from "react";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import CalculatorPage from "../CalculatorPage/CalculatorPage";
import EmulatorPage from "../EmulatorPage/EmulatorPage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className='App'>
      <NavBar user={user} />
      {user ? (
        <>
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
            <Route path='/calculator' element={<CalculatorPage />} />
            <Route path='/emulator' element={<EmulatorPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} user={user} />
      )}
    </main>
  );
}
