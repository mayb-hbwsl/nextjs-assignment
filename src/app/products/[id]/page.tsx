import React from 'react'
import Image from 'next/image';

const Page = async({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  
  console.log(product);
  console.log(res);

  return (
    <div>
        <Image 
            src={product.image} 
            alt={product.title} 
            width={200} 
            height={200} 
        />
        <h2>{product.title}</h2>
        <p>{"₹" + product.price}</p>
        <p>{product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
        <p>{product.description}</p>
    </div>
  )
}
export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id.toString(),
  }));
}

export default Page