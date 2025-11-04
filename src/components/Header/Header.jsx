import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../Header/images/logo.png";
import "./Header.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const dropdownItems = [
    { id: "cart", label: t("header.cart") },
    { id: "shops", label: t("header.shops") },
    { id: "single", label: t("header.single") },
    { id: "singleProduct", label: t("header.singleProduct") },
    { id: "contact", label: t("header.contact") }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          {/* Logo */}
          <a href="#" className="header__logo">
            <img src={Logo} alt="logo" />
          </a>

          <nav className={`header__nav ${isMenuOpen ? "active" : ""}`}>
            <ul className="header__list">
              <li className="header__item"><a href="#home" className="nav__link">{t("header.home")}</a></li>
              <li className="header__item"><a href="#services" className="nav__link">{t("header.services")}</a></li>
              <li className="header__item"><a href="#products" className="nav__link">{t("header.products")}</a></li>
              <li className="header__item"><a href="#watches" className="nav__link">{t("header.watches")}</a></li>
              <li className="header__item"><a href="#sale" className="nav__link">{t("header.sale")}</a></li>

              <li
                className="header__item dropdown"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <a href="#blog" className="nav__link dropdown__toggle">
                  {t("header.blog")} <FaChevronDown className="dropdown__arrow" />
                </a>
                <div className={`dropdown__menu ${dropdownOpen ? "active" : ""}`}>
                  {dropdownItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`dropdown__item ${activeDropdown === item.id ? "active" : ""}`}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a href={`#${item.id}`} className="dropdown__link">{item.label}</a>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </nav>

          <div className="header__icons">
            <div className="icon-wrapper">
              <FaSearch className="icon" />
              <span className="icon-tooltip">{t("header.search")}</span>
            </div>
            <div className="icon-wrapper">
              <FaUser className="icon" />
              <span className="icon-tooltip">{t("header.account")}</span>
            </div>
            <div className="icon-wrapper cart-icon">
              <FaShoppingCart className="icon" />
              <span className="icon-tooltip">{t("header.cart")}</span>
            </div>


            <div className="lang-selector">
              <select className="lang-select" onChange={changeLanguage}>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Burger menu */}
            <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;