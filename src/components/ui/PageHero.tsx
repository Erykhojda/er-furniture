import React from 'react';

interface PageHeroProps {
    title: string;
    product?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, product = false }) => {
    return (
        <section className="bg-red-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl text-red-600">
                    {product && (
                        <span className="hover:text-red-700 transition-colors cursor-pointer">
                            /Produkty
                        </span>
                    )}
                    /{title}
                </h3>
            </div>
        </section>
    );
};