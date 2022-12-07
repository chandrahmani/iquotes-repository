import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "components/core/nav/Nav";
import Login from "views/login/Login";
import SignUp from "views/signup/SignUp";

import "./App.css";
import { useReducer } from "react";
import Dashboard from "views/dashboard/Dashboard";
import Home from "views/home/Home";
import Contact from "views/contact/Contact";
import Profile from "views/profile/Profile";
import { AppContext } from "store/contexts/contexts";
import { reducer } from "store/reducer/reducer";

export const initialState = {
  me: null,
  isAuth: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const value = {
    me: state.me,

    updateMe: (payload) => {
      dispatch({
        type: "UPDATE_ME",
        payload: payload,
      });
      // console.log("p", payload);
    },
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={value}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
