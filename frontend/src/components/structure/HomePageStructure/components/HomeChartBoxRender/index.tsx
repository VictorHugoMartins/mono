import React, { useEffect, useState } from "react";
import { ChartProps } from "react-chartjs-2";

//Import components
import Card from "~/components/ui/Card";
import Chart from "~/components/ui/Charts/Chart";
import Icon from "~/components/ui/Icon/Icon";
import SelectOptions from "~/components/ui/Inputs/Select/SelectOptions";
import Link from "~/components/ui/Link/Link";

//Import services
import homeService from "~/services/home.service";
import { ChartObjectType } from "~/types/global/ChartTypes";

//Import types
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import HomeSelect from "../HomeSelect";

import style from "./homeChartBoxRender.module.scss";

interface HomeChartBoxRenderProps {
  getChartPath?: string;
  redirectPath?: string;
  managementSelect?: boolean;
  title: string;
  data: ChartObjectType;
}

const HomeChartBoxRender: React.FC<HomeChartBoxRenderProps> = ({
  getChartPath,
  redirectPath,
  managementSelect,
  title,
  data,
}) => {
  // const [chartPath, setChartPath] = useState(getChartPath);

  // function changeChartPath(value: string) {
  //   if (value) setChartPath(`${getChartPath}?managementId=${value}`);
  // }

  if (!data) return <>sem data</>;
  return (
    <Card
      title={title}
      buttons={
        <>
          {/* {managementSelect && (
            <HomeChartBoxSelect onChange={(e) => changeChartPath(e)} />
          )} */}
          {redirectPath && (
            <Link to={redirectPath} title={`Ir para ${title}`}>
              <Icon type="FaExternalLinkAlt" size={16} />
            </Link>
          )}
        </>
      }
    >
      <div className={style.chart}>
        <Chart
          {...data}
        />
      </div>
    </Card>
  );
};

interface HomeChartBoxSelectProps {
  onChange?: (managementId: string) => void;
}

const HomeChartBoxSelect: React.FC<HomeChartBoxSelectProps> = ({
  onChange,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectOptionsType>([]);

  useEffect(() => {
    _getOptions();
  }, []);

  async function _getOptions() {
    let response = await homeService.getManagementSelect();

    if (response) {
      setOptions(response.dropDown);
      setVisible(response.isDropDownVisible);
    }
  }

  if (!visible) return <></>;
  return (
    <HomeSelect
      label="Gerência"
      options={options}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
    />
  );
};

export default HomeChartBoxRender;
