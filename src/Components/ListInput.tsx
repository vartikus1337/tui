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

export interface ListInput {
  children: ReactNode;
  onExit?: () => void;
}

interface ListInputContext {
  activeIndex: number;
  isTabKey: boolean;
  isEnterKey: boolean;
  clearLastKey: () => void;
}

const ListInputContext = createContext<ListInputContext | undefined>(undefined);

export const ListInput: FC<ListInput> = ({ children, onExit }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastKey, setLastKey] = useState<"none" | "tab" | "enter">("none");

  const childArray = Children.toArray(children);
  const childCount = childArray.length;
  const lastIndex = childCount;

  const renderedChildren = childArray.map((child, i) =>
    isValidElement(child)
      ? cloneElement(
          child as ReactElement<ComponentProps<typeof ListInputItem>>,
          {
            index: i,
          },
        )
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

    if (key.escape) {
      onExit?.();
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

  const clearLastKey = () => setLastKey("none");

  return (
    <ListInputContext.Provider
      value={{ activeIndex, isTabKey, isEnterKey, clearLastKey }}
    >
      <Box display="flex" flexDirection="column">
        {renderedChildren}
        {onExit && (
          <ListInputItem index={lastIndex} onEnter={() => onExit?.()}>
            Back
          </ListInputItem>
        )}
      </Box>
    </ListInputContext.Provider>
  );
};

export const useListInputContext = (): ListInputContext => {
  const ctx = useContext(ListInputContext);
  if (!ctx) throw new Error("useListContext must be used within a List");
  return ctx;
};

export const ListInputItem: FC<{
  /** Label */
  children: ReactNode;
  index?: number;
  onTabKey?: () => void;
  onEnter?: () => void;
  disabled?: boolean;
}> = ({ children, index, onTabKey, onEnter, disabled }) => {
  const { activeIndex, isTabKey, isEnterKey, clearLastKey } =
    useListInputContext();

  useEffect(() => {
    if (activeIndex !== index) return;
    if (isEnterKey) {
      onEnter?.();
      clearLastKey();
    } else if (isTabKey) {
      onTabKey?.();
      clearLastKey();
    }
  }, [
    activeIndex,
    isEnterKey,
    isTabKey,
    index,
    onEnter,
    onTabKey,
    clearLastKey,
  ]);

  return (
    <Box key={index} display="flex" width={"30%"} gap={1}>
      {/* Indicator */}
      <Text>{activeIndex === index ? figures.pointer : ""}</Text>
      <Box marginLeft={activeIndex !== index ? 1 : 0}>
        <Text
          color={disabled ? "gray" : activeIndex === index ? "blue" : undefined}
        >
          {children}
        </Text>
      </Box>
    </Box>
  );
};
