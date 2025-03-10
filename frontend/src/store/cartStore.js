import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,

            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    const updatedItems = items.map(item =>
                        item.id === product.id ? {...item, quantity: item.quantity + product.quantity } :
                        item
                    );
                    set(state => ({
                        items: updatedItems,
                        totalItems: state.totalItems + product.quantity,
                        totalPrice: state.totalPrice + (product.price * product.quantity)
                    }));
                } else {
                    set(state => ({
                        items: [...state.items, product],
                        totalItems: state.totalItems + product.quantity,
                        totalPrice: state.totalPrice + (product.price * product.quantity)
                    }));
                }
            },

            updateItemQuantity: (productId, quantity) => {
                const items = get().items;
                if (quantity <= 0) {
                    set(state => ({
                        items: state.items.filter(item => item.id !== productId)
                    }));
                } else {
                    set(state => ({
                        items: state.items.map(item =>
                            item.id === productId ? {...item, quantity } : item
                        )
                    }));
                }
            },

            removeItem: (productId) => {
                set(state => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
            },

            get totalPrice() {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            }
        }), {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;