import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_HOLLIDAY } from "~/config/apiRoutes/holliday";
import { FormSuccess } from "~/utils/FormSuccess";

interface HollidayEditProps {
  token: string;
}

const HollidayEdit: React.FC<HollidayEditProps> = ({ token }) => {
  return (
    <>
      <PrivatePageStructure
        title="Editar Feriado"
        returnPath="/adm/feriados/lista"
      >
        <FormPageStructure
          preparePath={API_HOLLIDAY.PREPARE(token)}
          buildPath={API_HOLLIDAY.BUILD()}
          submitPath={API_HOLLIDAY.SAVE()}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          returnPath="/adm/feriados/lista"
          onSuccess={FormSuccess}
        />
      </PrivatePageStructure>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default HollidayEdit;
