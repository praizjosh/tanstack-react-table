import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AbsenceOverview from "./components/core/AbsenceOverview";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AbsenceOverview />
      </QueryClientProvider>
    </>
  );
}

export default App;
