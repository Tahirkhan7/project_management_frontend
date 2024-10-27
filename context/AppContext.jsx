import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedBoardId = localStorage.getItem("boardId");

    setToken(storedToken);
    setUsername(storedUsername);
    setEmail(storedEmail);
    setBoardId(storedBoardId);

    const protectedRoutes = ["/dashboard", "/settings"];
    if (!storedToken && protectedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const login = (data) => {
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
	localStorage.setItem("boardId", data.boardId);
    setToken(data.token);
    setUsername(data.username);
    setEmail(data.email);
	setBoardId(data.boardId);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
	setBoardId(null)
    navigate("/login");
  };

  return (
    <AppContext.Provider value={{ username, email, boardId, token, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
