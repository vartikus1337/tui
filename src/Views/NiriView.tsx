import { usePkgsFile, useView } from "@/Contexts";
import { ListInput, ListInputItem } from "@/Components/ListInput";
import { Box, Text } from "ink";

export const NiriView = () => {
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
      <Text color={"grey"}>press Tab to disable the package installation.</Text>
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
    </Box>
  );
};
