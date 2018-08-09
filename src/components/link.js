import React from "react";
import GatsbyLink from "gatsby-link";

const Link = ({ children, ...props }) => {
  if (props.to.startsWith("http")) {
    return (
      <a href={props.to} {...props}>
        {children}
      </a>
    );
  }

  return <GatsbyLink {...props}>{children}</GatsbyLink>;
};

export default Link;
