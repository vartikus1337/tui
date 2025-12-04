import { usePkgsFile, useView } from "@/Contexts";
import { ListInput, ListInputItem } from "@/Components/ListInput";
import { Box, Text } from "ink";

export const SoundView = () => {
  const { changeView } = useView();
  const { data, toggleDisablePkg } = usePkgsFile();

  return (
    <Box
      display="flex"
      width={"100%"}
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Text color={"grey"}>
        press Tab to disable the package installation, ESC to back
      </Text>
      <ListInput onExit={() => changeView("start")}>
        {data.SoundPkgs.map((pkg) => (
          <ListInputItem
            key={typeof pkg === "string" ? pkg : pkg.name}
            onTabKey={() =>
              toggleDisablePkg(
                "SoundPkgs",
                typeof pkg === "string" ? pkg : pkg.name,
              )
            }
            disabled={typeof pkg === "string" ? false : pkg.disabled}
          >
            {typeof pkg === "string" ? pkg : pkg.name}
          </ListInputItem>
        ))}
      </ListInput>
    </Box>
  );
};
