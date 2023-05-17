import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_SWITCHCONFIGURATIONS } from "~/config/apiRoutes/switchConfigurations";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface ReportsEditProps {
    token: string;
  }
  
  const SwitchConfigsEdit: React.FC<ReportsEditProps> = ({ token }) => {
    return (
      <PrivatePageStructure
        title="Editar Configuração Booleana"
        returnPath="/adm/sistemaconfiguracoes/lista"
      >
        <FormPageStructure
          buildPath={API_SWITCHCONFIGURATIONS.BUILD()}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          returnPath="/adm/sistemaconfiguracoes/lista"
          submitPath={API_SWITCHCONFIGURATIONS.SAVE()}
          preparePath={API_SWITCHCONFIGURATIONS.PREPARE(token)}
          onSuccess={FormSuccess}
        />
      </PrivatePageStructure>
    );
  };
  
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.query;
  
    return { props: { token } };
  };
  
  export default privateroute(SwitchConfigsEdit);