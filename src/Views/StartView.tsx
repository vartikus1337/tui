import SelectInput from "ink-select-input";
import { usePkgsFile, useView } from "@/Contexts";
import type { View } from "@/Data/Views";

export const StartView = () => {
  const { changeView } = useView();
  const { data } = usePkgsFile();

  const namesViewToItems = () =>
    Object.keys(data).map((name) => Object({ label: name, value: name })) as {
      label: string;
      value: View;
    }[];

  return (
    <SelectInput
      items={namesViewToItems()}
      onSelect={(v) => changeView(v.value)}
    />
  );
};
