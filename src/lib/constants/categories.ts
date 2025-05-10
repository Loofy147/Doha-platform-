// src/lib/constants/categories.ts

export const UNIQUE_PRODUCT_CATEGORIES = [
  "أزياء وإكسسوارات", // Fashion & Accessories
  "مستلزمات منزلية وديكور", // Home Goods & Decor
  "جمال وعناية شخصية", // Beauty & Wellness
  "فن ومقتنيات", // Art & Collectibles
  "حلويات ومأكولات شهية", // Sweets & Gourmet Food
  "حرف يدوية إبداعية", // Creative Handicrafts
  "منتجات للإيجار", // Rental Items
  "خدمات احترافية", // Professional Services
  "أخرى", // Other
];

// For Admin/Dashboard product creation/editing forms,
// it's good to have a list of objects if IDs are needed for backend mapping or consistency.
export const MOCK_CATEGORIES_FOR_FORMS = [
  { id: 'cat_fashion', name: 'أزياء وإكسسوارات' },
  { id: 'cat_home', name: 'مستلزمات منزلية وديكور' },
  { id: 'cat_beauty', name: 'جمال وعناية شخصية' },
  { id: 'cat_art', name: 'فن ومقتنيات' },
  { id: 'cat_food', name: 'حلويات ومأكولات شهية' },
  { id: 'cat_crafts', name: 'حرف يدوية إبداعية' },
  { id: 'cat_rental', name: 'منتجات للإيجار' },
  { id: 'cat_services', name: 'خدمات احترافية' },
  { id: 'cat_other', name: 'أخرى' },
];

export const PRODUCT_STATUSES = ['الكل', 'نشط', 'غير نشط', 'بانتظار الموافقة', 'نفذ المخزون'] as const;
export type ProductTypeConstant = 'بيع' | 'إيجار' | 'خدمة';
export const PRODUCT_TYPES_CONSTANTS: (ProductTypeConstant | 'الكل')[] = ['الكل', 'بيع', 'إيجار', 'خدمة'];

export type SortOptionConstant = 
  | 'dateAddedDesc' 
  | 'dateAddedAsc' 
  | 'nameAsc' 
  | 'nameDesc' 
  | 'priceAsc' 
  | 'priceDesc' 
  | 'stockAsc' 
  | 'stockDesc'
  | 'salesDesc'      // New: Bestsellers
  | 'ratingDesc';    // New: Top Rated

export const SORT_OPTIONS: { value: SortOptionConstant; label: string }[] = [
    { value: 'dateAddedDesc', label: 'الأحدث أولاً' },
    { value: 'dateAddedAsc', label: 'الأقدم أولاً' },
    { value: 'nameAsc', label: 'الاسم (أ-ي)' },
    { value: 'nameDesc', label: 'الاسم (ي-أ)' },
    { value: 'priceAsc', label: 'السعر (من الأقل)' },
    { value: 'priceDesc', label: 'السعر (من الأعلى)' },
    { value: 'stockAsc', label: 'المخزون (من الأقل)' },
    { value: 'stockDesc', label: 'المخزون (من الأعلى)' },
    { value: 'salesDesc', label: 'الأكثر مبيعًا' },
    { value: 'ratingDesc', label: 'الأعلى تقييمًا' },
];

```