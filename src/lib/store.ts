import { create } from 'zustand';

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

export const useProductStore = create<ProductStore>((set) => {
    const saveToLocalStorage = (products: Product[]) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    return {
        products: JSON.parse(localStorage.getItem('products') || '[]'),
        addProduct: (product) =>
            set((state) => {
                const updatedProducts = [...state.products, product];
                saveToLocalStorage(updatedProducts);
                return { products: updatedProducts };
            }),
        updateProtein: (grams) =>
            set((state) => {
                const updatedProducts = state.products.map((product) => {
                    const totalProteinWeight = product.servings * product.proteinPerServing;
                    const pricePerGram = product.price / totalProteinWeight;
                    return {
                        ...product,
                        pricePerGram: (pricePerGram * grams).toFixed(2),
                    };
                });
                saveToLocalStorage(updatedProducts);
                return { products: updatedProducts };
            }),
        deleteProduct: (index) =>
            set((state) => {
                const updatedProducts = state.products.filter((_, i) => i !== index);
                saveToLocalStorage(updatedProducts);
                return { products: updatedProducts };
            }),
    };
});
