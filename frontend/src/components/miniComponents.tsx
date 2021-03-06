import React from 'react';


export function RatingStar({rating, className}: {
                            rating:number,
                            className?: string
                        }) {
    const intPart: number = Math.floor(rating);
    const decimalPart: number = rating - intPart;
    const stars: JSX.Element[] = [];
    for (let i = 0; i < intPart; i++) {
        stars.push(<i key={i+"star"} className="fas fa-star"></i>);
    }
    if (decimalPart >= 0.75) {
        stars.push(<i key="laststar" className="fas fa-star"></i>);
    } else if (decimalPart >= 0.25) {
        stars.push(<i key="laststar" className="fas fa-star-half"></i>);
    }
    return <>
        <span className={className}>{rating.toFixed(1)}</span> <small className="text-warning">{stars}</small>
    </>;
}

export function PriceSign({priceLevel, className}: {
                           priceLevel: number,
                           className?: string
                        }) {
    return <span className={className}>{"$".repeat(priceLevel)}</span>;
}

export function OpenUntil({openingTime, className}: {
                           openingTime: string[],
                           className?: string
                        }) {
    const d = new Date().getDay();
    const time = openingTime[d];
    return <span className={className}>{time}</span>;
}