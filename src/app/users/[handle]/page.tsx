import { NextPage } from 'next';
import UserPageComponent from './UserPageComponent';

interface Props {
  params: {
    handle: string;
  };
}

const UsersPage: NextPage<Props> = ({ params: { handle } }) => {
  return <UserPageComponent handle={handle} />;
};

export default UsersPage;
