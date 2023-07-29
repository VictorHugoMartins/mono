import React from "react";

import style from "./label.module.scss";
import { LabelProps } from "./label.interface";
import { Modal } from "../../Modal/Modal";
import Icon from "../../Icon/Icon";

const Label: React.FC<LabelProps> = ({ text, labelFor, required, description }) => {
  return (
    <label className={`${style.label} ${style[`theme${'light'}`]}`} htmlFor={labelFor}
      style={description ? { display: "inline-flex", alignItems: "center", width: "100%" } : {}}
    >
      {text}
      {required && <b> *</b>}
      {description && <span style={{ marginLeft: 8, cursor: "pointer" }}>
        <Modal
          title={`Sobre o campo "${text.replace(':', '')}" (${labelFor}):`}
          openButton={
            <Icon type="FaInfoCircle" size={15} style={{ color: "#296B9A" }} />
          }
        >
          {description}
        </Modal>
      </span>}
    </label>
  );
};

export default Label;
