import type { CartState, CartAction } from '../types';

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const {
                id,
                selectedColor,
                selectedSize,
                selectedMaterial,
                selectedUpholstery,
                selectedExtendable,
                amount,
                product
            } = action.payload;

            const uniqueId = `${id}-${selectedColor}-${selectedSize}-${selectedMaterial || 'none'}-${selectedUpholstery || 'none'}-${selectedExtendable || 'none'}`;

            const tempItem = state.cart.find((item) => item.id === uniqueId);

            if (tempItem) {
                const tempCart = state.cart.map((cartItem) => {
                    if (cartItem.id === uniqueId) {
                        let newAmount = cartItem.amount + amount;
                        if (newAmount > cartItem.max) {
                            newAmount = cartItem.max;
                        }
                        return { ...cartItem, amount: newAmount };
                    }
                    return cartItem;
                });
                return { ...state, cart: tempCart };
            } else {
                const newItem = {
                    id: uniqueId,
                    name: product.name,
                    selectedColor,
                    selectedSize,
                    selectedMaterial,
                    selectedUpholstery,
                    selectedExtendable,
                    amount,
                    image: product.image,
                    price: product.price,
                    max: product.stock,
                };
                return { ...state, cart: [...state.cart, newItem] };
            }
        }

        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload)
            };

        case 'CLEAR_CART':
            return { ...state, cart: [] };

        case 'TOGGLE_CART_ITEM_AMOUNT': {
            const { id, value } = action.payload;
            const temporaryCart = state.cart.map((item) => {
                if (item.id === id) {
                    if (value === "inc") {
                        let newAmount = item.amount + 1;
                        if (newAmount > item.max) {
                            newAmount = item.max;
                        }
                        return { ...item, amount: newAmount };
                    }
                    if (value === "dec") {
                        let newAmount = item.amount - 1;
                        if (newAmount < 1) {
                            newAmount = 1;
                        }
                        return { ...item, amount: newAmount };
                    }
                }
                return item;
            });
            return { ...state, cart: temporaryCart };
        }

        case 'COUNT_CART_TOTALS': {
            const { totalItems, totalAmount } = state.cart.reduce(
                (total, cartItem) => {
                    const { amount, price } = cartItem;
                    total.totalItems += amount;
                    total.totalAmount += price * amount;
                    return total;
                },
                { totalItems: 0, totalAmount: 0 }
            );
            return { ...state, totalItems, totalAmount };
        }

        default:
            return state;
    }
};