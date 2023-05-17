import { FormErrorsType } from "~/types/global/FormErrorsType";

export function BuildFormErrorMessage(errors: FormErrorsType): JSX.Element {
  return (
    <>
      {Object.keys(errors).map((key) => (
        <>
          {errors[key].map((error) => (
            <>
              {error} <br />
            </>
          ))}
        </>
      ))}
    </>
  );
}
