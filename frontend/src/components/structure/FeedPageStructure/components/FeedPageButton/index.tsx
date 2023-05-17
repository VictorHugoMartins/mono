import React from "react";

import Button from "~/components/ui/Button/Button";
import Icon from "~/components/ui/Icon/Icon";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import RedirectTo from "~/utils/Redirect/Redirect";

interface FeedPageButtonProps {
  href?: string;
  title: string;
  icon: IconTypes;
  onClick?: () => void;
}

const FeedPageButton: React.FC<FeedPageButtonProps> = ({
  href,
  title,
  icon,
  onClick,
}) => {
  function _onClick() {
    if (href) RedirectTo(href);
    else if (onClick) onClick();
  }

  return (
    <div>
      <Button
        color="primary"
        onClick={_onClick}
        radius="50%"
        noPadding
        title={title}
      >
        <div style={{ padding: 8 }}>
          <Icon type={icon} size={15} />
        </div>
      </Button>
    </div>
  );
};

export default FeedPageButton;
