export const Category = {
    ALL: 'All',
    BALLS: 'Balls',
    DUMBBELLS: 'Dumbbells',
    MATS: 'Mats',
    ACCESSORIES: 'Accessories',
} as const;

export type Category = typeof Category[keyof typeof Category];