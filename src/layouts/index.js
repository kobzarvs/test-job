import React from "react";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <div>
      <ul className="main-menu">
        <li>
          <Link to="/test-job1">Test job 1</Link>
        </li>
        <li>
          <Link to="/test-job2">Test job 2</Link>
        </li>
        <li>
          <Link to="/test-job3">Test job 3</Link>
        </li>
      </ul>
      <div className="content">{children}</div>
    </div>
  );
};
