import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import Dashboard from "../containers/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import "./App.scss";

export const AuthContext = React.createContext<any>(null);

interface State {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

interface User {
  email: string
  exp: number
  iat: number
  name: string
  token: string
}

interface Action {
  type: "LOGIN" | "LOGOUT"
  payload?: Payload
}

interface Payload {
  token: string
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      if (!action.payload) {
        return state;
      }
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
    const user = localStorage.getItem("user");
    const currentToken = localStorage.getItem("token");
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
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {!state.isAuthenticated ? (
            <Redirect to="/" />
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
