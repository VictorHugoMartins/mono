import React from "react";

import ClassJoin from "~/utils/ClassJoin/ClassJoin";

import style from "./htmlParseComponent.module.scss";

interface HtmlParseComponentProps {
  html: string;
  className?: string;
}

const HtmlParseComponent: React.FC<HtmlParseComponentProps> = ({
  className,
  html,
}) => {
  return (
    <p
      className={ClassJoin([style.htmlParseComponent, className])}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></p>
  );
};

export default HtmlParseComponent;
