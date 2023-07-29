import React from "react";

import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Typography from "~/components/ui/Typography/Typography";
import { AlignType } from "~/types/global/LayoutTypes";
import { SpacingPatternType } from "~/types/global/SpacingType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

import style from "./card.module.scss";

interface CardProps {
  alignContent?: AlignType;
  backgroundColor?: string;
  buttons?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  heightContent?: string | number;
  padding?: SpacingPatternType;
  widthContent?: string | number;
  removeBoxShadow?: boolean;
  title?: string;
  hideCard?: boolean;
}

const Card: React.FC<CardProps> = ({
  alignContent = "flex-start",
  backgroundColor,
  buttons,
  children,
  className,
  heightContent,
  padding = "g",
  widthContent,
  removeBoxShadow,
  title,
  hideCard
}) => {
  let classList = [
    style.card,
    removeBoxShadow && style.removeBoxShadow,
    padding && style[`${padding}Padding`],
    className,
  ];

  if (!title && !children) return <></>;
  if (hideCard) return <>{children}</>
  return (
    <div
      className={`${ClassJoin(classList)} ${style[`theme${'light'}`]}`}
      style={{ backgroundColor: backgroundColor || "" }}
    >
      <Flexbox flexDirection="column" width={"100%"} height={"100%"} className={style.flexBox}>
        {(title || buttons) && (
          <Flexbox width="100%" align="center" justify="space-between">
            {title && (
              <div className={style.title}>
                <Typography component="h3">{title}</Typography>
              </div>
            )}
            <Flexbox>{buttons}</Flexbox>
          </Flexbox>
        )}
        <Flexbox
          width="100%"
          maxWidth={widthContent}
          height={heightContent}
          flexDirection="column"
          align={alignContent}
        >
          {children}
        </Flexbox>
      </Flexbox>
    </div>
  );
};

export default Card;
