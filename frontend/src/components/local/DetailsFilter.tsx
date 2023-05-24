// import Image from 'next/image'

import Toast from "~/utils/Toast/Toast";
import FormPageStructure from "../structure/FormPageStructure"
import { InputRenderType } from "~/types/global/InputRenderType";
import { SetStateAction } from "react";
import { ObjectResponse } from "~/types/global/ObjectResponse";

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
          buildPath={'/super_survey/build'}
          submitPath={'http://localhost:5000/details/getbyid'}
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
        />
      }
    </>
  )
}


function text() {
  return (
    <>
      {/* //     * cidade
// * plataforma (airbnb, booking, ambas)
// * método de clusterização e parâmetros relacionados (k-means -> qtd clusters)
// * regiões (centro, entorno, distrito?? faz sentido manter isso?)

// * opção de select? (a versão mais recente de cada acomodação, a média de todos os coletados, maior ou menor valor)
// * campos para values.counts, avgs e etc

// * exportar (talvez até importar??) dados

// * login: cada usuário faz a chamada e recebe o resultado quando deve
// * tratamento de exceção
// * período de coleta
// * breakpoints para status da super survey

// metas pra semana
// * cadastro/recuperar senha/login
// * 


// * o que eu tenho que fazer é: selecionar todos os ss_ids do user X. Para cada uma dessas super_surveys, selecionar todos os quartos cujos survey_ids fazem parte da super pesquisa.
// 	* seria interessante "exportar todos", incluindo repetidos, e também nesse caso o mais recente e etc vale pra todos de todos n apenas dentro daquele escopo de survey_id
// * seria interessante escolher quais colunas quer exportar?

// incluir regiões no banco
// salvar também as colunas que o usuário selecionou?
// ambas as coisas estariam relacionadas a ss_id

// opção para exportar os dados do gráfico gerado?
// opção para exportar os dados filtrados?
// opção para clicar e executar values.counts()? já deixar por padrão o describe?

// sobre a interface, inserir informaações sobre cada metodo de clusterização, link para pegar coordenadas das regiões

// status 0: pesquisa ainda não fez nada, nem criou kk
// status 1: pesquisa não iniciada
// status 2: pesquisa por cidade em progresso
// status 3: pesquisa por cidade concluida
// status 4: pesquisa por bairros em progresso
// status 4: pesquisa por bairros concluída
// status 4: pesquisa por ruas em progresso
// status 3: pesquisa concluída com sucesso
// status 5: concluiu pesquisa do airbnb, falta booking
// status 6: erro ao pesquisar booking
// status 7: erro ao exportar
// status 8: sucesso ao exportar (tudo concluído) */}
    </>
  )
}

export default DetailsFilters;