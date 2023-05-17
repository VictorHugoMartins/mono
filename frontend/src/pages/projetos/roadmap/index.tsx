import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";

import RoadMapPageStructure from "~/components/structure/RoadMapPageStructure";

import privateroute from "~/routes/private.route";
import UpdatePath from "~/utils/UpdatePath";

interface RoadMapProps {
  token: string;
  startdate: string;
  enddate: string;
  view: string;
}

const RoadMap: React.FC<RoadMapProps> = ({ startdate, enddate, token, view }) => {
  const pageBase = "projetos/roadmap";
  const router = useRouter();
  const [_url, setUrl] = useState<string>("");

  const [_view, setView] = useState(view);

  function _setUrlParam(view: number) {
    UpdatePath("/projetos/roadmap", { view });
    setUrl(`/projetos/roadmap?view=${view}`);
  }

  useEffect(() => {
    addEventListener('popstate', (event) => {
      return handlePopState(document, event, pageBase, updateFiltersFromURL);
    })
  }, [])

  router.beforePopState(({ url, as, options }) => {
    if (!as.includes(pageBase)) {
      window.location.assign(as);
      return false
    }

    return true;
  })

  function handlePopState(document: Document, event: PopStateEvent, pathBase: string, updateFiltersFromURL: { (url: string): void; (arg0: any): void; }) {
    let _pathname = document.location.toString();
    if (!(_pathname.includes('view=')) && (_pathname.includes(pathBase))) {
      Router.back();

      return true
    }
    if (document.location !== event?.state?.url) {
      updateFiltersFromURL(event?.state?.url);
    }
    return true;
  }

  function updateFiltersFromURL(url: string) {
    if (!url) return;
    setView(url.split("view=")[1]);
  }

  return (
    <RoadMapPageStructure
      startdate={startdate}
      enddate={enddate}
      view={Number(_view)}
      onTabChange={(h) => _setUrlParam(h)}
      title={"RoadMap"}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let startdate = new Date(Date.now() - 24 * 15 * 3600 * 1000);
  let enddate = new Date();

  const { view, token } = ctx.query;

  return {
    props: {
      view: view ?? 0,
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
      token: token || null,
    },
  };
};

export default privateroute(RoadMap);
