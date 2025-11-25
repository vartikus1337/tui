import SelectInput from "ink-select-input";
import { useView, type View } from "../Entities/View";
import { usePkgsFile } from "@/Hooks/usePkgsFile";

export const StartView = () => {
  const { changeView } = useView();
  usePkgsFile();

  // TODO: Del
  const items: { label: string; value: View }[] = [
    {
      label: "Предустановка",
      value: "Pre",
    },
    {
      label: "Niri",
      value: "Niri",
    },
    {
      label: "Audio utils",
      value: "Audio",
    },
    {
      label: "Utils apps",
      value: "Utils",
    },
  ];

  return (
    <SelectInput items={items} onSelect={(item) => changeView(item.value)} />
  );
};
