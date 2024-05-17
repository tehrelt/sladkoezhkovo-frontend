import CreateProductForm from '@/components/forms/create/CreateProductForm';
import { ArrowLeft } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  params: {
    handle: string;
  };
}

const CreateNewProductPage: NextPage<Props> = ({ params: { handle } }) => {
  return (
    <div>
      <Link href={`/factory/${handle}`} className="flex hover:underline">
        <ArrowLeft />
        Вернуться назад
      </Link>
      <div>
        <CreateProductForm factoryHandle={handle} />
      </div>
    </div>
  );
};

export default CreateNewProductPage;
