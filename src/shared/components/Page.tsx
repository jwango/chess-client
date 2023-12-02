import { PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren<{}>) => {
  return <section className="flex flex-col items-center sm:block sm:flex-none">
    <div className="gutters">
      {children}
    </div>
  </section>
};
