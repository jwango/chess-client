import { useOutlet } from "react-router";

import AuthGuard from "../auth/components/auth-guard.component";

interface Props {
  name: string;
}

export const HomePage = ({ name }: Props) => {
  const outlet = useOutlet();
  
  return <AuthGuard>
    <div className="gutters">
      Welcome home, {name}
    </div>
  </AuthGuard>
};

export default HomePage;