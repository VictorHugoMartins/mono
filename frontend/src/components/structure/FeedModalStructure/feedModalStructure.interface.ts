import { GenericObjectType } from "~/types/global/GenericObjectType";

export interface FeedModalStructureProps {
  openButton?: React.ReactNode;
  openExternal?: boolean;
  refreshList?: () => void;
  title: string;
  token?: string;

  getFeedPath: string;
  form: FeedModalFormType;
}

type FeedModalFormType = {
  buildPath: string;
  submitPath: string;
  hiddenInputs?: GenericObjectType;
  title?: string;
};

export interface ContentModalProps {
  closeModal?: () => void;
  handleClose?: () => void;
  token?: string;
  getPath: string;
  buildPath: string;
  submitPath: string;
  hiddenInputs?: GenericObjectType;
  title?: string;
}
