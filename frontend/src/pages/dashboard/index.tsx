import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import HomePageStructure from "~/components/structure/HomePageStructure";
import PageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import privateroute from "~/routes/private.route";
import UpdatePath from "~/utils/UpdatePath";

const pageBase = "dashboard";

interface DashboardProps {
  view: number;
}

const Dashboard: React.FC<DashboardProps> = ({ view }) => {
  const router = useRouter();
  const [_url, setUrl] = useState<string>("");

  const [_view, setView] = useState(view);

  function _setUrlParam(view: number) {
    UpdatePath("/dashboard", { view });
    setUrl(`/dashboard?view=${view}`);
  }

  useEffect(() => {
    addEventListener("popstate", (event) => {
      return handlePopState(document, event, pageBase, updateFiltersFromURL);
    });
  }, []);

  router.beforePopState(({ url, as, options }) => {
    if (!as.includes(pageBase)) {
      window.location.assign(as);
      return false;
    }

    return true;
  });

  function handlePopState(
    document: Document,
    event: PopStateEvent,
    pathBase: string,
    updateFiltersFromURL: { (url: string): void; (arg0: any): void }
  ) {
    let _pathname = document.location.toString();
    if (!_pathname.includes("view=") && _pathname.includes(pathBase)) {
      Router.back();

      return true;
    }
    if (document.location !== event?.state?.url) {
      updateFiltersFromURL(event?.state?.url);
    }
    return true;
  }

  function updateFiltersFromURL(url: string) {
    if (!url) return;
    setView(parseInt(url.split("view=")[1]));
  }

  return (
    <PageStructure title="Página Inicial" noPadding>
      <HomePageStructure
        onTabChange={(h) => _setUrlParam(h)}
        view={Number(_view)}
      />
    </PageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { view } = ctx.query;

  return {
    props: {
      view: view ?? 0,
    },
  };
};

export default privateroute(Dashboard);
