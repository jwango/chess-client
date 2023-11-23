import { useOutlet } from "react-router";

import { Panel } from "@shared";

interface Props {
  name: string;
}

export const HomePage = ({ name }: Props) => {
  const outlet = useOutlet();
  
  return <div className="gutters">
    Welcome home, {name}
    {outlet && <Panel>{outlet}</Panel>}
  </div>
};

export default HomePage;