// Navigation.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={() => navigate("/app")}>Go to App Page</button>
      <button onClick={() => navigate("/blank")}>Go to Blank Page</button>
    </div>
  );
}
