import React from "react";
import PropTypes from "prop-types";

import Footer from "../Footer/index";
import Navbar from "../Navbar/index";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
