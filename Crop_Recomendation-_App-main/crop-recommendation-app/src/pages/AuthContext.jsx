// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedTime = localStorage.getItem("loginTime");

//     if (storedUser && storedTime) {
//       const now = new Date().getTime();
//       const sevenDays = 7 * 24 * 60 * 60 * 1000;

//       if (now - parseInt(storedTime) < sevenDays) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         localStorage.removeItem("user");
//         localStorage.removeItem("loginTime");
//       }
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("loginTime", new Date().getTime());
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("loginTime");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };










import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ new loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTime = localStorage.getItem("loginTime");

    if (storedUser && storedTime) {
      const now = new Date().getTime();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (now - parseInt(storedTime) < sevenDays) {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
      }
    }

    setLoading(false); // ✅ done loading after checking localStorage
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", new Date().getTime());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
