import { AddToCartDto } from '@/lib/dto/add-to-cart';
import { RemoveFromCartDto } from '@/lib/dto/remove-from-cart';
import { UpdateCartEntryDto } from '@/lib/dto/update-cart-entry.dto';
import { AccountService } from '@/services/account.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCart() {
  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: AccountService.cart,
    retry: false,
  });

  const checkProduct = (catalogueId: string) => {
    return (
      !isLoading && data?.items.find((i) => i.catalogueEntry.id === catalogueId)
    );
  };

  return { data, isLoading, checkProduct };
}

export function useAddToCart({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-to-cart'],
    mutationFn: (dto: AddToCartDto) => AccountService.addToCart(dto),
    onError,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['cart'],
      });
      onSuccess?.();
    },
  });

  return { mutate, isPending };
}

export function useUpdateCartEntry({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['update-cart-entry'],
    mutationFn: (dto: UpdateCartEntryDto) =>
      AccountService.updateCartEntry(dto),
    onError,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['cart'],
      });
      console.log(onSuccess);
      onSuccess?.();
    },
  });

  return { mutate, isPending };
}

export function useRemoveFromCart({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['remove-to-cart'],
    mutationFn: (dto: RemoveFromCartDto) => AccountService.removeFromCart(dto),
    onError,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['cart'],
      });
      onSuccess?.();
    },
  });

  return { mutate, isPending };
}
