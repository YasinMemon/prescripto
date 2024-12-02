import { useState } from "react";
import Login from "./pages/Login";

export default function App() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const [aToken, setaToken] = useState('');
  return (
    <>
      <Login setaToken={setaToken} />
    </>
  );
}
