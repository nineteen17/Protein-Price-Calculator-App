"use client";
import React, { useState } from 'react';
import { useProductStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export const PriceTable = () => {
  const { products, updateProtein, deleteProduct } = useProductStore();
  const [proteinGrams, setProteinGrams] = useState(1);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleUpdateProtein = () => {
    updateProtein(proteinGrams);
  };

  const handleDeleteItem = (index: number) => {
    deleteProduct(index);
    if (products.length === 1) {
      router.push('/');
    }
  };

  const toggleRowExpansion = (index: number) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  return (
    <Card className="w-full border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Product Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={proteinGrams}
              onChange={(e) => setProteinGrams(Number(e.target.value))}
              placeholder="Grams"
              className="w-24 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600">g of Protein</span>
          </div>
          <Button
            onClick={handleUpdateProtein}
            variant="outline"
            className="flex items-center space-x-2 border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Update</span>
          </Button>
        </div>

        <Separator className="mb-6" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price/Protein</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">
                      ${product.pricePerGram}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.currency})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center flex items-center justify-center">
                      {expandedRowIndex !== index ? (
                        <ChevronDown 
                          onClick={() => toggleRowExpansion(index)} 
                          className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5 mr-2"
                        />
                      ) : (
                        <ChevronUp 
                          onClick={() => toggleRowExpansion(index)} 
                          className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5 mr-2"
                        />
                      )}
                      <Button
                        onClick={() => handleDeleteItem(index)}
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  {expandedRowIndex === index && (
                    <tr>
                      <td colSpan={3} className="px-4 py-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2 text-gray-700">
                          <div>
                            <strong>Weight:</strong> {product.weight}g
                          </div>
                          <div>
                            <strong>Servings:</strong> {product.servings}
                          </div>
                          <div>
                            <strong>Protein per Serving:</strong> {product.proteinPerServing}g
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
          <p className="text-center text-gray-500 mt-4">No products added. Use the form to add products.</p>
        )}
      </CardContent>
    </Card>
  );
};