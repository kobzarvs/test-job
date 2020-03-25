import React from "react";
import { Link } from "react-router-dom";

const menu = [
  { to: "/test-job1", label: "Test job 1" },
  { to: "/test-job2", label: "Test job 2" },
  { to: "/test-job3", label: "Test job 3" }
];

export const Layout = ({ children, ...props }) => {
  const { path } = props.match;
  return (
    <div>
      <ul className="main-menu">
        {menu.map(item => (
          <li key={item.to} className={path === item.to ? "active" : ""}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="content">{children}</div>
    </div>
  );
};
