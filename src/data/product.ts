import type { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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