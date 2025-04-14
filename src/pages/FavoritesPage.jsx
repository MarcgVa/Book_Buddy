import React, { useEffect } from "react";
import { useCheckInBookMutation } from "../services/bookService";
import { Navigate, useNavigate } from "react-router-dom";

export default function FavoritesPage({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    !token ? navigate("/login") : null;
  }, []);

  return <div>FavoritesPage</div>;
}
