import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './app.css';
import { AuthProvider } from "./modules/auth/lib/auth.provider";
import { Main } from "./main";

const queryClient = new QueryClient();

export const App = () => {
  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </QueryClientProvider>
};

export default App;