"use client";

import { createContext, useContext, useState } from "react";

const NotifContext = createContext(null);

export function NotifProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <NotifContext.Provider value={{ open, setOpen }}>
      {children}
    </NotifContext.Provider>
  );
}

export function useNotif() {
  return useContext(NotifContext);
}