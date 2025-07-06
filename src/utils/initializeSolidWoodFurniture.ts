// utils/initializeSolidWoodFurniture.ts
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Meble z drewna litego - zaktualizowane według nowych wymagań
const SOLID_WOOD_FURNITURE = [
    // STOŁY
    {
        name: "Stół Natura Premium",
        price: 648800, // 6488.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop"
        ],
        material: "dąb",
        colorDrewna: "naturalny", // Dodane pole
        availableSizes: ["90x140", "100x160", "120x180", "140x200"],
        availableMaterials: ["dąb", "buk", "jesion", "orzech"],
        canExtend: false,
        category: "stoły",
        stock: 8,
        stars: 5,
        reviews: 42,
        featured: true,
        shipping: false,
        description: "Elegancki stół z litego drewna dębowego. Naturalny rysunek słojów podkreśla wyjątkowy charakter mebla. Idealne rozwiązanie do jadalni w stylu klasycznym."
    },
    {
        name: "Stół Rustic Oak Rozkładany",
        price: 725000, // 7250.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop"
        ],
        material: "dąb",
        colorDrewna: "ciemny", // Dodane pole
        availableSizes: ["120x180", "140x200", "160x220"],
        availableMaterials: ["dąb", "orzech", "wiśnia"],
        canExtend: true,
        category: "stoły",
        stock: 5,
        stars: 5,
        reviews: 67,
        featured: true,
        shipping: true,
        description: "Masywny stół rozkładany z ciemnego dębu. Konstrukcja na solidnych nogach zapewnia stabilność i trwałość na lata. Możliwość zwiększenia powierzchni o 50cm."
    },
    {
        name: "Stół Minimalist",
        price: 459000, // 4590.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop"
        ],
        material: "jesion",
        colorDrewna: "jasny", // Dodane pole
        availableSizes: ["80x120", "90x140", "100x160"],
        availableMaterials: ["jesion", "sosna", "brzoza"],
        canExtend: false,
        category: "stoły",
        stock: 12,
        stars: 4,
        reviews: 89,
        featured: false,
        shipping: true,
        description: "Minimalistyczny stół w stylu skandynawskim. Proste linie i jasne drewno jesionowe wprowadzają do wnętrza spokojną atmosferę."
    },

    // KRZESŁA
    {
        name: "Krzesło Hoya Comfort",
        price: 239000, // 2390.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
        ],
        material: "dąb",
        colorDrewna: "naturalny", // Dodane pole
        availableSizes: ["standard"],
        availableMaterials: ["dąb", "buk", "jesion"],
        availableUpholstery: ["Tokyo", "Velvet", "Skóra naturalna", "Bez tapicerki"],
        category: "krzesła",
        stock: 15,
        stars: 4,
        reviews: 89,
        featured: false,
        shipping: true,
        description: "Krzesło Hoya charakteryzuje się miękkimi, łagodnymi liniami. Duże, wyprofilowane oparcie w kształcie liścia dodaje mu wygody i charakteru."
    },
    {
        name: "Krzesło Premium Plus",
        price: 285000, // 2850.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop"
        ],
        material: "buk",
        colorDrewna: "jasny", // Dodane pole
        availableSizes: ["standard"],
        availableMaterials: ["buk", "dąb", "brzoza"],
        availableUpholstery: ["Velvet", "Tkanina wodoodporna", "Len", "Skóra naturalna"],
        category: "krzesła",
        stock: 12,
        stars: 5,
        reviews: 156,
        featured: true,
        shipping: true,
        description: "Eleganckie krzesło z drewna bukowego z tapicerką z wysokiej jakości weluru. Ergonomiczny kształt oparcia zapewnia maksymalny komfort."
    },
    {
        name: "Krzesło Vintage",
        price: 189000, // 1890.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop"
        ],
        material: "sosna",
        colorDrewna: "jasny", // Dodane pole
        availableSizes: ["standard"],
        availableMaterials: ["sosna", "brzoza"],
        availableUpholstery: ["Bez tapicerki", "Len", "Bawełna"],
        category: "krzesła",
        stock: 20,
        stars: 4,
        reviews: 67,
        featured: false,
        shipping: true,
        description: "Krzesło w stylu vintage z drewna sosnowego. Klasyczny design idealny do kuchni i jadalni w stylu rustykalnym."
    },

    // BIURKA
    {
        name: "Biurko Piko Executive",
        price: 339000, // 3390.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600&h=400&fit=crop"
        ],
        material: "jesion",
        colorDrewna: "naturalny", // Dodane pole
        availableSizes: ["60x120", "70x140", "80x160"],
        availableMaterials: ["jesion", "dąb", "buk"],
        category: "biurka",
        stock: 7,
        stars: 5,
        reviews: 56,
        featured: true,
        shipping: true,
        description: "Praktyczne biurko stworzone z myślą o ergonomii użytkowania. Wyposażone w schowki dla lepszej organizacji miejsca pracy."
    },
    {
        name: "Biurko CEO Premium",
        price: 425000, // 4250.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&h=400&fit=crop"
        ],
        material: "orzech",
        colorDrewna: "ciemny", // Dodane pole
        availableSizes: ["80x160", "90x180", "100x200"],
        availableMaterials: ["orzech", "wiśnia", "mahon"],
        category: "biurka",
        stock: 4,
        stars: 5,
        reviews: 34,
        featured: false,
        shipping: false,
        description: "Reprezentacyjne biurko z drewna orzechowego. Duża powierzchnia robocza i eleganckie wykończenie idealne do gabinetu."
    },

    // ŁÓŻKA
    {
        name: "Łóżko Kiko Elegance",
        price: 619000, // 6190.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop"
        ],
        material: "jesion",
        colorDrewna: "naturalny", // Dodane pole
        availableSizes: ["140x200", "160x200", "180x200"],
        availableMaterials: ["jesion", "dąb", "sosna"],
        availableUpholstery: ["Bez tapicerki", "Velvet", "Len"],
        category: "łóżka",
        stock: 6,
        stars: 5,
        reviews: 78,
        featured: true,
        shipping: true,
        description: "Łóżko Kiko to harmonijne połączenie subtelnej elegancji i funkcjonalności. Delikatnie pochylony zagłówek nadaje łóżku lekkości."
    },
    {
        name: "Łóżko Nordic Dream",
        price: 745000, // 7450.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop"
        ],
        material: "sosna",
        colorDrewna: "jasny", // Dodane pole
        availableSizes: ["140x200", "160x200", "180x200", "200x200"],
        availableMaterials: ["sosna", "brzoza", "jesion"],
        availableUpholstery: ["Velvet", "Len", "Bawełna", "Tkanina wodoodporna"],
        category: "łóżka",
        stock: 3,
        stars: 4,
        reviews: 45,
        featured: false,
        shipping: true,
        description: "Skandynawskie łóżko z drewna sosnowego z miękkimi poduszkami oparciowymi. Minimalistyczny design wprowadza przytulną atmosferę."
    },

    // KOMODY
    {
        name: "Komoda Vintage Style",
        price: 489000, // 4890.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop", // Dodano brakujący obraz
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop" // Dodano brakujący obraz
        ],
        material: "sosna",
        colorDrewna: "vintage", // Dodane pole
        availableSizes: ["80x40x120", "100x45x130", "120x50x140"],
        availableMaterials: ["sosna", "brzoza", "jesion"], // Dodane pole
        drawers: 5, // Zmieniono nazwę pola na angielską i typ na number
        category: "komody",
        stock: 5,
        stars: 4,
        reviews: 67,
        featured: true,
        shipping: true,
        description: "Ręcznie wykonana komoda z drewna sosnowego w stylu vintage. 5 przestronnych szuflad z pełnym wysuwem zapewnia dużo miejsca."
    },
    {
        name: "Komoda Modern",
        price: 389000, // 3890.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
        ],
        material: "dąb",
        colorDrewna: "naturalny", // Dodane pole
        availableSizes: ["90x45x130", "110x50x140"],
        availableMaterials: ["dąb", "buk", "orzech"], // Dodane pole
        drawers: 4, // Zmieniono nazwę pola na angielską i typ na number
        category: "komody",
        stock: 8,
        stars: 5,
        reviews: 92,
        featured: false,
        shipping: true,
        description: "Nowoczesna komoda z drewna dębowego. Minimalistyczny design i wysokiej jakości okucia zapewniają trwałość i elegancję."
    },

    // SZAFY
    {
        name: "Szafa Classic Premium",
        price: 895000, // 8950.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop", // Dodano brakujący obraz
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop" // Dodano brakujący obraz
        ],
        material: "wiśnia",
        colorDrewna: "ciemny", // Dodane pole
        availableSizes: ["120x200", "150x200", "180x200", "200x200"],
        availableMaterials: ["wiśnia", "orzech", "mahon"],
        doors: 2, // Zmieniono nazwę pola na angielską i typ na number
        category: "szafy",
        stock: 4,
        stars: 5,
        reviews: 23,
        featured: true,
        shipping: false,
        description: "Elegancka szafa z drewna wiśniowego w stylu klasycznym. Solidna konstrukcja i ponadczasowy design sprawią, że będzie służyć przez lata."
    },
    {
        name: "Szafa Loft Industrial",
        price: 1250000, // 12500.00 PLN w groszach
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop"
        ],
        material: "dąb",
        colorDrewna: "industrialny", // Dodane pole
        availableSizes: ["160x200", "180x200", "200x200"],
        availableMaterials: ["dąb", "jesion"],
        doors: 3, // Zmieniono nazwę pola na angielską i typ na number
        category: "szafy",
        stock: 2,
        stars: 5,
        reviews: 15,
        featured: true,
        shipping: false,
        description: "Nowoczesna szafa w stylu industrialnym. Połączenie drewna dębowego z metalowymi akcentami. Przestronna i funkcjonalna."
    }
];

