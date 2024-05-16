import { NextPage } from 'next';

interface Props {}

const NotFound: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <div className="justify-center">404 Страница не найдена</div>
    </div>
  );
};

export default NotFound;
