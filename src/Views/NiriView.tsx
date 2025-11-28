import { usePkgsFile, useView } from "@/Contexts";
import { List, ListItem } from "@/Components/List";

export const NiriView = () => {
  const { changeView } = useView();
  const { data } = usePkgsFile();

  return (
    <List onExit={() => changeView("start")}>
      {data.NiriPkgs.map((pkg) => (
        <ListItem key={pkg.toString()}>{pkg.toString()}</ListItem>
      ))}
    </List>
  );
};
