import React, { createContext, useContext, useState } from 'react';
import { Price } from '@/components/ui/price-range';
import { useShopsShipments } from '@/hooks/useProfile';
import { datef } from '@/lib/utils';
import { DataTable } from '@/components/data-table';
import { ShopShipment } from '@/lib/dto/shipments.dto';
import { PAGES } from '@/consts/pages.consts';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ShopReciept from './ShopReciept';
import { Button } from '@/components/ui/button';

type Props = {};

const COLUMNS: ColumnDef<ShopShipment>[] = [
  {
    accessorKey: 'shop',
    header: 'Магазин',
    cell: (cell) => (
      <p>{(cell.getValue() as { name: string; handle: string }).name}</p>
    ),
  },
  {
    accessorKey: 'cost',
    header: () => <p className="text-right">Цена</p>,
    cell: (cell) => (
      <div className="flex justify-end">
        <Price value={cell.getValue()} />
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: () => <p className="text-center">Чек</p>,
    cell: (cell) => (
      <div className="flex  justify-center">
        <div>
          <DialogTrigger>
            <Button variant={'outline'}>Посмотреть чек</Button>
          </DialogTrigger>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => <p className="text-right">Заказано</p>,
    cell: (cell) => <p className="text-right">{datef(cell.getValue())}</p>,
  },
];

const RecieptContext = createContext<
  | {
      shipmentId?: string;
    }
  | undefined
>(undefined);

const RecieptModal = () => {
  const ctx = useContext(RecieptContext);

  return <p>fqwfqwfqw</p>;
};

const ShopShipmentsList = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Dialog modal>
        <DataTable fetcher={useShopsShipments} columns={COLUMNS} />
        <DialogContent>
          <RecieptModal />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopShipmentsList;
