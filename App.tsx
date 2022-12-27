import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import AppNavigator from "./Navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
