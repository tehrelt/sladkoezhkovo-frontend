import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUsers } from '@/hooks/admin/useUsers';
import { NextPage } from 'next';
import UsersTable from './table';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <UsersTable />
    </div>
  );
};

export default Page;
