import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Home from "../containers/Home/Home";
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import Dashboard from "../containers/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import "./App.scss";

export const AuthContext = React.createContext<any>(null);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(jwtDecode(action.payload.token.replace("Bearer ", ""))));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: jwtDecode(action.payload.token.replace("Bearer ", "")),
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const currentToken = localStorage.getItem("token");
    const user = currentUser !== null ? JSON.parse(currentUser) : null;
    const token = currentToken !== null ? JSON.parse(currentToken) : null;

    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token
        }
      });
    }
  }, []);
  return (
    <Router>
      <AuthContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          {!state.isAuthenticated ? (
            <>
              <Redirect to="/" />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </>
          ) : (
            <>
              <Redirect to="/dashboard" />
              <Route exact path="/dashboard" component={Dashboard} />
            </>
          )}
        </div>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
