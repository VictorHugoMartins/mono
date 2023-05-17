import React, { useRef } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Button from "~/components/ui/Button/Button";

export interface AvatarEditorProps {
  border?: number;
  image?: File | string;
  height?: number;
  width?: number;
  scale?: number;
  handleImage: (image: string) => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  border,
  image,
  height,
  width,
  scale,
  handleImage,
}) => {
  const editor = useRef<ReactAvatarEditor>(null);

  return (
    <>
      <ReactAvatarEditor
        ref={editor}
        image={image}
        width={width}
        height={height}
        border={border}
        scale={scale}
        style={{ width: "100%", height: "auto" }}
      />
      <Button
        color="primary"
        onClick={() => {
          if (editor) {
            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = editor.current.getImageScaledToCanvas();

            handleImage(canvasScaled.toDataURL());
          }
        }}
      >
        Save
      </Button>
    </>
  );
};

export default AvatarEditor;
