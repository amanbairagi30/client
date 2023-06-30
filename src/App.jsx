import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux"
import Spinner from "./components/Spinner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Home from "./pages/Home";
import Verified from "./components/Verified";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const { loading } = useSelector(state => state.loaders)
  return (
    <>
      <div className="">
        {loading && <Spinner />}
        <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/users/confirm/:token' element={<Verified />} />
          <Route path='/users/:id/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
