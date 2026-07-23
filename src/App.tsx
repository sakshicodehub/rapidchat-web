import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  console.log("token", token);
  return (
    <>
      {token ? (
        <HomePage />
      ) : (
        <LoginPage setToken={setToken} />
      )}
    </>
  );
}