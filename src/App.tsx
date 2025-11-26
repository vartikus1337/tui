import { VoidNote } from "@/ASCII/VoidNote";
import { Box } from "ink";
import { PkgsProvider, ViewProvider, useView } from "./Contexts";
import { AurHelperView, StartView } from "./Views";

export const App = () => {
  return (
    <PkgsProvider>
      <ViewProvider>
        <AppContent />
      </ViewProvider>
    </PkgsProvider>
  );
};

const AppContent = () => {
  const { view } = useView();

  return (
    <Box width="100%" display="flex">
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="center"
        alignItems="center"
      >
        <VoidNote />
        {view === "aurHelper" ? <AurHelperView /> : <StartView />}
      </Box>
    </Box>
  );
};
