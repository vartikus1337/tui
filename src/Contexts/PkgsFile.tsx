import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import pkgs from "@/Data/Pkgs.json";

export type PackageItem =
  | string
  | { name: string; description?: string; aur?: boolean; disabled?: boolean };

interface PackagesFile {
  aurHelper: string;
  PreInstallPkgs: PackageItem[];
  NiriPkgs: PackageItem[];
  SoundPkgs: PackageItem[];
  UtilsPkgs: PackageItem[];
}

type PkgsContextType = {
  data: PackagesFile;
  setData: React.Dispatch<React.SetStateAction<PackagesFile>>;
  changeAurHelper: (newHelper: string) => void;
};

const PkgsContext = createContext<PkgsContextType | undefined>(undefined);

export const PkgsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PackagesFile>(() => pkgs as PackagesFile);

  const changeAurHelper = (newHelper: string) => {
    setData((prev) => ({ ...prev, aurHelper: newHelper }));
  };

  return (
    <PkgsContext.Provider value={{ data, setData, changeAurHelper }}>
      {children}
    </PkgsContext.Provider>
  );
};

export const usePkgsFile = (): PkgsContextType => {
  const ctx = useContext(PkgsContext);
  if (!ctx) throw new Error("usePkgs must be used within a PkgsProvider");
  return ctx;
};
