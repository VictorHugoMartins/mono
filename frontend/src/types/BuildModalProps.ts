export default interface BuildModalProps {
  rowData?: any;
  closeModal?: () => void;
  handleClose?: () => void;
  open?: boolean;
  token?: string;
  getList?: () => Promise<void>;
}