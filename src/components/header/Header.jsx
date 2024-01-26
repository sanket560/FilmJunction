import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../Images/film-junction-logo.svg";

const Header = () => {
    // State variables for controlling the header behavior
    const [show, setShow] = useState("top");        // Controls the visibility of the header
    const [lastScrollY, setLastScrollY] = useState(0); // Keeps track of the last scroll position
    const [mobileMenu, setMobileMenu] = useState(false); // Controls the visibility of the mobile menu
    const [query, setQuery] = useState("");          // Stores the search query
    const [showSearch, setShowSearch] = useState(""); // Controls the visibility of the search bar

    // React Router hooks for navigation
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect hook to scroll to the top when the route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Function to control the header visibility based on scroll position
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    // useEffect hook to add and remove the scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    // Function to handle search queries
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    // Function to open the search bar
    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    // Function to open the mobile menu
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    // Function to handle navigation based on media type
    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    // Rendering the header component
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            {/* Wrapping header content in ContentWrapper component */}
            <ContentWrapper>
                {/* Logo */}
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                {/* Desktop Menu */}
                <ul className="menuItems">
                    {/* Navigation for Movies */}
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>
                        Movies
                    </li>
                    {/* Navigation for TV Shows */}
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>
                        TV Shows
                    </li>
                    {/* Search icon */}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                {/* Mobile Menu */}
                <div className="mobileMenuItems">
                    {/* Search icon for mobile */}
                    <HiOutlineSearch onClick={openSearch} />
                    {/* Mobile menu toggle icon */}
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>

            {/* Search Bar */}
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            {/* Search input field */}
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            {/* Close search bar icon */}
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

// Exporting the Header component as default
export default Header;
