import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import InternetConnectionProvider from "./providers/InternetConnectionProvider";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <Router>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
      </InternetConnectionProvider>{" "}
    </Provider>
  </QueryClientProvider>
);
