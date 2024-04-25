import { NextPage } from 'next';
import { DataPage } from '@/components/data-page';

interface Props {
  params: {
    table: string;
    id: string;
  };
}

const Page: NextPage<Props> = ({ params: { table, id } }: Props) => {
  return (
    <div>
      <DataPage table={table} id={id} />
    </div>
  );

  // return (
  //   <div>
  //     {data && (
  //       <>
  //         <div className="py-4">
  //           <Breadcrumb>
  //             <BreadcrumbList>
  //               <BreadcrumbItem>
  //                 <BreadcrumbLink>
  //                   <Link href={PAGES.DASHBOARD}>Панель управления</Link>
  //                 </BreadcrumbLink>
  //               </BreadcrumbItem>
  //               <BreadcrumbSeparator />
  //               <BreadcrumbItem>
  //                 <BreadcrumbLink>
  //                   <Link href={`${PAGES.DASHBOARD}/${table}`}>
  //                     {DATA_TABLES[table].title}
  //                   </Link>
  //                 </BreadcrumbLink>
  //               </BreadcrumbItem>
  //               <BreadcrumbSeparator />
  //               <BreadcrumbItem>
  //                 <BreadcrumbPage>
  //                   {isLoading ? (
  //                     <Skeleton className="h-4 w-[150px]" />
  //                   ) : (
  //                     data?.handle
  //                   )}
  //                 </BreadcrumbPage>
  //               </BreadcrumbItem>
  //             </BreadcrumbList>
  //           </Breadcrumb>
  //         </div>
  //         <div className="flex gap-4">
  //           <Card className="px-4 py-2 w-[400px]">
  //             <CardHeader className="items-center gap-2">
  //               <Avatar className="w-[128px] h-[128px]">
  //                 <AvatarImage src={data.imageLink || undefined} />
  //                 <AvatarFallback>{data?.lastName.charAt(0)}</AvatarFallback>
  //               </Avatar>
  //               <CardTitle>
  //                 {isLoading ? (
  //                   <Skeleton className="h-4 w-[360px]" />
  //                 ) : (
  //                   <div className="text-center">
  //                     <p className="font-medium">{data?.lastName}</p>
  //                     <p className="font-medium">
  //                       {data?.firstName} {data?.middleName}
  //                     </p>
  //                   </div>
  //                 )}
  //               </CardTitle>
  //               <CardDescription>
  //                 <p>@{data?.handle}</p>
  //               </CardDescription>
  //               <CardDescription>
  //                 {/* @ts-ignore */}
  //                 <p>{LOCAL_ROLES[data?.role]}</p>
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>
  //           <Card className="px-4 py-8">
  //             <CardContent className="flex flex-col gap-2">
  //               <div>
  //                 <p className="font-bold">Email</p>
  //                 <p>{data?.email}</p>
  //               </div>
  //               <Separator />
  //               <div>
  //                 <p className="font-bold">Зарегистрирован с </p>
  //                 <p>{localDate(data?.createdAt)}</p>
  //               </div>
  //               <Separator />
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default Page;
