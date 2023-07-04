import { GetServerSideProps } from "next";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Typography from "~/components/ui/Typography/Typography";
import comumroute from "~/routes/public.route";

interface DetailsProps {
  name?: string;
  email?: string;
}

const AlmostThere: React.FC<DetailsProps> = ({ name, email }) => {
  return (
    <PrivatePageStructure title={`Quase lá, ${name}!`}>
      <Typography component="h1" align="center">Tudo certo com o seu cadastro!</Typography>
      <Typography component="h2" align="center">
        Em breve, você receberá sua senha de acesso no e-mail {email} para começar a usar o sistema!
      </Typography>
    </PrivatePageStructure>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name, email } = ctx.query;

  return {
    props: {
      name,
      email
    }
  };
};

export default comumroute(AlmostThere);