import { FileObjectType } from "~/types/global/FileObjectType";

export interface FileInputProps {
  accept?: string;
  className?: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  id?: string;
  key?: React.Key;
  name?: string;
  onChange?: (file: FileObjectType) => void;
  title?: string;
  value?: FileObjectType;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  crop?: boolean;
  cropWidth?: number;
  cropHeight?: number;
  inputWidth?: number;
  inputHeight?: number;
  type: "audio" | "image" | "multifile" | "file" | "video";
}

export interface AllInputProps {
  inputWidth?: number;
  inputHeight?: number;
  value?: FileObjectType;
  onChange?: (file: FileObjectType) => void;
}

export interface ImageInputProps {
  crop?: boolean;
  cropheight?: number;
  cropwidth?: number;
  inputWidth?: number;
  inputHeight?: number;
  value?: FileObjectType;
  onChange?: (file: FileObjectType) => void;
}
