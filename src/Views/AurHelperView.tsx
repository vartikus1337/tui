import { useState } from "react";
import { UncontrolledTextInput } from "ink-text-input";
import { useView, usePkgsFile } from "@/Contexts";
import { Box, Text } from "ink";
import { ListInput, ListInputItem } from "@/Components/ListInput";

export const AurHelperView = () => {
  const { data, changeAurHelper } = usePkgsFile();
  const { changeView } = useView();

  const [changeHelperView, setChangeHelperView] = useState(false);

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
        <ListInput onExit={() => changeView("start")}>
          <ListInputItem onEnter={() => setChangeHelperView(true)}>
            change on another
          </ListInputItem>
          <ListInputItem onEnter={() => changeAurHelper("")}>
            not install
          </ListInputItem>
        </ListInput>
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
