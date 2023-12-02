import { useOutlet } from "react-router";

import AuthGuard from "../auth/components/auth-guard.component";
import { Page } from "@shared";

interface Props {
  name: string;
}

export const HomePage = ({ name }: Props) => {
  const outlet = useOutlet();
  
  return <AuthGuard>
    <Page>
      Welcome home, {name}
    </Page>
  </AuthGuard>
};

export default HomePage;