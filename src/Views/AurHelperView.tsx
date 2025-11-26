import SelectInput from "ink-select-input";
import { useState } from "react";
import { UncontrolledTextInput } from "ink-text-input";
import { useView, usePkgsFile } from "@/Contexts";
import { Box, Text } from "ink";

export const AurHelperView = () => {
  const { data, changeAurHelper } = usePkgsFile();
  const { changeView } = useView();

  const [changeHelperView, setChangeHelperView] = useState(false);

  const selectionItems = [
    {
      label: "change on another",
      value: () => setChangeHelperView(true),
    },
    {
      label: "not install",
      value: () => changeAurHelper(""),
    },
    {
      label: "back",
      value: () => changeView("start"),
    },
  ];

  const textIfExistAur = () => (
    <Text>
      Selected AUR helper: <Text color={"green"}> {data.aurHelper} </Text>
    </Text>
  );

  return (
    <>
      <Box
        width={"100%"}
        padding={1}
        display="flex"
        justifyContent="center"
        borderStyle={"round"}
        borderColor={"yellowBright"}
      >
        {data.aurHelper ? (
          textIfExistAur()
        ) : (
          <Text color={"magentaBright"}>No AUR helper</Text>
        )}
      </Box>
      {!changeHelperView ? (
        <SelectInput
          items={selectionItems.map((v, i) => ({ ...v, key: i.toString() }))}
          onSelect={(item) => item.value()}
        />
      ) : (
        <UncontrolledTextInput
          placeholder="press `e` and enter to exit"
          onSubmit={(value) => {
            if (value !== "e") changeAurHelper(value);
            setChangeHelperView(false);
          }}
        />
      )}
    </>
  );
};
