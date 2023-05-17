import React from "react";

import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Flexbox from "../Layout/Flexbox/Flexbox";
import Typography from "../Typography/Typography";

import RedirectTo from "~/utils/Redirect/Redirect";

import { PageHeadProps } from "./pageHead.interface";

const PageHead: React.FC<PageHeadProps> = ({ returnUrl, title }) => {
  function _returnPage() {
    RedirectTo(returnUrl);
  }

  return (
    <Flexbox align="center" margin={{ bottom: "m" }}>
      {returnUrl && (
        <Flexbox margin={{ right: "m" }}>
          <Button noPadding onClick={_returnPage}>
            <Icon size={24} type="FaChevronLeft" />
          </Button>
        </Flexbox>
      )}
      {title && <Typography component="h3">{title}</Typography>}
    </Flexbox>
  );
};

export default PageHead;
