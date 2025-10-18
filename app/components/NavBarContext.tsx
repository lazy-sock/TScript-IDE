import { createContext, useContext } from "react";

type NavBarContextType = {
  onNavClick?: (action: string) => void;
  setOnNavClick: (cb: (action: string) => void) => void;
};

export const NavBarContext = createContext<NavBarContextType>({
  setOnNavClick: () => {},
});

export const useNavBar = () => useContext(NavBarContext);
