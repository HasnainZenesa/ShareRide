import React from "react";
import RootNavigator from "./src/nav/RootNavigator";
import { UserProvider } from "./src/state/useUser";

export default function App(){
  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
}
