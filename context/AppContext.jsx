import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedBoardId = localStorage.getItem("boardId");

    setToken(storedToken);
    setUsername(storedUsername);
    setEmail(storedEmail);
    setBoardId(storedBoardId);

    const protectedRoutes = ["/", "/dashboard", "/settings"];
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
    toast.success("Login Successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setBoardId(null);
        setTimeout(() => {
          navigate("/login");
        }, 500);

  };

  const setCopyLink = (link) => {
    setCopiedLink(link);
    setTimeout(() => {
      setCopiedLink('');
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{ username, email, boardId, token, login, logout, copiedLink, setCopyLink }}
    >
      {children}
    </AppContext.Provider>
  );
};
