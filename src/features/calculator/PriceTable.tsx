'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useProductStore } from '@/lib/store';

import { ChevronDown, ChevronUp, RefreshCw, Trash2 } from 'lucide-react';

export const PriceTable = () => {
    const { products, updateProtein, deleteProduct } = useProductStore();
    const [proteinGrams, setProteinGrams] = useState(1);
    const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

    const handleUpdateProtein = () => {
        updateProtein(proteinGrams);
    };

    const handleDeleteItem = (index: number) => {
        deleteProduct(index);
    };

    const toggleRowExpansion = (index: number) => {
        setExpandedRowIndex(expandedRowIndex === index ? null : index);
    };

    return (
        <Card className='w-full border-none shadow-lg'>
            <CardHeader>
                <CardTitle className='text-center text-xl font-semibold text-gray-800'>Product Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='mb-6 flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <Input
                            type='number'
                            value={proteinGrams}
                            onChange={(e) => setProteinGrams(Number(e.target.value))}
                            placeholder='Grams'
                            className='w-24 rounded-md focus:ring-2 focus:ring-blue-500'
                        />
                        <span className='text-gray-600'>g of Protein</span>
                    </div>
                    <Button
                        onClick={handleUpdateProtein}
                        variant='outline'
                        className='flex items-center space-x-2 border-blue-500 text-blue-600 hover:bg-blue-50'>
                        <RefreshCw className='size-4' />
                        <span>Update</span>
                    </Button>
                </div>

                <Separator className='mb-6' />

                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-100 text-left'>
                                <th className='px-4 py-2'>Product</th>
                                <th className='px-4 py-2'>Price/Protein</th>
                                <th className='px-4 py-2 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <React.Fragment key={index}>
                                    <tr
                                        className={`border-b transition-colors hover:bg-gray-50 ${
                                            expandedRowIndex === index ? 'bg-gray-50' : ''
                                        }`}>
                                        <td className='px-4 py-3 font-medium'>{product.name}</td>
                                        <td className='px-4 py-3'>
                                            ${product.pricePerGram}
                                            <span className='ml-1 text-xs text-gray-500'>({product.currency})</span>
                                        </td>
                                        <td className='flex items-center justify-center px-4 py-3 text-center'>
                                            {expandedRowIndex !== index ? (
                                                <ChevronDown
                                                    onClick={() => toggleRowExpansion(index)}
                                                    className='mr-2 size-5 cursor-pointer text-gray-500 hover:text-gray-700'
                                                />
                                            ) : (
                                                <ChevronUp
                                                    onClick={() => toggleRowExpansion(index)}
                                                    className='mr-2 size-5 cursor-pointer text-gray-500 hover:text-gray-700'
                                                />
                                            )}
                                            <Button
                                                onClick={() => handleDeleteItem(index)}
                                                variant='destructive'
                                                size='icon'
                                                className='size-8'>
                                                <Trash2 className='size-4' />
                                            </Button>
                                        </td>
                                    </tr>
                                    {expandedRowIndex === index && (
                                        <tr>
                                            <td colSpan={3} className='bg-blue-50 px-4 py-3'>
                                                <div className='grid grid-cols-2 gap-2 text-gray-600'>
                                                    <div>
                                                        <strong>Weight:</strong> {product.weight}g
                                                    </div>
                                                    <div>
                                                        <strong>Servings:</strong> {product.servings}
                                                    </div>
                                                    <div>
                                                        <strong>Protein per Serving:</strong>{' '}
                                                        {product.proteinPerServing}g
                                                    </div>
                                                    <div>
                                                        <strong>Total Price:</strong> ${product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <p className='mt-4 text-center text-gray-500'>No products added. Use the form to add products.</p>
                )}
            </CardContent>
        </Card>
    );
};
