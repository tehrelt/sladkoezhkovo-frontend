import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { NextPage } from 'next';
import FactoryOverviewPage from './FactoryOverviewPage';

interface Props {
  params: {
    handle: string;
  };
}

const FactoryPage: NextPage<Props> = ({ params: { handle } }) => {
  return <FactoryOverviewPage handle={handle} />;
};

export default FactoryPage;
