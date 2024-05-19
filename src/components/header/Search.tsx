'use client';
import React, { ReactNode, useContext, createContext } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { fio } from '@/lib/utils';
import { PAGES } from '@/consts/pages.consts';
import { Input } from '../ui/input';
import { Popover, PopoverContent } from '../ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '@radix-ui/react-separator';

type Props = {
  className?: string;
};
type ResultProps = {
  link: string;
  name: string;
  image?: string;
};

const SearchContext = createContext(() => {});

const Result = ({ link, name, image }: ResultProps) => {
  const callback = useContext(SearchContext);

  return (
    <Link
      href={link}
      className="flex py-2 px-2 gap-x-4 items-center hover:bg-slate-100 rounded"
      onClick={(e) => callback()}
    >
      <Avatar>
        <AvatarImage src={image} width={24} height={24} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <span className="text-sm">{name}</span>
    </Link>
  );
};

const ResultList = ({
  isLoading,
  results,
}: {
  isLoading: boolean;
  results?: { link: string; name: string; image?: string }[];
}) => {
  if (isLoading) {
    return <Skeleton className="w-[64px] h-[8px]" />;
  }

  if (!results || results.length === 0) {
    return <div>Ничего не найдено.</div>;
  }

  return results.map((r) => <Result key={r.link} {...r} />);
};

const ResultGroup = ({
  heading,
  children,
  visible = true,
}: {
  heading?: string;
  children: ReactNode;
  visible?: boolean;
}) => {
  return (
    visible && (
      <div className="">
        <span className="text-sm font-semibold ml-4">{heading}</span>
        {children}
      </div>
    )
  );
};

const Search = ({ className }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [query, setQuery] = React.useState('');

  const { data, isError, isLoading, queryKey } = useSearch(query);

  const queryClient = useQueryClient();

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(!!value);
    queryClient.invalidateQueries({
      queryKey,
    });
  };

  return (
    <Popover modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Input
          placeholder="Поиск по сайту"
          onChange={(e) => handleChange(e.target.value)}
          className="w-96"
        />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-96"
      >
        <ScrollArea className="h-72">
          <SearchContext.Provider value={() => setIsOpen(false)}>
            {data && (
              <div className="">
                <ResultGroup
                  heading="Товары"
                  visible={data.products.length !== 0}
                >
                  <ResultList
                    isLoading={isLoading}
                    results={
                      data &&
                      data.products.map((i) => ({
                        link: `${PAGES.PRODUCTS}/${i.id}`,
                        name: i.name,
                        image: i.image,
                      }))
                    }
                  />
                </ResultGroup>
                <ResultGroup
                  heading="Фабрики"
                  visible={data.factories.length !== 0}
                >
                  <ResultList
                    isLoading={isLoading}
                    results={
                      data &&
                      data.factories.map((i) => ({
                        link: `${PAGES.FACTORY}/${i.handle}`,
                        name: i.name,
                        image: i.image,
                      }))
                    }
                  />
                </ResultGroup>
                <ResultGroup
                  heading="Пользователи"
                  visible={data.users.length !== 0}
                >
                  <ResultList
                    isLoading={isLoading}
                    results={data.users.map((i) => ({
                      link: `${i.handle}`,
                      name: `${fio(i)} (@${i.handle})`,
                      image: i.image,
                    }))}
                  />
                </ResultGroup>
              </div>
            )}
          </SearchContext.Provider>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default Search;
