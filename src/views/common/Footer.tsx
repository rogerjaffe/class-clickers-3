import React, { Component } from "react";
import p from "../../../package.json";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span>{`Clickers V${p.version}`}</span>
      <br />
      <span>Copyright &copy; Roger Jaffe 2023</span>
      <br />
      <span>
        <a href="link-to-google-form">How do you like Class Clickers!</a>
      </span>
    </div>
  );
};

export default Footer;