// Jednorazowa funkcja inicjalizacji
export const initializeSolidWoodFurnitureOnce = async (): Promise<void> => {
    try {
        // Sprawdź czy już istnieją produkty
        const existingProducts = await getDocs(collection(db, 'products'));

        if (existingProducts.size > 0) {
            console.log('⚠️ Produkty już istnieją w bazie danych. Skrypt anulowany.');
            console.log(`📊 Aktualna liczba produktów: ${existingProducts.size}`);
            return;
        }

        console.log('🌳 Inicjalizacja mebli z drewna litego...');
        console.log(`📦 Dodawanie ${SOLID_WOOD_FURNITURE.length} produktów...`);

        const promises = SOLID_WOOD_FURNITURE.map(async (furniture, index) => {
            try {
                await addDoc(collection(db, 'products'), furniture);
                console.log(`✅ ${index + 1}/${SOLID_WOOD_FURNITURE.length} - Dodano: ${furniture.name}`);
            } catch (error) {
                console.error(`❌ Błąd dodawania ${furniture.name}:`, error);
                throw error;
            }
        });

        await Promise.all(promises);

        console.log('🎉 SUKCES! Wszystkie meble z drewna litego zostały dodane do bazy danych!');
        console.log('📊 Podsumowanie:');
        console.log(`   • Produktów dodanych: ${SOLID_WOOD_FURNITURE.length}`);
        console.log(`   • Wyróżnionych produktów: ${SOLID_WOOD_FURNITURE.filter(f => f.featured).length}`);
        console.log(`   • Średnia cena: ${Math.round(SOLID_WOOD_FURNITURE.reduce((sum, f) => sum + f.price, 0) / SOLID_WOOD_FURNITURE.length / 100)} PLN`);
        console.log(`   • Kategorie: ${[...new Set(SOLID_WOOD_FURNITURE.map(f => f.category))].join(', ')}`);

        // Oznacz że skrypt został uruchomiony
        localStorage.setItem('solidWoodFurnitureInitialized', new Date().toISOString());

    } catch (error) {
        console.error('❌ Błąd podczas inicjalizacji mebli:', error);
        throw error;
    }
};

// Sprawdź czy skrypt już był uruchomiony
export const wasSolidWoodFurnitureInitialized = (): boolean => {
    return localStorage.getItem('solidWoodFurnitureInitialized') !== null;
};

// Funkcja do wywołania w konsoli - JEDNORAZOWE UŻYCIE
export const runSolidWoodFurnitureSetup = async (): Promise<void> => {
    if (wasSolidWoodFurnitureInitialized()) {
        console.log('⚠️ Skrypt już był uruchomiony wcześniej!');
        console.log('📅 Data uruchomienia:', localStorage.getItem('solidWoodFurnitureInitialized'));

        if (confirm('Czy chcesz uruchomić skrypt ponownie?')) {
            localStorage.removeItem('solidWoodFurnitureInitialized');
            await initializeSolidWoodFurnitureOnce();
        }
    } else {
        await initializeSolidWoodFurnitureOnce();
    }
};

// Udostępnij globalnie dla konsoli
(window as any).initializeSolidWoodFurniture = runSolidWoodFurnitureSetup;