import React from "react";
import RedirectTo from "~/utils/Redirect/Redirect";

interface LinkProps {
  to: string;
  text?: string;
  title?: string;
}

const Link: React.FC<LinkProps> = ({ to, text, title, children }) => {
  return (
    <a title={title} onClick={() => RedirectTo(to)}>
      {text}
      {children}
    </a>
  );
};

export default Link;
