import React, { CSSProperties, useState } from "react";

import style from "./textInput.module.scss";
import { TextInputProps, TextInputType } from "./textInput.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, error, value, ...rest }, ref) => {
    const [inputType, setinputType] = useState<TextInputType>(type);
    return (
      <>
        <div
          style={{
            position: "relative",
            display: type === "hidden" ? "none" : "",
          }}
        >
          <input
            className={ClassJoin([style.textInput, error && style.error])}
            type={inputType || "text"}
            ref={ref}
            value={value}
            {...rest}
            style={{ minHeight: 54 }}
          />
          {type === "password" && (
            <button
              onClick={() => {
                inputType === "password"
                  ? setinputType("text")
                  : setinputType("password");
              }}
              style={buttonStyle}
              type="button"
            >
              <abbr
                title={inputType === "text" ? "Ocultar Senha" : "Mostrar Senha"}
              >
                {inputType === "password" ? (
                  <FaEye size={25} />
                ) : (
                  <FaEyeSlash size={25} />
                )}
              </abbr>
            </button>
          )}
          {type === "search" && (
            <>
              {
                Array.isArray(value) && value.length === 0 || `${value}`.length === 0 && (
                  <button style={buttonStyle} type="button">
                    <abbr title={"Pesquisar"}>
                      <FaSearch size={25} />
                    </abbr>
                  </button>
                )
              }
            </>
          )}
        </div>
      </>
    );
  }
);

const buttonStyle = {
  position: "absolute",
  top: 16,
  right: 5,
} as CSSProperties;

export default React.memo(TextInput);
