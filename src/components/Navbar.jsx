import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Study Companion</div>
        
        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/subjects" className="nav-link" onClick={closeMenu}>Subjects</NavLink>
          <NavLink to="/tasks" className="nav-link" onClick={closeMenu}>Tasks</NavLink>
          <NavLink to="/revision" className="nav-link" onClick={closeMenu}>Revision</NavLink>
          <NavLink to="/ai-tools" className="nav-link" onClick={closeMenu}>AI</NavLink>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
}