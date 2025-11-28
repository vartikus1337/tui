import figures from "figures";
import { Box, Text, useInput } from "ink";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";

export interface List {
  children: ReactNode;
  onExit?: () => void;
}

interface ListContext {
  activeIndex: number;
  isTabKey: boolean;
  isEnterKey: boolean;
}

const ListContext = createContext<ListContext | undefined>(undefined);

export const List: FC<List> = ({ children, onExit }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastKey, setLastKey] = useState<"none" | "tab" | "enter">("none");

  const childArray = Children.toArray(children);
  const childCount = childArray.length;
  const lastIndex = childCount;

  const renderedChildren = childArray.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<ComponentProps<typeof ListItem>>, {
          index: i,
        })
      : child,
  );

  const isTabKey = lastKey === "tab";
  const isEnterKey = lastKey === "enter";

  useInput((_, key) => {
    if (key.upArrow) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      setLastKey("none");
      return;
    }

    if (key.downArrow) {
      const maxIndex = onExit ? lastIndex : lastIndex - 1;
      setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
      setLastKey("none");
      return;
    }

    if (key.tab) {
      setLastKey("tab");
      return;
    }

    if (key.return) {
      setLastKey("enter");
      return;
    }

    setLastKey("none");
  });

  return (
    <ListContext.Provider value={{ activeIndex, isTabKey, isEnterKey }}>
      <Box display="flex" flexDirection="column">
        {renderedChildren}
        {onExit && (
          <ListItem index={lastIndex} onEnter={() => onExit?.()}>
            Back
          </ListItem>
        )}
      </Box>
    </ListContext.Provider>
  );
};

export const useListContext = (): ListContext => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("useListContext must be used within a List");
  return ctx;
};

export const ListItem: FC<{
  /** Label */
  children: ReactNode;
  index?: number;
  onTabKey?: () => void;
  onEnter?: () => void;
  onSelected?: boolean;
}> = ({ children, index, onTabKey, onEnter }) => {
  const { activeIndex, isTabKey, isEnterKey } = useListContext();

  useEffect(() => {
    if (activeIndex !== index) return;
    if (isEnterKey) {
      onEnter?.();
    } else if (isTabKey) {
      onTabKey?.();
    }
  }, [activeIndex, isEnterKey, isTabKey, index, onEnter, onTabKey]);

  return (
    <Box key={index} display="flex" width={"30%"} gap={1}>
      {/* Indicator */}
      <Text>{activeIndex === index ? figures.pointer : ""}</Text>
      <Box marginLeft={activeIndex !== index ? 1 : 0}>
        <Text color={activeIndex === index ? "blue" : undefined}>
          {children}
        </Text>
      </Box>
    </Box>
  );
};
