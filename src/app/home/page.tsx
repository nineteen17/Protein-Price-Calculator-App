'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputForm } from '@/features/calculator/InputForm';
import { PriceTable } from '@/features/calculator/PriceTable';
import { useProductStore } from '@/lib/store';

export const HomePage = () => {
    const { products } = useProductStore();

    return (
        <div className='container mx-auto max-w-4xl px-4 py-10'>
            <h1 className='mb-2 text-center text-3xl font-bold text-gray-800'>Protein Compare</h1>
            <p className='mb-8 text-center text-m text-gray-600'>
                Calculate and compare the cost of protein products per gram to find the best value.
            </p>
            <Tabs defaultValue='add' className='w-full'>
                <TabsList className='mb-6 grid w-full grid-cols-2'>
                    <TabsTrigger value='add'>Add Product</TabsTrigger>
                    <TabsTrigger
                        value='compare'
                        disabled={products.length === 0}
                        className={products.length === 0 ? 'cursor-not-allowed opacity-50' : ''}>
                        Compare Products
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='add'>
                    <InputForm />
                </TabsContent>

                <TabsContent value='compare'>{products.length > 0 && <PriceTable />}</TabsContent>
            </Tabs>
        </div>
    );
};
