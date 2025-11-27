import { Box, Text } from "ink";
import type { FC, ReactElement, ReactNode } from "react";

export interface List {
  children: ReactElement<typeof ListItem> | ReactElement<typeof ListItem>[];
  onExit?: () => void;
}

export const List: FC<List> = ({ children, onExit }) => {
  return (
    <Box>
      {children}
      {onExit && <ListItem onEnter={() => onExit?.()}>Back</ListItem>}
    </Box>
  );
};

export const ListItem: FC<{
  /** Label */
  children: ReactNode;
  onTabKey?: () => void;
  onEnter?: () => void;
  onSelected?: boolean;
}> = ({ children, onTabKey, onEnter, onSelected }) => {
  return (
    <Box>
      <Text>{children}</Text>
    </Box>
  );
};
