// src/context/GlobalContext.js
import React, { createContext, useReducer } from 'react';

// Create the context
export const GlobalContext = createContext();

// Initial state
const initialState = {
  user: null,
};

// Reducer function to handle state actions
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Global Provider to wrap the app
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};


