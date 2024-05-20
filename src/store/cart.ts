import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Entry = {
  id: string;
  name: string;
  price: number;
  productId: string;
};

type CartItem = {
  entry: Entry;
  unit: number;
};

type CartStore = {
  items: CartItem[];

  add: (entry: Entry, unit: number) => void;
  find: (id: string) => CartItem | undefined;
  update: (id: string, unit: number) => void;
  remove: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        add: (entry, unit) =>
          set((state) => {
            const item = state.items.find((item) => item.entry.id === id);

            if (item) {
              return state;
            }

            return {
              ...state,
              items: [...state.items, { entry, unit }],
            };
          }),

        find: (id: string) => {
          let item = get().items.find((i) => i.entry.id === id);
          return item;
        },

        remove: (id) =>
          set((state) => ({
            ...state,
            items: state.items.filter((i) => i.entry.id !== id),
          })),

        update: (id, unit) =>
          set((state) => {
            const item = state.items.find((i) => i.entry.id == id);

            if (item) {
              item.unit = unit;
            }

            return {
              ...state,
              items: [...state.items],
            };
          }),
      }),
      { name: 'cartStorage' },
    ),
  ),
);
