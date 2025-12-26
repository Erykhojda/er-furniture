import React, { createContext, useReducer, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { ReactNode } from 'react';
import type { Product, CartItem, CartState, Filters, PageType } from '../types';
import { cartReducer } from './CartReducer';
import { auth } from '../firebase/config';
import { convertFirebaseUser, logout as firebaseLogout } from '../firebase/auth';
import { getProducts, getFeaturedProducts } from '../firebase/products';

interface User {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
}

interface AppContextType {
    // Navigation
    currentPage: PageType;
    setCurrentPage: (page: PageType) => void;
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;

    // Auth
    user: User | null;
    authLoading: boolean;
    logout: () => Promise<void>;

    // Products
    products: Product[];
    filteredProducts: Product[];
    featured: Product[];
    productsLoading: boolean;
    productsError: string | null;
    loadProducts: () => Promise<void>;

    // Views & Sorting
    gridView: boolean;
    setGridView: (view: boolean) => void;
    sort: string;
    updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    // Filters
    filters: Filters;
    updateFilters: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    clearFilters: () => void;

    // Cart
    cart: CartItem[];
    totalItems: number;
    totalAmount: number;
    shippingFee: number;
    addToCart: (
        id: number,
        selectedColor: string,
        selectedSize: string,
        amount: number,
        product: Product,
        selectedMaterial?: string,
        selectedUpholstery?: string,
        selectedExtendable?: boolean
    ) => void;
    removeItem: (id: string) => void;
    toggleAmount: (id: string, value: 'inc' | 'dec') => void;
    clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<PageType>('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [gridView, setGridView] = useState(true);
    const [sort, setSort] = useState('price-lowest');
    const [products, setProducts] = useState<Product[]>([]);
    const [featured, setFeatured] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState<string | null>(null);

    // Filters state
    const [filters, setFilters] = useState<Filters>({
        searchText: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 0,
        price: 0,
    });

    // Firebase Auth
    const [firebaseUser, authLoading] = useAuthState(auth);
    const user = firebaseUser ? convertFirebaseUser(firebaseUser) : null;

    const cartInitialState: CartState = {
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        shippingFee: 53400, // 534.00 PLN w groszach
    };

    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

    // Load products from Firebase
    const loadProducts = async () => {
        try {
            setProductsLoading(true);
            setProductsError(null);

            console.log('Loading products from Firebase...');

            const [allProducts, featuredProducts] = await Promise.all([
                getProducts(),
                getFeaturedProducts()
            ]);

            console.log('Loaded products:', allProducts.length);
            console.log('Featured products:', featuredProducts.length);

            setProducts(allProducts);
            setFeatured(featuredProducts);

        } catch (error) {
            console.error('Error loading products:', error);
            setProductsError('Failed to load products. Please check your Firebase configuration.');
        } finally {
            setProductsLoading(false);
        }
    };

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, []);

    // Filter products
    const filteredProducts = products.filter((product) => {
        const { searchText, category, price } = filters;

        // Search
        if (searchText && !product.name.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }

        // Category
        if (category !== 'all' && product.category.toLowerCase() !== category.toLowerCase()) {
            return false;
        }

        // Price
        if (price > 0 && product.price > price) {
            return false;
        }

        return true;
    });

    console.log('📊 Filters:', filters);
    console.log('📦 Total products:', products.length);
    console.log('✅ Filtered products:', filteredProducts.length);

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case 'price-lowest':
                return a.price - b.price;
            case 'price-highest':
                return b.price - a.price;
            case 'name-a':
                return a.name.localeCompare(b.name);
            case 'name-z':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    // Set max price when products load
    useEffect(() => {
        if (products.length > 0) {
            const maxPrice = Math.max(...products.map(p => p.price));
            setFilters(prev => ({ ...prev, maxPrice, price: maxPrice }));
        }
    }, [products]);

    // Count cart totals whenever cart changes
    useEffect(() => {
        cartDispatch({ type: 'COUNT_CART_TOTALS' });
    }, [cartState.cart]);

    // Auth functions
    const logout = async () => {
        try {
            await firebaseLogout();
            setCurrentPage('home');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Cart functions
    const addToCart = (
        id: number,
        selectedColor: string,
        selectedSize: string,
        amount: number,
        product: Product,
        selectedMaterial?: string,
        selectedUpholstery?: string,
        selectedExtendable?: boolean
    ) => {
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: {
                id,
                selectedColor,
                selectedSize,
                selectedMaterial,
                selectedUpholstery,
                selectedExtendable,
                amount,
                product
            }
        });
    };

    const removeItem = (id: string) => {
        cartDispatch({ type: 'REMOVE_CART_ITEM', payload: id });
    };

    const toggleAmount = (id: string, value: 'inc' | 'dec') => {
        cartDispatch({ type: 'TOGGLE_CART_ITEM_AMOUNT', payload: { id, value } });
    };

    const clearCart = () => {
        cartDispatch({ type: 'CLEAR_CART' });
    };

    // UI functions
    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const updateFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        let value: string | number | boolean = e.target.value;

        // Price jako liczba
        if (name === 'price') {
            value = Number(value);
        }

        console.log('🔍 Filter update:', name, '=', value);

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters(prev => ({
            searchText: '',
            category: 'all',
            price: prev.maxPrice,
            minPrice: prev.minPrice,
            maxPrice: prev.maxPrice,
        }));
    };

    const value: AppContextType = {
        currentPage,
        setCurrentPage,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        selectedProduct,
        setSelectedProduct,

        user,
        authLoading,
        logout,

        products,
        filteredProducts: sortedProducts,
        featured,
        productsLoading,
        productsError,
        loadProducts,

        gridView,
        setGridView,
        sort,
        updateSort,

        filters,
        updateFilters,
        clearFilters,

        ...cartState,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
export type { AppContextType };