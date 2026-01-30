import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import VirtualTableDemo from "./pages/VirtualTableDemo";
import LifeCycle from "./pages/LifeCycle";
import UseMemo from "./pages/UseMemo";
import UseCallBack from "./pages/UseCallBack";
import FormValidation from "./pages/FormValidation";
import Validation50Field from "./pages/Validation50Field";
import ReactRedux from "./pages/ReactRedux";
import FlightBooker from "./pages/FlightBooker";
import DiceRoller from "./components/DiceRoller";
import TicTacToe from "./components/TicTacToe";
import ImageLayout from "./pages/ImageLayout";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/virtual-demo" element={<VirtualTableDemo />} />
        <Route path="/life-ciycle" element={<LifeCycle />} />
        <Route path="/use-memo" element={<UseMemo />} />
        <Route path="/use-callBack" element={<UseCallBack />} />
        <Route path="/form-validation" element={<FormValidation />} />
        <Route path="/validation-50-field" element={<Validation50Field />} />
        <Route path="/react-redux" element={<ReactRedux />} />
        <Route path="/flight-booker" element={<FlightBooker />} />
        <Route path="/dice" element={<DiceRoller />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/image-layout" element={<ImageLayout />} />
        <Route path="/reducer" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
