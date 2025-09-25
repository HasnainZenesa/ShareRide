import React, { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function UserProvider({ children }) {
  const [active, setActive] = useState(false);     // duty toggle
  const [streak, setStreak] = useState(15);        // header badge number
  const [name, setName] = useState("You");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=5");

  const value = { active, setActive, streak, setStreak, name, setName, avatar, setAvatar };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useUser() { return useContext(Ctx); }
