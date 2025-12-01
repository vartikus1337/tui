import { usePkgsFile, useView } from "@/Contexts";
import type { View } from "@/Data/Views";
import { ListInput, ListInputItem } from "@/Components/ListInput";

export const StartView = () => {
  const { changeView } = useView();
  const { data } = usePkgsFile();

  return (
    <ListInput>
      {Object.keys(data).map((section) => (
        <ListInputItem
          key={section}
          onEnter={() => changeView(section as View)}
        >
          {section}
        </ListInputItem>
      ))}
    </ListInput>
  );
};
