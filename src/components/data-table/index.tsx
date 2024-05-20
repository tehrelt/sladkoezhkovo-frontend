'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '../ui/table';
import { Button } from '../ui/button';
import { useEffect, useMemo, useState } from 'react';
import { ListDto } from '@/lib/types/list.dto';
import { useQueryClient } from '@tanstack/react-query';
import { FiltersDto } from '@/lib/filters/index.dto';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetcher: (filters: FiltersDto) => {
    data: ListDto<TData>;
    isLoading: boolean;
    queryKey: string[];
  };
  deleter?: (id: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  fetcher,
  deleter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, queryKey } = fetcher({
    page: pageIndex,
    limit: pageSize,
  });
  const queryClient = useQueryClient();

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: data ? data.items : [],
    columns,
    pageCount: data ? Math.ceil(data.count / pageSize) : 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      columnFilters,
      pagination,
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) =>
              setPagination(() => ({
                pageIndex: 0,
                pageSize: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Записей на страницу" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Количество записей</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div>
            <p className="text-muted-foreground text-end">
              Всего записей: {data?.count}
            </p>
            <div className="flex space-x-2 py-4 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Предыдущая
              </Button>
              <span>{pageIndex + 1}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Следующая
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <TableRow key={i} className="h-20">
                  {columns.map((c) => (
                    <TableCell key={c.id}>
                      <Skeleton className="h-8 w-1/2" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.getVisibleCells()[0].getValue() as string}
                  data-state={row.getIsSelected() && 'selected'}
                  className="h-20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {/* {deleter && ( */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="flex justify-center items-center border hover:bg-gray-200 py-2 px-2 rounded">
                          <Trash />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удаление записи</AlertDialogTitle>
                          <AlertDialogDescription>
                            <p>
                              {row.getVisibleCells()[1].getValue() as string}
                            </p>
                            <p>
                              Удаление этой записи понесёт за собой удаление
                              связанных записей. {'(Количество: )'}
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction>Удалить</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет записей
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
