import { NextPage } from 'next';

interface Params {
  table: string;
}

const TablePage = ({ params }: { params: Params }) => {
  return <div>{params.table}</div>;
};

export default TablePage;
