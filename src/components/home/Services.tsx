import React from 'react';

interface StatisticItem {
    number: string;
    title: string;
    description: string;
}

const statistics: StatisticItem[] = [
    {
        number: "5",
        title: "średnia ocena klientów",
        description: "nasze meble otrzymują najwyższe noty za jakość wykonania, design i trwałość od zadowolonych klientów"
    },

    {
        number: "8",
        title: "gatunków drewna",
        description: "wykorzystujemy różnorodne gatunki drewna litego: dąb, buk, jesion, orzech, wiśnia i wiele innych"
    },
    {
        number: "100%",
        title: "ręczna produkcja",
        description: "cały czas zachowujemy manufakturowy charakter naszej produkcji, posiadając własną stolarnię w Krakowie"
    },
    {
        number: "2",
        title: "lata gwarancji",
        description: "na wszystkie nasze produkty udzielamy dwuletniej gwarancji"
    }
];

export const Services: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statistics.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-4">
                                <span className="text-6xl md:text-7xl font-light text-red-300">
                                    {stat.number}
                                </span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                                {stat.title}
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed px-2">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};