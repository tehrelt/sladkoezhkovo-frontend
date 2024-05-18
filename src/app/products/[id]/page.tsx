import { NextPage } from 'next';
import ProductOverviewPage from './ProductOverviewPage';

interface Props {
  params: {
    id: string;
  };
}

const ProductPage: NextPage<Props> = ({ params: { id } }) => {
  return <ProductOverviewPage id={id} />;
};

export default ProductPage;
