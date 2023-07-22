import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../structure/FormPageStructure"
import { InputRenderType } from "~/types/global/InputRenderType";
import { SetStateAction } from "react";
import { ObjectResponse } from "~/types/global/ObjectResponse";
import { BASE_API_URL } from "~/config/apiBase";

interface DetailsFiltersProps {
  data: any;
  setResultData: (value: SetStateAction<ObjectResponse>) => void;
  filterFunction: Function;
  survey: string;
}

const DetailsFilters: React.FC<DetailsFiltersProps> = ({ data, survey, setResultData, filterFunction }) => {
  console.log("a survey: ", survey)
  if (!data) return <></>;
  return (
    <>
      {data?.result_columns &&
        <FormPageStructure
          buildObject={data.result_columns as InputRenderType[]}
          buildPath={'/super_survey/build'}
          submitPath={`${BASE_API_URL}/details/getbyid`}
          buttonSubmitText="Filtrar"
          buttonCancelText="Limpar filtros"
          returnPath="/"
          hiddenInputs={{ ss_id: survey }}
          setObjectReturn={setResultData}
          onSuccess={(e) => {
            Toast.success(
              "Filtros aplicados com sucesso!"
            );
          }}
          onCancel={() => filterFunction()}
          preparePath={`${BASE_API_URL}/details/preparefilter?ss_id=${survey}`}
        />
      }
    </>
  )
}

export default DetailsFilters;