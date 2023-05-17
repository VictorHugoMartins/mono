import React from "react";

//Import components
import Typography from "~/components/ui/Typography/Typography";
import { TypographyComponentType } from "~/components/ui/Typography/typography.interface";
import useTheme from "~/hooks/useTheme";

import style from "./homeSectionTitle.module.scss";

interface HomeSectionTitleProps {
  component?: TypographyComponentType;
  text: string;
}

const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({
  component = "h3",
  text,
}) => {
  const { theme } = useTheme();

  return (
    <Typography
      className={`${style.homeSectionTitle} ${style[`theme${theme}`]}`}
      component={component}
    >
      {text}
    </Typography>
  );
};

export default HomeSectionTitle;
