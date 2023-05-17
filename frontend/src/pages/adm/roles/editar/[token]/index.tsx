import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ROLES } from "~/config/apiRoutes/roles";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface ReportsEditProps {
    token: string;
  }
  
  const RolesEdit: React.FC<ReportsEditProps> = ({ token }) => {
    return (
      <PrivatePageStructure
        title="Editar Roles"
        returnPath="/adm/roles/lista"
      >
        <FormPageStructure
          buildPath={API_ROLES.BUILD()}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          returnPath="/adm/roles/lista"
          submitPath={API_ROLES.SAVE()}
          preparePath={API_ROLES.PREPARE(token)}
          onSuccess={FormSuccess}
        />
      </PrivatePageStructure>
    );
  };
  
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.query;
  
    return { props: { token } };
  };
  
  export default privateroute(RolesEdit);