import { usePkgsFile, useView } from "@/Contexts";
import { ListInput, ListInputItem } from "@/Components/ListInput";

export const NiriView = () => {
  const { changeView } = useView();
  const { data, toggleDisablePkg } = usePkgsFile();

  return (
    <ListInput onExit={() => changeView("start")}>
      {data.NiriPkgs.map((pkg) => (
        <ListInputItem
          key={typeof pkg === "string" ? pkg : pkg.name}
          onTabKey={() =>
            toggleDisablePkg(
              "NiriPkgs",
              typeof pkg === "string" ? pkg : pkg.name,
            )
          }
          disabled={typeof pkg === "string" ? false : pkg.disabled}
        >
          {typeof pkg === "string" ? pkg : pkg.name}
        </ListInputItem>
      ))}
    </ListInput>
  );
};
