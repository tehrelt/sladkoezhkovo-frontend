import { NextPage } from 'next';
import DashboardTableView from './table';

interface Props {
  params: {
    table: string;
  };
}

const Page: NextPage<Props> = ({ params: { table } }) => {
  return (
    <div>
      <DashboardTableView table={table} />
    </div>
  );
};

export default Page;
