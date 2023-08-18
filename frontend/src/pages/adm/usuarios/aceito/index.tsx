import { GetServerSideProps } from "next";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Typography from "~/components/ui/Typography/Typography";
import comumroute from "~/routes/public.route";

interface DetailsProps {
  password?: string;
  email?: string;
}

const AcceptPage: React.FC<DetailsProps> = ({ email, password }) => {
  return (
    <PrivatePageStructure title={`Solicitação aceita!`}>
      <Typography component="h1" align="center">Só mais uma coisa!</Typography>
      <Typography component="h2" align="center">
        Envie a senha <strong>{password}</strong> para o email {email} para que o usuário consiga logar-se ao sistema! Lembre-o de alterar a senha gerada assim que possível!
      </Typography>
    </PrivatePageStructure>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { password, email } = ctx.query;

  return {
    props: {
      password,
      email
    }
  };
};

export default comumroute(AcceptPage);