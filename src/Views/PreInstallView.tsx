import SelectInput from "ink-select-input";
import { useView, type View } from "../Entities/View";
import { useState } from "react";
import { UncontrolledTextInput } from "ink-text-input";

export const PreInstallView = () => {
  const { changeView } = useView();

  const [anotherAur, setAnotherAur] = useState<string | null>(null);

  type Item = { label: string; value: View | number };

  const onSelect = (item: Item) => {
    if (!Number.isInteger(item.value)) {
      changeView(item.value as View);
      return;
    }
    if (item.value === 1) {
      setAnotherAur("");
    }
  };

  const items: Item[] = [
    {
      label: !anotherAur
        ? "Установить PARU - a aur helper written on rust"
        : `Установить ${anotherAur}`,
      value: 0,
    },
    {
      label: "Выбрать другой (test implementation)",
      value: 1,
    },
    {
      label: "Вернуться обратно",
      value: "Start",
    },
  ];

  return (
    <>
      <SelectInput items={items} onSelect={(item) => onSelect(item)} />
      {anotherAur === "" && (
        <UncontrolledTextInput
          placeholder="press `e` and enter to exit"
          onSubmit={(value) =>
            value === "e" ? setAnotherAur(null) : setAnotherAur(value)
          }
        />
      )}
    </>
  );
};
