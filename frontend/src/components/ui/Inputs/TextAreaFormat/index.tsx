import React, { LegacyRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import { TextAreaFormatProps } from "./textAreaFormat.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import style from "./textAreaFormat.module.scss";

//import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const TextAreaFormat = React.forwardRef<Quill, TextAreaFormatProps>(
  ({ value, error, onChange, ...rest }, ref) => {
    const [windowIsLoaded, setWindowIsLoaded] = useState<boolean>(false);

    useEffect(() => {
      if (typeof window) {
        setTimeout(() => {
          setWindowIsLoaded(true);
        }, 500);
      }
    }, [window]);

    return (
      <>
        {windowIsLoaded && typeof window && (
          <>
            {
              <ReactQuill
                className={ClassJoin([
                  style.textAreaFormat,
                  error && style.error,
                ])}
                readOnly={rest.disabled}
                formats={formats}
                onChange={(e) => {
                  onChange(e);
                }}
                modules={modules}
                value={value}
              />
            }
          </>
        )}
      </>
    );
  }
);

export default TextAreaFormat;
