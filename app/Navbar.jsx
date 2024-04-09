'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserStore from "./stores/userStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  // Array of paths where the Navbar should not be shown
  const excludedPaths = ["/login", "/signup"];

  // Check if the current path is in the excludedPaths array
  const isExcludedPath = excludedPaths.includes(router.pathname);

  // If user is null or the current path is excluded, do not render the Navbar
  if (!user || isExcludedPath) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800 text-white">
      <div className="flex items-center">
        <span className="font-semibold text-xl tracking-tight">Nly E-store</span>
        <div className="ml-4 flex flex-row">
          <Link href="/">
            <h1 className="mr-4">Home</h1>
          </Link>
          <Link href="/inbox">
            <h1 className="mr-4">Inbox</h1>
          </Link>
          {/* Conditionally render Dashboard link based on user type */}
          {user.role === 'buyer' && (
            <Link href="/buyerDashboard">
              <h1>Dashboard</h1>
            </Link>
          )}
          {user.role === 'supplier' && (
            <Link href="/supplierDashboard">
              <h1>Dashboard</h1>
            </Link>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p>Welcome, {user.name}</p>
      </div>
    </nav>
  );
};

export default Navbar;
