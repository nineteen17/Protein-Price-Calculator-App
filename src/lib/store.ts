import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Product {
    name: string;
    price: number;
    weight: number;
    servings: number;
    proteinPerServing: number;
    currency: string;
    pricePerGram: string;
}

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProtein: (grams: number) => void;
    deleteProduct: (index: number) => void;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: [],
            addProduct: (product) => {
                set((state) => ({
                    products: [...state.products, product],
                }));
            },
            updateProtein: (grams) => {
                set((state) => ({
                    products: state.products.map((product) => {
                        const totalProteinWeight = product.servings * product.proteinPerServing;
                        const pricePerGram = product.price / totalProteinWeight;

                        return {
                            ...product,
                            pricePerGram: (pricePerGram * grams).toFixed(2),
                        };
                    }),
                }));
            },
            deleteProduct: (index) => {
                set((state) => ({
                    products: state.products.filter((_, i) => i !== index),
                }));
            },
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                products: state.products,
            }),
        }
    )
);
