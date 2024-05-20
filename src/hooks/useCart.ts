import { AddToCartDto } from '@/lib/dto/add-to-cart';
import { RemoveFromCartDto } from '@/lib/dto/remove-from-cart';
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
