import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const Panel = ({ children }: PropsWithChildren) => {
  return <aside className="absolute top-0 right-0 min-w-full min-h-screen h-full bg-slate-100 border-solid border-l md:min-w-[500px] flex">
    <Link to="." className="inline-block text-inherit">
      <button className="h-full min-w-0 bg-slate-200 text-black hover:bg-slate-300 text-2xl px-4 md:px-2" tabIndex={-1}>
        &rsaquo;
      </button>
    </Link>
    <div className="inline-block p-4">{children}</div>
  </aside>
};