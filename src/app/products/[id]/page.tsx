import { NextPage } from 'next';

interface Props {
  params: {
    id: string;
  };
}

const ProductPage: NextPage<Props> = ({ params: { id } }) => {
  return <div>{id}</div>;
};

export default ProductPage;
