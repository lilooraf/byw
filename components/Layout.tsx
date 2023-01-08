import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="text-gray-900 bg-white dark:text-white dark:bg-black">
    <Header />
    <div className="layout mx-4">{props.children}</div>
  </div>
);

export default Layout;
