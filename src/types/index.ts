export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    images: string[];
    colors: string[];
    designer: string;
    category: string;
    stock: number;
    stars: number;
    reviews: number;
    featured: boolean;
    shipping: boolean;
    description: string;
}

export interface CartItem {
    id: string;
    name: string;
    color: string;
    amount: number;
    image: string;
    price: number;
    max: number;
}

export interface Filters {
    searchText: string;
    designer: string;
    color: string;
    minPrice: number;
    maxPrice: number;
    price: number;
    shipping: boolean;
}

export interface CartState {
    cart: CartItem[];
    totalItems: number;
    totalAmount: number;
    shippingFee: number;
}

export type CartAction =
    | { type: 'ADD_TO_CART'; payload: { id: number; color: string; amount: number; product: Product } }
    | { type: 'REMOVE_CART_ITEM'; payload: string }
    | { type: 'TOGGLE_CART_ITEM_AMOUNT'; payload: { id: string; value: 'inc' | 'dec' } }
    | { type: 'CLEAR_CART' }
    | { type: 'COUNT_CART_TOTALS' };

export type PageType = 'home' | 'about' | 'products' | 'single-product' | 'cart' | 'login' | 'checkout' | 'contact' | 'error';