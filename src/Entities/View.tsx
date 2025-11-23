import { createContext, type ReactNode, useState, useContext } from "react";

export type View = "Start" | "Pre" | "Niri" | "Audio" | "Utils";

export interface ViewContext {
  /** По умолчанию `Start` */
  view: View;
  changeView: (view: View) => void;
}
export const ViewContext = createContext<ViewContext | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<View>("Start");

  const changeView = (newView: View) => setView(newView);

  return (
    <ViewContext.Provider value={{ view, changeView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
