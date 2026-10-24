// app/api/abandoned-carts/route.ts — Lists customers who have items sitting in their cart
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User, Product } from '@/lib/models';

export const dynamic = 'force-dynamic';

export interface AbandonedCartItem {
  productId: number;
  name: string;
  size: string;
  qty: number;
  price: string; // unit price, digits only (templates add the ₹)
  image?: string;
  isOutOfStock?: boolean;
}

export interface AbandonedCart {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  updatedAt: string;
  items: AbandonedCartItem[];
  total: number;
}

// Mirrors sy-couture's cart page: discountPrice wins, strip "₹" / commas
function unitPrice(p: { price: string; discountPrice?: string }): number {
  const raw = p.discountPrice || p.price || '0';
  return parseFloat(String(raw).replace(/[^0-9.]/g, '')) || 0;
}

export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find(
      { 'cart.0': { $exists: true } },
      { name: 1, email: 1, phone: 1, cart: 1, updatedAt: 1 },
    ).sort({ updatedAt: -1 }).lean();

    const productIds = Array.from(new Set(users.flatMap(u => u.cart.map(c => c.productId))));
    const products = await Product.find(
      { id: { $in: productIds } },
      { id: 1, name: 1, price: 1, discountPrice: 1, image: 1, isOutOfStock: 1 },
    ).lean();
    const productById = new Map(products.map(p => [p.id, p]));

    const carts: AbandonedCart[] = users
      .map(u => {
        // Skip cart entries whose product has since been deleted
        const items = u.cart.flatMap(c => {
          const p = productById.get(c.productId);
          if (!p) return [];
          return [{
            productId: p.id,
            name: p.name,
            size: c.size || '',
            qty: c.quantity || 1,
            price: String(unitPrice(p)),
            image: p.image,
            isOutOfStock: p.isOutOfStock,
          }];
        });
        return {
          userId: String(u._id),
          name: u.name,
          email: u.email,
          phone: u.phone,
          updatedAt: new Date(u.updatedAt).toISOString(),
          items,
          total: items.reduce((sum, i) => sum + Number(i.price) * i.qty, 0),
        };
      })
      .filter(c => c.items.length > 0 && c.email);

    return NextResponse.json({ carts });
  } catch (err: any) {
    console.error('Abandoned carts fetch error:', err);
    return NextResponse.json({ error: err.message || 'Failed to load carts' }, { status: 500 });
  }
}
