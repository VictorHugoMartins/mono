import { FormEventType } from "~/types/global/FormEventType";
import RedirectTo from "../Redirect/Redirect";
import Toast from "../Toast/Toast";

export function FormSuccess(
  event?: FormEventType,
  handleClose?: () => void,
  returnUrl?: string,
  successMessage?: string,
  callback?: (event?: FormEventType) => void,
  refreshList?: () => Promise<void>,
) {
  Toast.success(successMessage || "Salvo com sucesso!");
  if ( refreshList ) refreshList();
  if ( handleClose ) handleClose();
  if (returnUrl) RedirectTo(returnUrl);
  if (callback) callback(event);
}