// import React, { useContext, useRef } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; // adjust path
// import toast from "react-hot-toast";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   const toastRef = useRef(false);

//   if (!user) {
//     // Ensure toast shows only once
//     if (!toastRef.current) {
//       toast.error("🚨 Please login first to access this page!");
//       toastRef.current = true;
//     }
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;









import React, { useContext, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const toastRef = useRef(false);

  // ✅ Wait until loading finishes
  if (loading) {
    return null; // or a spinner: <div>Loading...</div>
  }

  if (!user) {
    if (!toastRef.current) {
      toast.error("🚨 Please login first to access this page!");
      toastRef.current = true;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
