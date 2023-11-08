import PlaceOrderPage from "./pages/place-order";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import ViewportGaurd from "./components/misc/viewport-gaurd";

export const qc = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={qc}>
      <ViewportGaurd>
        <PlaceOrderPage />
      </ViewportGaurd>
    </QueryClientProvider>
  );
};

export default App;
