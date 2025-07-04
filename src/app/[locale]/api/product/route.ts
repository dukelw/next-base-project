import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Áo thun" },
    { id: 2, name: "Quần jeans" },
  ];
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Đã nhận", data: body });
}
