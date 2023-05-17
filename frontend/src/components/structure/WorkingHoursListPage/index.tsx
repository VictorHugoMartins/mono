import React from "react";

//Import components
import ListPageStructure, { ListPageStructureProps } from "../ListPageStructure";

//Import types
import ListDateHeaderFilters from "~/components/local/ListDateHeaderFilters";

export interface WorkingHoursListPageProps extends ListPageStructureProps {
  filterPath: (startDate: string, endDate: string) => string;
  startdate: string;
  enddate: string;
  setDates?: Function;
}

const WorkingHoursListPage: React.FC<WorkingHoursListPageProps> = ({
  headerRender,
  ...rest
}) => {
  return (
    <ListPageStructure
      headerRender={<ListDateHeaderFilters {...rest} />}
      {...rest}
    />
  );
};

export default WorkingHoursListPage;
