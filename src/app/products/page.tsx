// app/products/page.tsx
import React from 'react'
import ProductCard from '../components/ProductCard';

const ProductPage = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data: any[] = await res.json();

    return (
        <main className="min-h-screen p-8 md:p-16">
            <h1 className="text-4xl font-black text-white mb-12 tracking-tighter">
                Products
            </h1>
            {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </main>
    )
}

export default ProductPage