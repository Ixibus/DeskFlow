import { Navigate, Outlet, useLocation, useNavigationType } from "react-router";
import { useEffect, useState } from "react";

export function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
    if (!apiUrl) {
      setAuthed(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${apiUrl}/users/me`, {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, [location.pathname, navigationType]);

  if (loading) return <div>Chargement...</div>;

  console.log(authed)

  return authed ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
}