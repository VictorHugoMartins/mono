import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import ListDateHeaderFilters from '~/components/local/ListDateHeaderFilters';
import ListPageStructure from '~/components/structure/ListPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import PopupLoading from '~/components/ui/Loading/PopupLoading/PopupLoading';
import { API_POST_MANAGEMENT } from '~/config/apiRoutes/posts';
import { STORAGE_POST_MANAGEMENT } from '~/config/storage';
import privateroute from '~/routes/private.route';
import { postManagementService } from '~/services/postsManagement.service';
import { SelectObjectType } from '~/types/global/SelectObjectType';
import Cookies from 'js-cookie'
import TabsExternal from '~/components/structure/CollapseListPageStruture/components/TabsExternal';
import PostsOverview from '~/components/local/Posts/PostsOverview';

type DatesProps = {
  startdate: string;
  enddate: string;
}

const PostManagementList: React.FC<DatesProps> = ({ enddate, startdate }) => {
  const [currentTab, setCurrentTab] = useState<string | number | null>(null);
  const [options, setOptions] = useState<SelectObjectType[]>([]);
  const [loading, setLoading] = useState(true);

  const [_dates, setDates] = useState({
    startdate: startdate,
    enddate: enddate,
  });

  const _getOptions = async () => {
    const response = await postManagementService.getAllGroupedOptions();
    if (response.success === true) {
      setOptions(response.object);
      if (response.object.length > 0 && !currentTab) {
        const managementPost = Cookies.get(STORAGE_POST_MANAGEMENT);
        if (managementPost) {
          setCurrentTab(Number(managementPost));
        } else {
          setCurrentTab(response.object[0].value);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    _getOptions();
  }, []);

  useEffect(() => {
    if (currentTab) {
      const managementPost = Cookies.get(STORAGE_POST_MANAGEMENT);
      //console.log("Current", currentTab,managementPost);
      Cookies.set(STORAGE_POST_MANAGEMENT, currentTab.toString());
    }
  }, [currentTab]);

  let initialParam = {
    startDate: (new Date(Date.now() - 24 * 30 * 1 * 3600 * 1000)).toJSON().slice(0, 10),
    endDate: (new Date()).toJSON().slice(0, 10),
    managementId: '1',
    organizationId: "",
    userSellerId: "",
  };

  const [_params, setParams] = useState(initialParam);

  return (
    <PrivatePageStructure title="Lista de Posts" noPadding>
      <PopupLoading maxWidth='lg' show={loading} />
      <TabsExternal
        tabsList={options}
        initialHeaderTab={Number(currentTab)}
        onTabChange={(param, value) => { setCurrentTab(param) }}
        onChangePathValue={(value) => { }}
      />

      <ListPageStructure
        param="id"
        headerRender={
          <ListDateHeaderFilters
            enddate={_dates.enddate}
            startdate={_dates.startdate}
            filterPath={(start?: string, end?: string) => API_POST_MANAGEMENT.GET_ALL_GROUPED(start, end, currentTab)}
            setDates={setDates}
            noBody
          />
        }
        afterHeaderRender={<PostsOverview managementId={currentTab?.toString()} dates={_dates} setLoading={setLoading} />}
        exportPath={API_POST_MANAGEMENT.EXPORT(_dates.startdate, _dates.enddate, currentTab)}
        tabStyle="1"
        createPath="/adm/gerenciamentodeposts/adicionar"
        editPath="/adm/gerenciamentodeposts/editar"
        removeAPIPath={API_POST_MANAGEMENT.DELETE()}
        getListPath={API_POST_MANAGEMENT.GET_ALL_GROUPED(_dates.startdate, _dates.enddate, currentTab)}
        showTabs
        details
      />
    </PrivatePageStructure>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const months = 1;
  let startdate = new Date(Date.now() - 24 * 30 * months * 3600 * 1000);
  let enddate = new Date();

  //console.log(startdate,enddate);

  const { status, project, ticketId } = ctx.query;

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
      project: project ?? 0,
      status: status ?? 0,
      ticketId: ticketId ?? null,
    },
  };
};
export default privateroute(PostManagementList);