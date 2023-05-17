import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Button from "~/components/ui/Button/Button";
import { Modal } from "~/components/ui/Modal/Modal";
import { blobTobase64 } from "~/utils/BlobToBase64";
import { getCroppedImg } from "./CanvasUtils";

import styles from "./cropImageInput.module.scss";

interface CropImageInputProps {
  aspect?: number;
  cropShape?: "rect" | "round";
  handleImage: (crop: string) => void;
  image: File;
  width?: number;
  height?: number;
}

const CropImageInput: React.FC<CropImageInputProps> = ({
  aspect,
  cropShape,
  image,
  handleImage,
  width,
  height,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [inputImg, setInputImg] = useState(null);
  const [blob, setBlob] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(
      inputImg,
      croppedAreaPixels,
      width ? width : 500,
      height ? height : 500
    );
    setBlob(croppedImage);
  };

  useEffect(() => {
    if (image) onInputChange();
    else handleClose();
  }, [image]);

  const onInputChange = () => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setInputImg(reader.result);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
      setOpen(true);
    }
  };

  const handleSubmitImage = () => {
    blobTobase64(blob, (e) => handleImage(e));
    handleClose();
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <Modal hideOpenButton openExternal={open}>
      <div className={styles.cropImageInput}>
        <div className={styles.cropper}>
          <Cropper
            image={inputImg}
            crop={crop}
            zoom={zoom}
            aspect={aspect || 1}
            restrictPosition={true}
            cropShape={cropShape || "rect"}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Button
          color="primary"
          onClick={() => {
            handleSubmitImage();
          }}
        >
          Salvar
        </Button>
      </div>
    </Modal>
  );
};

export default CropImageInput;
