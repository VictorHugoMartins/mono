import React from "react";

import Flexbox from "../Layout/Flexbox/Flexbox";
import TabButtonStyle1 from "./components/TabButtonStyle1";
import TabButtonStyle2 from "./components/TabButtonStyle2";

import useTheme from "~/hooks/useTheme";

import style from "./tabs.module.scss";
import {
  SelectObjectType,
  SelectOptionsType,
} from "~/types/global/SelectObjectType";
import TabButtonStyle3 from "./components/TabButtonStyle3";

interface TabInterface {
  active: number;
  headerType?: boolean;
  horizontalScroll?: boolean;
  wrap?: boolean;
  setActive: (index: number, value?: SelectObjectType) => void;
  styleType?: "1" | "2" | "3";
  tabsData: SelectOptionsType;
}

const Tabs: React.FC<TabInterface> = ({
  tabsData,
  active,
  headerType,
  setActive,
  horizontalScroll,
  wrap,
  styleType = "1",
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${style.tabs} ${style[`theme${theme}`]} ${style[`styleType${styleType}`]
        } ${headerType ? style.headerType : ""}`}
    >
      <Flexbox
        scroll={horizontalScroll ? "horizontal" : null}
        wrap={wrap || false}
        align="flex-end"
      >
        {tabsData && (
          <>
            {tabsData?.map((tab, index) => {
              return (
                <TabButton
                  key={index.toString()}
                  onClick={() => {
                    setActive(index, tab);
                  }}
                  active={index === active}
                  tabName={tab.label}
                  styleType={styleType}
                />
              );
            })}
          </>
        )}
      </Flexbox>
    </div>
  );
};

export interface TabButtonProps {
  active?: boolean;
  tabName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  styleType?: "1" | "2" | "3";
}

export const TabButton: React.FC<TabButtonProps> = ({ styleType, ...rest }) => {
  if (styleType === "1") return <TabButtonStyle1 {...rest} />;
  if (styleType === "2") return <TabButtonStyle2 {...rest} />;
  if (styleType === "3") return <TabButtonStyle3 {...rest} />;
};

export default Tabs;
