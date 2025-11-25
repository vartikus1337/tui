import { useState } from "react";

import pkgs from "@/Data/Pkgs.json";

type PackageItem =
  | string
  | { name: string; description?: string; aur?: boolean; disabled?: boolean };

interface PackagesFile {
  aurHelper: string;
  PreInstallPkgs: PackageItem[];
  NiriPkgs: PackageItem[];
  SoundPkgs: PackageItem[];
  UtilsPkgs: PackageItem[];
}

export const usePkgsFile = () => {
  const [data, setData] = useState<PackagesFile>(pkgs);

  const show = () => {
    console.log(data);
  };

  // TODO: TEST THIS
  const addPackage = (section: keyof PackagesFile, pkg: PackageItem) => {
    setData((prev) => {
      const updatedSection = [...(prev[section] as PackageItem[]), pkg];
      return { ...prev, [section]: updatedSection };
    });
  };
  // TODO: CHECK THIS
  // const removePackage = (section: keyof PackagesFile, pkgName: string) => {
  //   setData((prev) => {
  //     const updatedSection = (prev[section] as PackageItem[]).filter((item) => {
  //       if (typeof item === "string") return item !== pkgName;
  //       else return item.name !== pkgName;
  //     });
  //     return { ...prev, [section]: updatedSection };
  //   });
  // };

  const updateAurHelper = (newHelper: string) => {
    setData((prev) => ({ ...prev, aurHelper: newHelper }));
  };

  return {
    data,
    setData,
    addPackage,
    show,
    // removePackage,
    updateAurHelper,
  };
};
