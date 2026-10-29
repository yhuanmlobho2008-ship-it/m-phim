import { ConcessionItem } from '../types/cinema';

export const INITIAL_CONCESSIONS: ConcessionItem[] = [
  {
    id: 'conc-1',
    name: 'Royale Truffle Popcorn Combo',
    category: 'combo',
    price: 15.50,
    description: 'Fresh jumbo warm popcorn drizzled with black truffle butter, paired with two large fountain craft sodas.',
    iconName: 'Popcorn'
  },
  {
    id: 'conc-2',
    name: 'Gourmet Artisanal Caramel Popcorn',
    category: 'popcorn',
    price: 8.50,
    description: 'Slow-kettle cooked gourmet popcorn with Maldon sea salt and golden amber caramel glaze.',
    iconName: 'Sparkles'
  },
  {
    id: 'conc-3',
    name: 'Artisan Loaded Cinema Nachos',
    category: 'snack',
    price: 11.00,
    description: 'Crispy stone-ground blue and yellow corn tortilla chips, warm queso blanco, sliced jalapeños, and guacamole.',
    iconName: 'Utensils'
  },
  {
    id: 'conc-4',
    name: 'Crimson Reserve Craft Soda',
    category: 'beverage',
    price: 6.00,
    description: 'Hand-crafted blood orange & wild blackberry sparkling cane sugar soda on crushed ice.',
    iconName: 'Coffee'
  },
  {
    id: 'conc-5',
    name: 'Belgian Dark Chocolate Bites',
    category: 'snack',
    price: 7.50,
    description: 'Rich 72% cocoa dark chocolate drops infused with sea salt crystals in a movie-sharing carton.',
    iconName: 'Heart'
  },
  {
    id: 'conc-6',
    name: 'Double Classic Popcorn & Soda Duo',
    category: 'combo',
    price: 13.00,
    description: 'Classic cinema butter popcorn bucket with two fountain beverages of choice.',
    iconName: 'Box'
  }
];
