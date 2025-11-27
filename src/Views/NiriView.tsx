import SelectInput from "ink-select-input";
import { usePkgsFile, useView } from "@/Contexts";
import { Box, Text } from "ink";

// biome-ignore lint/correctness/noUnusedFunctionParameters: It is only needed to support the type
const IndicPlug = ({ isSelected }: { isSelected?: boolean }) => {
  return <Text></Text>;
};

const ItemSlug = ({
  isSelected,
  label,
}: {
  isSelected?: boolean;
  label: string;
}) => {
  return (
    <Box display="flex" gap={1}>
      <Text color={isSelected ? "blue" : undefined}>
        {label} {isSelected && "(focused)"}
      </Text>
    </Box>
  );
};

export const NiriView = () => {
  const { changeView } = useView();
  const { data } = usePkgsFile();

  //   const namesPkgsToItems = (nameSection: View) => {
  //     return data[nameSection]
  //   }

  console.log(data.NiriPkgs);

  return (
    <SelectInput
      indicatorComponent={IndicPlug}
      // items={data.NiriPkgs.map((name) => Object({ label: name, value: name }))}
      // itemComponent={ItemSlug}
    />
  );
};
