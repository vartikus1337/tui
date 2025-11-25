import { VoidNote } from "@/ASCII/VoidNote";
import { StartView } from "./Views/StartView";
import { useView, ViewProvider } from "./Entities/View";
import { PreInstallView } from "./Views/PreInstallView";
import { Box } from "ink";

export const App = () => {
  return (
    // <>
    <ViewProvider>
      <AppContent />
    </ViewProvider>
    // </>
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
        {view === "Pre" ? <PreInstallView /> : <StartView />}
      </Box>
    </Box>
  );
};
