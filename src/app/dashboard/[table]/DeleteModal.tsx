import { IDeleter } from '@/lib/types/options/table.options';
import React, { useContext } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  id: string;
  deleter: (id: string) => IDeleter;
};

const DeleteModalContext = React.createContext<Props>({
  id: '',
  deleter: (id) => id,
});

const ModalContent = () => {
  const ctx = useContext(DeleteModalContext);

  const { deletePending, depsLoading, mutate, deps } = ctx.deleter(ctx.id);

  return (
    <AlertDialogContent>
      <AlertDialogHeader className="">
        <div>
          <span>Удаление записи </span>
          {!depsLoading && deps ? (
            <span className="text-lg">&quot;{deps.name}&quot;</span>
          ) : (
            <Skeleton className="w-32 h-6" />
          )}
        </div>
        <AlertDescription className="text-muted-foreground">
          ЭТО ДЕЙСТВИЕ НЕОБРАТИМО
        </AlertDescription>
      </AlertDialogHeader>
      <p>
        Количество зависимых записей{' '}
        {!depsLoading && deps ? (
          <span className="text-lg font-bold">{deps.count}</span>
        ) : (
          <Skeleton className="w-32 h-4" />
        )}
      </p>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                disabled={depsLoading || deletePending}
                onClick={() => mutate()}
              >
                Удалить
              </AlertDialogAction>
            </TooltipTrigger>
            <TooltipContent>ЭТО ДЕЙСТВИЕ НЕОБРАТИМО</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export const DeleteModal = ({ id, deleter }: Props) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <DeleteModalContext.Provider value={{ id, deleter }}>
      <AlertDialog open={isOpen} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <Button className="h-fit px-2 py-2" variant="outline">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        {isOpen && <ModalContent />}
      </AlertDialog>
    </DeleteModalContext.Provider>
  );
};
