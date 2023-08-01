import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../../structure/FormPageStructure"
import { InputRenderType } from "~/types/global/InputRenderType";
import { SetStateAction } from "react";
import { ObjectResponse } from "~/types/global/ObjectResponse";
import { API_NAV } from "~/config/apiRoutes/nav";

interface DetailsFiltersProps {
  data: any;
  setResultData: (value: SetStateAction<ObjectResponse>) => void;
  filterFunction: Function;
  survey: string;
}

const DetailsFilters: React.FC<DetailsFiltersProps> = ({ data, survey, setResultData, filterFunction }) => {
  if (!data) return <></>;
  return (
    <>
      {data?.result_columns &&
        <FormPageStructure
          buildObject={data.result_columns as InputRenderType[]}
          buildPath={'na'}
          submitPath={API_NAV.GETBYID()}
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
          preparePath={API_NAV.PREPAREFILTER(survey)}
        />
      }
    </>
  )
}

export default DetailsFilters;