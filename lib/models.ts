// lib/models.ts — Read-only views of the sy-couture User and Product collections.
// Only the fields the email service needs are declared; the source of truth
// for these schemas lives in sy-couture/lib/models.
import mongoose, { Schema, Model } from 'mongoose';

export interface CartUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  cart: Array<{ productId: number; quantity: number; size?: string }>;
  updatedAt: Date;
}

export interface CartProduct {
  id: number;
  name: string;
  price: string;
  discountPrice?: string;
  image: string;
  isOutOfStock?: boolean;
}

const UserSchema = new Schema<CartUser>({
  name: String,
  email: String,
  phone: String,
  cart: [{ productId: Number, quantity: Number, size: String }],
}, { timestamps: true, collection: 'users' });

const ProductSchema = new Schema<CartProduct>({
  id: Number,
  name: String,
  price: String,
  discountPrice: String,
  image: String,
  isOutOfStock: Boolean,
}, { collection: 'products' });

export const User: Model<CartUser> = mongoose.models.User || mongoose.model<CartUser>('User', UserSchema);
export const Product: Model<CartProduct> = mongoose.models.Product || mongoose.model<CartProduct>('Product', ProductSchema);
