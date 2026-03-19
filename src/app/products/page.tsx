import React from 'react'
import ProductCard from '../components/ProductCard';

const ProductPage = async () => {
    const res1 = await fetch('https://fakestoreapi.com/products');
    const apiProducts: any[] = await res1.json();

    const res2 = await fetch('http://localhost:3000/api/products');
    const localProducts: any[] = await res2.json();

    // Combine API products with locally added products
    const allProducts = [...apiProducts, ...localProducts];

    return (
        <main className="min-h-screen p-8 md:p-16">
            <h1 className="text-4xl font-black text-white mb-12 tracking-tighter">
                Products
            </h1>
            {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {allProducts.map((item, index) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </main>
    )
}

export default ProductPage