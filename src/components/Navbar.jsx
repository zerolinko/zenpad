import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-4 py-3 flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : "hover:underline"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : "hover:underline"
        }
      >
        Create
      </NavLink>
    </nav>
  );
}
