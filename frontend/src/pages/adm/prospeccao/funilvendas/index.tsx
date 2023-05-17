import React from "react";
import { GetServerSideProps } from "next";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import SalesFunnelPageStructure from "~/components/structure/SalesFunnelPageStructure";
import privateroute from "~/routes/private.route";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { useUserContext } from "~/context/global/UserContext";

interface Props {
  startdate: string;
  enddate: string;
}

const SalesFunnel: React.FC<Props> = ({ startdate, enddate }) => {
  const { user } = useUserContext();

  return (
    <PrivatePageStructure title="Funil de Vendas">
      {!user ? (
        <PopupLoading show={true} />
      ) : (
        <SalesFunnelPageStructure endDate={enddate} startDate={startdate} />
      )}
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const months = 1;
  // let startdate = new Date(Date.now() - 24 * 30 * months * 3600 * 1000);
  const ano = new Date().getFullYear();
  let startdate = new Date(ano, 0, 1);
  let enddate = new Date();

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
    },
  };
};

export default privateroute(SalesFunnel);
