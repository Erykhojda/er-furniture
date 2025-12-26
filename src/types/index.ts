export interface Product {
    id: number;
    name: string;
    price: number; // Cena w groszach (np. 648800 = 6488.00 PLN)
    image: string;
    images: string[];

    // Materiał (usunięto colorDrewna)
    material?: string;
    category: string;

    // Opcje do wyboru przy zamawianiu
    availableSizes: string[];
    availableMaterials?: string[]; // Dostępne materiały do wyboru
    availableUpholstery?: string[]; // Dostępne tapicerki
    canExtend?: boolean; // Czy można rozkładać

    // Wybory użytkownika (dodawane przy zamawianiu)
    selectedSize?: string;
    selectedColor?: string;
    selectedMaterial?: string;
    selectedUpholstery?: string;
    selectedExtendable?: boolean;

    // Parametry specyficzne dla kategorii (deprecated - zastąpione przez available*)
    wymiary?: string;
    rozkładanie?: string;
    tapicerka?: string;
    poduszki?: string;
    szuflady?: string;
    drzwi?: string;

    stock: number;
    stars: number;
    reviews: number;
    featured: boolean;
    shipping: boolean;
    description: string;
}

export interface CartItem {
    id: string;
    productId: number;
    name: string;
    selectedColor: string;
    selectedSize: string;
    selectedMaterial?: string;
    selectedUpholstery?: string;
    selectedExtendable?: boolean;
    amount: number;
    image: string;
    price: number; // Cena w groszach
    max: number;
}

export interface OrderItem {
    productName: string;
    selectedColor: string;
    selectedSize: string;
    selectedMaterial?: string;
    selectedUpholstery?: string;
    selectedExtendable?: boolean;
    quantity: number;
    unitPrice: number; // Cena w groszach
    totalPrice: number; // Cena w groszach
}

export interface Order {
    id: string;
    customerEmail: string;
    customerName: string;
    items: OrderItem[];
    totalAmount: number; // Suma w groszach
    shippingFee: number; // Koszt wysyłki w groszach
    finalAmount: number; // Końcowa kwota w groszach
    orderDate: Date;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface Filters {
    searchText: string;
    category: string;
    // Usunięto material i colorDrewna - są tylko do wyboru w szczegółach produktu
    minPrice: number;
    maxPrice: number;
    price: number;
}

export interface CartState {
    cart: CartItem[];
    totalItems: number;
    totalAmount: number; // Suma w groszach
    shippingFee: number; // Koszt wysyłki w groszach
}

export type CartAction =
    | {
        type: 'ADD_TO_CART'; payload: {
            id: number;
            selectedColor: string;
            selectedSize: string;
            amount: number;
            product: Product;
            selectedMaterial?: string;
            selectedUpholstery?: string;
            selectedExtendable?: boolean;
        }
    }
    | { type: 'REMOVE_CART_ITEM'; payload: string }
    | { type: 'TOGGLE_CART_ITEM_AMOUNT'; payload: { id: string; value: 'inc' | 'dec' } }
    | { type: 'CLEAR_CART' }
    | { type: 'COUNT_CART_TOTALS' };

export type PageType = 'home' | 'about' | 'products' | 'contact' | 'single-product' | 'cart' | 'login' | 'checkout' | 'success' | 'error';

// Dostępne kolory do wyboru przy zamawianiu
export const AVAILABLE_COLORS = [
    { name: 'Naturalny', value: '#DEB887', hex: '#DEB887' },
    { name: 'Ciemny brąz', value: '#8B4513', hex: '#8B4513' },
    { name: 'Jasny brąz', value: '#D2691E', hex: '#D2691E' },
    { name: 'Orzech', value: '#A0522D', hex: '#A0522D' },
    { name: 'Vintage', value: '#CD853F', hex: '#CD853F' },
    { name: 'Biały', value: '#F5F5DC', hex: '#F5F5DC' },
    { name: 'Czarny', value: '#2F2F2F', hex: '#2F2F2F' }
] as const;

// Dostępne materiały
export const AVAILABLE_MATERIALS = [
    'dąb',
    'buk',
    'jesion',
    'orzech',
    'wiśnia',
    'sosna',
    'brzoza',
    'mahon'
] as const;

// Dostępne tapicerki
export const AVAILABLE_UPHOLSTERY = [
    'Tokyo',
    'Velvet',
    'Skóra naturalna',
    'Tkanina wodoodporna',
    'Len',
    'Bawełna',
    'Mikrofibra',
    'Bez tapicerki'
] as const;

export type ColorOption = typeof AVAILABLE_COLORS[number];
export type MaterialOption = typeof AVAILABLE_MATERIALS[number];
export type UpholsteryOption = typeof AVAILABLE_UPHOLSTERY[number];

// Typy dla wartości kolorów
export type ColorValue = typeof AVAILABLE_COLORS[number]['value'];