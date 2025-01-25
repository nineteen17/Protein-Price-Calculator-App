'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useProductStore } from '@/lib/store';

import { AlertCircle } from 'lucide-react';

export const InputForm = () => {
    const { addProduct, updateProtein } = useProductStore();
    const [isToastOpen, setIsToastOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        weight: '',
        servings: '',
        proteinPerServing: '',
        currency: 'NZD'
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Price must be a positive number';
        if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Weight must be a positive number';
        if (!formData.servings || parseInt(formData.servings) <= 0)
            newErrors.servings = 'Servings must be a positive number';
        if (!formData.proteinPerServing || parseFloat(formData.proteinPerServing) <= 0)
            newErrors.proteinPerServing = 'Protein per serving must be a positive number';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const totalProtein = parseFloat(formData.servings) * parseFloat(formData.proteinPerServing);
        const pricePerGram = (parseFloat(formData.price) / totalProtein).toFixed(2);

        addProduct({
            name: formData.name,
            price: parseFloat(formData.price),
            weight: parseFloat(formData.weight),
            servings: parseInt(formData.servings),
            proteinPerServing: parseFloat(formData.proteinPerServing),
            currency: formData.currency,
            pricePerGram
        });
        updateProtein(1);
        setIsToastOpen(true);

        // Reset form after submission
        setFormData({
            name: '',
            price: '',
            weight: '',
            servings: '',
            proteinPerServing: '',
            currency: 'NZD'
        });

        // Auto-close toast after 3 seconds
        setTimeout(() => setIsToastOpen(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const inputFields = [
        { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name' },
        { name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price' },
        { name: 'weight', label: 'Weight (g)', type: 'number', placeholder: 'Enter weight' },
        { name: 'servings', label: 'Servings', type: 'number', placeholder: 'Enter servings' },
        { name: 'proteinPerServing', label: 'Protein Per Serving (g)', type: 'number', placeholder: 'Enter protein' }
    ];

    return (
        <ToastProvider>
            <Card className='w-full border-none shadow-lg'>
                <CardHeader>
                    <CardTitle className='text-center text-xl font-semibold text-gray-800'>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {inputFields.map(({ name, label, type, placeholder }) => (
                            <div key={name}>
                                <label className='mb-1 block text-sm font-medium text-gray-700'>{label}</label>
                                <Input
                                    name={name}
                                    type={type}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className='w-full rounded-md focus:border-transparent focus:ring-2 focus:ring-blue-500'
                                />
                                {errors[name] && (
                                    <div className='mt-1 flex items-center text-xs text-red-500'>
                                        <AlertCircle className='mr-1 size-3' />
                                        {errors[name]}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div>
                            <label className='mb-1 block text-sm font-medium text-gray-700'>Currency</label>
                            <select
                                name='currency'
                                value={formData.currency}
                                onChange={handleChange}
                                className='w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500'>
                                <option value='NZD'>NZD</option>
                                <option value='USD'>USD</option>
                                <option value='AUD'>AUD</option>
                                <option value='EUR'>EUR</option>
                                <option value='CNY'>CNY</option>
                            </select>
                        </div>

                        <Button
                            type='submit'
                            className='w-full bg-blue-600 text-white transition-colors duration-300 hover:bg-blue-700'>
                            Add Product
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isToastOpen && (
                <Toast open={isToastOpen} onOpenChange={setIsToastOpen}>
                    <ToastTitle>Product Added Successfully!</ToastTitle>
                    <ToastDescription>Your product has been added to the comparison list.</ToastDescription>
                </Toast>
            )}
            <ToastViewport />
        </ToastProvider>
    );
};
