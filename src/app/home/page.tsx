"use client";

import { InputForm } from '@/features/calculator/InputForm';
import { PriceTable } from '@/features/calculator/PriceTable';
import { useProductStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HomePage = () => {
  const { products } = useProductStore();

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Protein Price Calculator</h1>
      
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="add">Add Product</TabsTrigger>
          <TabsTrigger value="compare" disabled={products.length === 0}>
            Compare Products
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="add">
          <InputForm />
        </TabsContent>
        
        <TabsContent value="compare">
          {products.length > 0 && <PriceTable />}
        </TabsContent>
      </Tabs>
    </div>
  );
};