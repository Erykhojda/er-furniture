// utils/initializeSolidWoodFurniture.ts
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Meble z drewna litego - wysokiej jakości
const SOLID_WOOD_FURNITURE = [
    {
        name: "Dębowy Stół Jadalny",
        price: 189999,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop"
        ],
        colors: ["#8B4513", "#D2691E", "#A0522D"],
        designer: "MebleDrewniane",
        category: "dining room",
        stock: 3,
        stars: 5,
        reviews: 42,
        featured: true,
        shipping: false,
        description: "Masywny stół jadalny z drewna dębowego. Wykonany z jednego kawałka drewna litego, wiek 200 lat. Pomieści 8 osób. Olejowany naturalnie."
    },
    {
        name: "Sosnowa Komoda Rustykalna",
        price: 79999,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
        ],
        colors: ["#DEB887", "#F4A460", "#CD853F"],
        designer: "RustykalnyStyl",
        category: "bedroom",
        stock: 5,
        stars: 4,
        reviews: 67,
        featured: true,
        shipping: true,
        description: "Ręcznie wykonana komoda z drewna sosnowego. 5 szuflad z pełnym wysuwem. Naturalne suki i struktura drewna. Lakierowana bezbarwnym lakierem."
    },
    {
        name: "Bukowe Krzesło Składane",
        price: 34999,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop"
        ],
        colors: ["#F5DEB3", "#D2691E"],
        designer: "EkoMebel",
        category: "dining room",
        stock: 12,
        stars: 4,
        reviews: 89,
        featured: false,
        shipping: true,
        description: "Eleganckie krzesło z drewna bukowego. Konstrukcja na szponkach, bez gwoździ i śrub. Siedzisko z naturalnej skóry."
    },
    {
        name: "Wiśniowa Biblioteczka",
        price: 149999,
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop"
        ],
        colors: ["#8B0000", "#A0522D"],
        designer: "KlasykaDrewna",
        category: "living room",
        stock: 4,
        stars: 5,
        reviews: 23,
        featured: true,
        shipping: false,
        description: "Biblioteczka z drewna wiśniowego. 6 półek regulowanych. Wykończenie olejem wiśniowym. Ponadczasowy design w stylu klasycznym."
    },
    {
        name: "Jesionowe Biurko Sekretarzyk",
        price: 119999,
        image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
        ],
        colors: ["#F0E68C", "#BDB76B"],
        designer: "TradycyjnyRzemiosło",
        category: "office",
        stock: 7,
        stars: 5,
        reviews: 56,
        featured: true,
        shipping: true,
        description: "Sekretarzyk z drewna jesionowego. Rozkładana płyta do pisania, 8 przegródek na dokumenty. Ręcznie toczone nogi."
    },
    {
        name: "Orzechowa Ława Owalana",
        price: 89999,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
        ],
        colors: ["#8B4513", "#654321"],
        designer: "ArtDrewno",
        category: "living room",
        stock: 8,
        stars: 4,
        reviews: 34,
        featured: false,
        shipping: true,
        description: "Owalana ława z drewna orzechowego. Unikatowy rysunek słojów. Blat z jednego kawałka drewna grubość 5cm. Nogi typu kozy."
    },
    {
        name: "Lipowa Szafka Pod TV",
        price: 94999,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
        ],
        colors: ["#FFFACD", "#F0E68C"],
        designer: "NaturalneMeble",
        category: "living room",
        stock: 6,
        stars: 4,
        reviews: 78,
        featured: true,
        shipping: true,
        description: "Szafka RTV z drewna lipowego. 3 szuflady i 2 półki. Prowadnice drewniane. Uchwyt z litego dębu. Idealna pod TV do 65 cali."
    },
    {
        name: "Akacjowa Ławka Ogrodowa",
        price: 64999,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop"
        ],
        colors: ["#DEB887", "#D2691E"],
        designer: "OgrodDrewno",
        category: "garden",
        stock: 10,
        stars: 5,
        reviews: 45,
        featured: false,
        shipping: true,
        description: "Ławka ogrodowa z drewna akacjowego. Odporna na warunki atmosferyczne. Siedzisko profilowane. Bez chemicznej impregnacji."
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
        console.log(`   • Średnia cena: ${Math.round(SOLID_WOOD_FURNITURE.reduce((sum, f) => sum + f.price, 0) / SOLID_WOOD_FURNITURE.length / 100)} zł`);

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