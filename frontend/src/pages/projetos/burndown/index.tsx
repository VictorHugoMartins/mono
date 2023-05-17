import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BurnDownPageStructure from "~/components/structure/BurnDownPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

// import privateroute from "~/routes/private.route";
import { API_BURNDOWN } from "~/config/apiRoutes/burndown";
import privateroute from "~/routes/private.route";
import UpdatePath from "~/utils/UpdatePath";

interface BurnDownProps {
  token: string;
  project?: string;
  sprint?: string;
}

const BurnDown: React.FC<BurnDownProps> = ({ token, project, sprint }) => {
  const pageBase = "/projetos/burndown";
  const router = useRouter();
  const [_url, setUrl] = useState<string>("");

  function _setUrlParam(project: number, sprint: number) {
    UpdatePath(pageBase, { project, sprint });
    setUrl(`${pageBase}?project=${project}&sprint=${sprint}`);
  }

  return (
    <PrivatePageStructure title="BurnDown" noPadding>
      <BurnDownPageStructure
        preparePath={API_BURNDOWN.PREPARE(token)}
        onTabChange={(h, b) => _setUrlParam(h, b)}
        initialTab={project ? Number(project) : null}
        initialSprint={sprint ? Number(sprint) : null}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, project, sprint } = ctx.query;

  return {
    props: {
      token: token || null,
      project: project || null,
      sprint: sprint || null,
    }
  };
};

export default privateroute(BurnDown);
