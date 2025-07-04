// firebase/products.ts
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from './config';
import type { Product } from '../types';

const COLLECTION_NAME = 'products';

// Pobierz wszystkie produkty
export const getProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkty posortowane według ceny
export const getProductsSortedByPrice = async (ascending: boolean = true): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('price', ascending ? 'asc' : 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkty posortowane według nazwy
export const getProductsSortedByName = async (ascending: boolean = true): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('name', ascending ? 'asc' : 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkt po ID
export const getProductById = async (id: string): Promise<Product | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: parseInt(docSnap.id),
            ...docSnap.data()
        } as Product;
    }

    return null;
};

// Pobierz produkty wyróżnione
export const getFeaturedProducts = async (): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('featured', '==', true),
        limit(3)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkty według kategorii
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkty według projektanta
export const getProductsByDesigner = async (designer: string): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('designer', '==', designer)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Pobierz produkty z darmową wysyłką
export const getProductsWithFreeShipping = async (): Promise<Product[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('shipping', '==', true)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    } as Product));
};

// Dodaj produkt (admin only)
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return docRef.id;
};

// Aktualizuj produkt (admin only)
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
};

// Usuń produkt (admin only)
export const deleteProduct = async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
};

// Inicjalizuj dane przykładowe (wywołaj raz)
export const initializeSampleProducts = async (): Promise<void> => {
    const sampleProducts = [
        {
            name: "Accent Chair",
            price: 25999,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop"
            ],
            colors: ["#ff0000", "#00ff00", "#0000ff"],
            designer: "marcos",
            category: "office",
            stock: 15,
            stars: 4,
            reviews: 456,
            featured: true,
            shipping: true,
            description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund."
        },
        {
            name: "Dining Table",
            price: 129999,
            image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop"
            ],
            colors: ["#00ff00", "#0000ff"],
            designer: "ikea",
            category: "kitchen",
            stock: 8,
            stars: 5,
            reviews: 189,
            featured: false,
            shipping: false,
            description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund."
        },
        {
            name: "Wooden Desk",
            price: 15999,
            image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=300&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
            ],
            colors: ["#ff0000", "#00ff00"],
            designer: "ikea",
            category: "office",
            stock: 12,
            stars: 4,
            reviews: 234,
            featured: true,
            shipping: true,
            description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund."
        },
        {
            name: "Modular Bookshelf",
            price: 89999,
            image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop"
            ],
            colors: ["#0000ff"],
            designer: "marcos",
            category: "living room",
            stock: 0,
            stars: 5,
            reviews: 67,
            featured: false,
            shipping: true,
            description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund."
        },
        {
            name: "Emperador Armchair",
            price: 179999,
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop"
            ],
            colors: ["#ff0000"],
            designer: "liddy",
            category: "living room",
            stock: 6,
            stars: 4,
            reviews: 123,
            featured: true,
            shipping: false,
            description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund."
        }
    ];

    for (const product of sampleProducts) {
        await addDoc(collection(db, COLLECTION_NAME), product);
    }

    console.log('Sample products initialized successfully!');
};