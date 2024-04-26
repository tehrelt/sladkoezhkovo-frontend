import { NextPage } from 'next';
import DashboardTableView from './table';
import { tableExists } from '@/consts/tables';

interface Props {
  params: {
    table: string;
  };
}

const Page: NextPage<Props> = ({ params: { table } }) => {
  return (
    <div>
      {tableExists(table) ? (
        <DashboardTableView table={table} />
      ) : (
        <p>Таблицы не существует</p>
      )}
    </div>
  );
};

export default Page;
