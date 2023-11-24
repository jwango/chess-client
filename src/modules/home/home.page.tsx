import { useOutlet } from "react-router";

import { Panel } from "@shared";
import AuthGuard from "../auth/components/auth-guard.component";

interface Props {
  name: string;
}

export const HomePage = ({ name }: Props) => {
  const outlet = useOutlet();
  
  return <AuthGuard>
    <div className="gutters">
      Welcome home, {name}
      {outlet && <Panel>{outlet}</Panel>}
    </div>
  </AuthGuard>
};

export default HomePage;