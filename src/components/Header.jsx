import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { TheamConext } from "../context/TheamContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {theam, toggleButton} = useContext(TheamConext)

  const navItems = [
    { label: "Virtual Demo", to: "/virtual-demo" },

    { label: "Life Ciycle Demo", to: "/life-ciycle" },

    { label: "Use Memo", to: "/use-memo" },

    { label: "Use CallBack", to: "/use-callBack" },

    { label: "Form Validation", to: "/form-validation" },

    { label: "Validation 50 Field", to: "/validation-50-field" },

    { label: "React Redux", to: "/react-redux" },

    { label: "Flight Booker", to: "/flight-booker" },
    
    { label: "Tic Tac Toe", to: "/tic-tac-toe" },

    { label: "Image Layout", to: "/image-layout" },

    { label: "Use Reducer", to: "/reducer" },

    {
      label: "Services",
      dropdown: [
        { label: "Web Development", to: "/services/web" },
        { label: "Mobile Apps", to: "/services/mobile" },
        { label: "UI/UX Design", to: "/services/uiux" },
        { label: "Digital Marketing", to: "/services/marketing" },
      ],
    },

    {
      label: "Solutions",
      dropdown: [
        { label: "Enterprise", to: "/solutions/enterprise" },
        { label: "Startups", to: "/solutions/startups" },
        { label: "E-commerce", to: "/solutions/ecommerce" },
        { label: "Education", to: "/solutions/education" },
      ],
    },

    { label: "Portfolio", to: "/portfolio" },

    {
      label: "Company",
      dropdown: [
        { label: "About Us", to: "/about" },
        { label: "Team", to: "/team" },
        { label: "Careers", to: "/careers" },
        { label: "Contact", to: "/contact" },
      ],
    },

    { label: "Blog", to: "/blog" },
    { label: "Dice Roller", to: "/dice" },
  ];

  return (
    <header className="sticky-top bg-white shadow-sm" style={{ zIndex: 1000 }}>
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between py-3">

          {/* Logo */}
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <div
              className="rounded d-flex align-items-center justify-content-center me-2"
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <span className="text-white fw-bold fs-5">L</span>
            </div>
            <span className="fs-3 fw-bold text-primary">Logo</span>
          </Link>

          <button onClick={toggleButton}>
            Theam : {theam}
          </button>

          {/* Desktop Menu */}
          <nav className="d-none d-md-flex">
            <ul className="navbar-nav d-flex flex-row mb-0">
              {navItems.map((item) => (
                <li key={item.label} className="nav-item position-relative mx-3">
                  <div
                    onMouseEnter={() =>
                      item.dropdown && setActiveDropdown(item.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="nav-link text-dark p-0 text-decoration-none"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button className="nav-link d-flex align-items-center text-dark p-0 border-0 bg-transparent">
                        {item.label}
                        <ChevronDown size={16} className="ms-1" />
                      </button>
                    )}

                    {/* Desktop Dropdown */}
                    {item.dropdown && activeDropdown === item.label && (
                      <div className="position-absolute start-0 mt-2 bg-white shadow rounded py-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            className="dropdown-item px-4 py-2 text-decoration-none"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="d-md-none btn border-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="d-md-none pb-3">
            <div className="list-group">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="list-group-item list-group-item-action border-0 py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="list-group-item list-group-item-action border-0 d-flex justify-content-between py-3"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={
                          activeDropdown === item.label ? "rotate-180" : ""
                        }
                      />
                    </button>
                  )}

                  {/* Mobile Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="ms-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          className="list-group-item list-group-item-action border-0 py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .nav-link:hover,
        .dropdown-item:hover,
        .list-group-item:hover {
          color: #667eea !important;
        }
        .rotate-180 {
          transform: rotate(180deg);
        }
      `}</style>
    </header>
  );
};

export default Header;
