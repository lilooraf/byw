import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
  loading?: boolean;
};

const Layout: React.FC<Props> = (props) => (
  <div className="text-gray-900 bg-white dark:text-white dark:bg-black">
    <Header loading={props.loading} />
    <div className="layout">{props.children}</div>
  </div>
);

export default Layout;
