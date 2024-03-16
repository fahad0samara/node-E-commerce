import mongoose, { Schema, Document } from "mongoose";

// Define the category schema
interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});



// Define the product schema
interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  categories: ICategory['_id'][]; // Many-to-many relationship with categories

  stockQuantity: number;
  isNewProduct?: boolean;
  userIP: string;
  userAgent?: string;
  acceptLanguage?: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    userIP: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    acceptLanguage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Category model
const Category = mongoose.model<ICategory>("Category", categorySchema);



// Create the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export { Product, Category };
