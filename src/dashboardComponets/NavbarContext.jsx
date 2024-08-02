import React, { createContext, useState, useContext } from 'react';

// Create a Context for the navbar state
const NavbarContext = createContext();

// Custom hook to use the NavbarContext
export const useNavbar = () => useContext(NavbarContext);

// Create a provider component
export const NavbarProvider = ({ children }) => {
    const [showNavbar, setShowNavbar] = useState(false);

    // Function to toggle the navbar
    const toggleNavbar = () => {
        setShowNavbar(prevShowNavbar => !prevShowNavbar);
    };

    return (
        <NavbarContext.Provider value={{ showNavbar, toggleNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};
