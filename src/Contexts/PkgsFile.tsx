import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import pkgs from "@/Data/Pkgs.json";

export type PackageItem =
  | string
  | { name: string; description?: string; aur?: boolean; disabled?: boolean };

interface PackagesFile {
  aurHelper: string;
  NiriPkgs: PackageItem[];
  SoundPkgs: PackageItem[];
  UtilsPkgs: PackageItem[];
}

type PkgsContextType = {
  data: PackagesFile;
  setData: React.Dispatch<React.SetStateAction<PackagesFile>>;
  changeAurHelper: (newHelper: string) => void;
  toggleDisablePkg: (
    section: "NiriPkgs" | "SoundPkgs" | "UtilsPkgs",
    pkg: string,
  ) => void;
};

const PkgsContext = createContext<PkgsContextType | undefined>(undefined);

export const PkgsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PackagesFile>(() => pkgs as PackagesFile);

  const changeAurHelper = (newHelper: string) => {
    setData((prev) => ({ ...prev, aurHelper: newHelper }));
  };

  const toggleDisablePkg = (
    section: "NiriPkgs" | "SoundPkgs" | "UtilsPkgs",
    pkg: string,
  ) => {
    setData((prev) => {
      const updated = prev[section].map((item) => {
        if (typeof item === "string") {
          return item === pkg ? { name: item, disabled: true } : item;
        }
        return item.name === pkg
          ? item?.disabled
            ? { ...item, disabled: false }
            : { ...item, disabled: true }
          : item;
      });

      return { ...prev, [section]: updated };
    });
  };

  return (
    <PkgsContext.Provider
      value={{ data, setData, changeAurHelper, toggleDisablePkg }}
    >
      {children}
    </PkgsContext.Provider>
  );
};

export const usePkgsFile = (): PkgsContextType => {
  const ctx = useContext(PkgsContext);
  if (!ctx) throw new Error("usePkgs must be used within a PkgsProvider");
  return ctx;
};
