let products: any[] = [];
export async function POST(req: Request) {
  const body = await req.json();
    products.push(body);    

  console.log(body);

  return Response.json({ message: "Product received" });
}

export async function GET() {
  return Response.json(products);
}