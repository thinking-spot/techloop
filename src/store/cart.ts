import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            addItem: (newItem) => set((state) => {
                const existingItem = state.items.find((item) => item.id === newItem.id);
                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true, // Open cart when adding
                    };
                }
                return {
                    items: [...state.items, { ...newItem, quantity: 1 }],
                    isOpen: true, // Open cart when adding
                };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),
            clearCart: () => set({ items: [] }),
            total: () => {
                const items = get().items;
                return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'techloop-cart',
        }
    )
);
