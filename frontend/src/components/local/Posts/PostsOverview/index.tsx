import React, { useEffect, useState } from 'react';
import { PostsDashboardType, postManagementService } from '~/services/postsManagement.service';
import { Grid } from '~/components/ui/Layout/Grid';
import Card from '~/components/ui/Card';
import Chart from '~/components/ui/Charts/Chart';
import DataTable from '~/components/ui/DataTable/DataTable';

type PostsOverviewProps = {
  managementId: string;
  dates: { startdate: string, enddate: string };
  setLoading: Function;
}

const PostsOverview: React.FC<PostsOverviewProps> = ({ managementId, dates, setLoading }) => {
  const [_data, setData] = useState<PostsDashboardType>(null);

  const _getDashboard = async () => {
    const response = await postManagementService.getDashboard(managementId !== '0' ? managementId : null, dates.startdate, dates.enddate);
    if (response.success === true) {
      setData(response.object);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (managementId && dates.startdate && dates.enddate) {
      _getDashboard();
    }
  }, [managementId, dates]);

  return (
    <Grid container justify='center' align='center' padding='xg' spacing='g'>
      {_data?.table.columns && (_data?.table.rows.length > 0) && <Grid md={6}>
        <DataTable
          columns={_data?.table.columns}
          rows={_data?.table.rows}
          paginator
          rowsPerPage={5}
        />
      </Grid>}
      {_data?.charts.length > 0 &&
        <>
          <Grid md={6}>
            <Card title={_data?.charts[3]?.title}>
              <Chart {..._data?.charts[3]?.chart} />
            </Card>
          </Grid>

          {_data?.charts.map((item, index) => (
            index < 3 && <Grid md={4}>
              <Card title={item.title}>
                <Chart {...item.chart} />
              </Card>
            </Grid>
          ))}
        </>
      }
    </Grid>
  );
}

export default PostsOverview;