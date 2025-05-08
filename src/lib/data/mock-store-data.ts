// src/lib/data/mock-store-data.ts

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type StoreType = 'general' | 'bakery' | 'fashion' | 'salon' | 'crafts' | 'rental' | 'service_provider';

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  dataAiHintAvatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
  itemId?: string; // Link to Product or Service ID
  storeId: string;
}


export interface Product {
  id: string;
  name: string;
  description: string; // Short description for cards
  longDescription?: string; // Detailed description for product page/modal
  price: string; // Formatted price string (e.g., "5,000 دج", "عند الطلب", "يبدأ من 200 دج/ساعة") - Primary display price
  rawPrice?: number; // Raw numeric price for sorting/calculations (for 'بيع' or base 'إيجار')
  category: string;
  type: ProductType;
  averageRating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  dataAiHint: string;
  imageSrc: string; // Primary image for cards
  images?: string[]; // Array of image URLs for product details dialog (can include imageSrc)
  sellerId: string; // To link product to a store
  storeSlug: string; // Store identifier (slug)
  sku?: string;
  tags?: string[];
  availability?: 'متوفر' | 'نفذ المخزون' | 'قريباً' | 'حسب الطلب'; // Added 'حسب الطلب'
  preparationTime?: string; // e.g., "يحتاج يومين للتجهيز"
  rentalTerms?: { // Specific to rental products
    period?: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'; // Add period here
    minDuration?: string; // e.g., "3 أيام"
    deposit?: string; // e.g., "1,000 دج"
  };
  discountPercentage?: string; // For sales
  originalPriceDisplay?: string; // For sales with discount
}

export interface Service {
  id: string;
  name: string;
  description: string; // Short description
  longDescription?: string; // Detailed description
  price: string; // Formatted display price (e.g., "5,000 دج/جلسة", "عند الطلب", "ابتداءً من 2500 دج")
  rawPrice?: number; // Raw numeric base price if applicable (e.g., for fixed price services)
  priceType?: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'; // Added priceType
  duration?: string; // e.g., "60 دقيقة", "3 جلسات"
  category: string;
  imageSrc?: string;
  dataAiHint?: string;
  type: 'خدمة'; // Ensure type is 'خدمة'
  sellerId: string;
  storeSlug: string; // Store identifier (slug)
  availability?: string; // e.g., "الحجز المسبق مطلوب", "أيام محددة"
  location?: 'عبر الإنترنت' | 'في موقع العميل' | 'في مقرنا' | string; // Allow custom string
  tags?: string[];
  averageRating?: number; // Add rating possibility for services
  reviewCount?: number; // Add review count for services
}


export interface ProductTypeCollection {
  id: ProductType | string; // Can be a generic category string too
  name: string;
}

export interface StoreData {
  id: string; // This will be the storeSlug
  name: string;
  slogan?: string;
  story?: string;
  logo: string;
  dataAiHintLogo: string;
  bannerImages: string[];
  dataAiHintBanner: string[];
  heroImages?: string[]; // Optional
  products: Product[];
  services?: Service[];
  storeType: StoreType;
  accentColor?: string;
  themeStyle?: 'light' | 'elegant' | 'playful' | 'modern-minimal' | 'dark';
  rating: number;
  reviewsCount: number;
  sellerName: string;
  sellerAvatar: string;
  dataAiHintSellerAvatar: string;
  contact: {
    phone?: string;
    email?: string;
    address?: string;
    mapLink?: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    snapchat?: string;
  };
  policies?: {
    returnPolicy?: string;
    shippingPolicy?: string;
    customPolicy?: { title: string, content: string };
  };
  productTypes: ProductTypeCollection[]; // Categories of products/services offered by the store
  openingHours?: string[];
  specialAnnouncements?: string[];
  featuredProductIds?: string[]; // IDs of products to feature on store homepage
  featuredServiceIds?: string[]; // IDs of services to feature
  reviews?: Review[]; // Add reviews to store data
}

const commonProducts: Product[] = [
  {
    id: 'common-prod1',
    name: 'مجموعة شموع معطرة فاخرة',
    description: 'ثلاث شموع يدوية الصنع بروائح تبعث على الاسترخاء.',
    longDescription: 'ثلاث شموع يدوية الصنع بروائح تبعث على الاسترخاء: لافندر، فانيليا، وخشب الصندل. مصنوعة من شمع الصويا الطبيعي وزيوت عطرية نقية. مثالية كهدية أو لإضفاء جو من الراحة في منزلك. كل شمعة تحترق لمدة تصل إلى 25 ساعة.',
    price: '3,500 دج',
    rawPrice: 3500,
    imageSrc: 'https://picsum.photos/seed/candleset/400/300',
    category: 'هدايا وديكور',
    type: 'بيع',
    averageRating: 4.8,
    reviewCount: 65,
    isNew: true,
    dataAiHint: 'scented candles gift',
    images: ['https://picsum.photos/seed/candleset/800/600', 'https://picsum.photos/seed/candlelav/800/600', 'https://picsum.photos/seed/candlevan/800/600'],
    sellerId: 'lamsa-ibdaa', // Will be overridden by the specific store
    storeSlug: 'lamsa-ibdaa', // Will be overridden
    tags: ['شموع', 'هدايا', 'ديكور', 'استرخاء', 'صويا'],
    availability: 'متوفر',
    sku: 'LD-SC-SET3-LVFS',
  },
  {
    id: 'common-prod2',
    name: 'حقيبة جلدية أنيقة',
    description: 'حقيبة يد جلد طبيعي بتصميم عصري، مثالية للاستخدام اليومي.',
    longDescription: 'حقيبة يد جلد طبيعي 100% بتصميم عصري وأنيق، مثالية للاستخدام اليومي والمناسبات. تتميز بجيوب داخلية متعددة لتنظيم أغراضك وحزام كتف قابل للتعديل والإزالة. متوفرة بألوان كلاسيكية: أسود، بني، جملي.',
    price: '8,200 دج',
    rawPrice: 8200,
    imageSrc: 'https://picsum.photos/seed/leatherbag/400/300',
    category: 'أزياء وإكسسوارات',
    type: 'بيع',
    averageRating: 4.9,
    reviewCount: 120,
    isBestseller: true,
    dataAiHint: 'leather handbag fashion',
    images: ['https://picsum.photos/seed/leatherbag/800/600', 'https://picsum.photos/seed/bagdetail/800/600', 'https://picsum.photos/seed/bagmodel/800/600'],
    sellerId: 'anaqa-lilijar', // Default, might be sold by fashion stores too
    storeSlug: 'anaqa-lilijar', // Default
    tags: ['حقيبة', 'جلد طبيعي', 'أزياء', 'نسائية', 'عملية'],
    availability: 'متوفر',
    sku: 'ANQ-HB-LTHR-BLK',
  }
];

export const mockStoreDetails: StoreData[] = [
  // Store 1: Crafts Store (Lamsa Ibdaa) - using 'lamsa-ibdaa' as ID (slug)
  {
    id: 'lamsa-ibdaa', // This is the storeSlug
    name: 'لمسة إبداع نادية',
    slogan: 'حيث تتحول الخيوط والألوان إلى فن يروي قصصًا.',
    story: 'منذ صغري وأنا أعشق الألوان وتفاصيل الحرف اليدوية. "لمسة إبداع" هي مساحتي التي أشارك فيها هذا الشغف من خلال قطع فنية فريدة مصنوعة بحب وإتقان، كل قطعة تحمل جزءًا من روحي. أهدف لإضفاء لمسة جمال وفرح على حياتكم اليومية.',
    logo: 'https://picsum.photos/seed/lamsalogo/200/100',
    dataAiHintLogo: 'crafts logo art',
    bannerImages: [
      'https://picsum.photos/seed/lamsabanner1/1200/400',
      'https://picsum.photos/seed/lamsabanner2/1200/400',
      'https://picsum.photos/seed/lamsabanner3/1200/400',
    ],
    dataAiHintBanner: ['handmade crafts display', 'artisan working studio', 'colorful textile art'],
    heroImages: ['https://picsum.photos/seed/lamsahero/1600/600', 'https://picsum.photos/seed/lamsacrafts/1600/600'],
    products: [
      ...commonProducts.filter(p => p.id === 'common-prod1').map(p => ({ ...p, sellerId: 'lamsa-ibdaa', storeSlug: 'lamsa-ibdaa' })),
      {
        id: 'lamsa-prod1',
        name: 'شال كروشيه ملون فاخر',
        description: 'شال دافئ مصنوع يدويًا بخيوط صوف عالية الجودة وألوان زاهية.',
        longDescription: 'شال دافئ مصنوع يدويًا بخيوط صوف الميرينو عالية الجودة وألوان متدرجة زاهية تناسب كل الأذواق. مثالي للأمسيات الباردة أو كإضافة أنيقة لملابسك. يمكن غسله يدويًا بلطف.',
        price: '4,800 دج',
        rawPrice: 4800,
        imageSrc: 'https://picsum.photos/seed/crochetshawl/400/300',
        category: 'أزياء وإكسسوارات يدوية',
        type: 'بيع',
        averageRating: 4.7,
        reviewCount: 30,
        isNew: true,
        dataAiHint: 'crochet shawl colorful',
        images: ['https://picsum.photos/seed/crochetshawl/800/600', 'https://picsum.photos/seed/shawldetail/800/600', 'https://picsum.photos/seed/shawlmodel/800/600'],
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['كروشيه', 'شال', 'صوف', 'يدوي', 'أزياء'],
        availability: 'متوفر',
        sku: 'LD-SHWL-CRCHT-MLT',
      },
      {
        id: 'lamsa-prod2',
        name: 'مجموعة دُمى أميغورومي لطيفة',
        description: 'دُمى كروشيه محببة للأطفال، مصنوعة بدقة من خيوط قطنية آمنة.',
        longDescription: 'دُمى كروشيه محببة للأطفال، مصنوعة بدقة من خيوط قطنية 100% آمنة وناعمة. تصميمات متنوعة لشخصيات حيوانات (أرنب، دب، قطة) ودمى كلاسيكية. هدية مثالية للصغار ويمكن غسلها.',
        price: '2,500 دج للقطعة',
        rawPrice: 2500,
        imageSrc: 'https://picsum.photos/seed/amigurumi/400/300',
        category: 'ألعاب وهدايا يدوية',
        type: 'بيع',
        isBestseller: true,
        dataAiHint: 'amigurumi dolls handmade',
        images: ['https://picsum.photos/seed/amigurumi/800/600', 'https://picsum.photos/seed/dollgroup/800/600', 'https://picsum.photos/seed/dollplay/800/600'],
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['أميغورومي', 'دمى', 'كروشيه', 'أطفال', 'هدايا', 'قطن'],
        availability: 'متوفر',
        sku: 'LD-TOY-AMIG-VAR',
      },
       {
        id: 'lamsa-prod3',
        name: 'لوحة فنية مرسومة يدويًا "أزهار الربيع"',
        description: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة.',
        longDescription: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة وانطلاق الحياة، مثالية لتزيين منزلك أو مكتبك وإضفاء لمسة من البهجة. مقاس 50x70 سم. إطار خشبي متين وجاهزة للتعليق.',
        price: '7,200 دج',
        rawPrice: 7200,
        imageSrc: 'https://picsum.photos/seed/springflowersart/400/300',
        category: 'فن وديكور يدوي',
        type: 'بيع',
        dataAiHint: 'spring flowers painting',
        images: ['https://picsum.photos/seed/springflowersart/800/600', 'https://picsum.photos/seed/artdetail1/800/600'],
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['لوحة زيتية', 'فن تجريدي', 'ديكور', 'أزهار', 'ربيع'],
        availability: 'متوفر',
        sku: 'LD-ART-OIL-SPRFL',
      },
       {
        id: 'lamsa-prod4', // Added previously for seller dashboard
        name: 'مفرش طاولة كروشيه دائري',
        description: 'مفرش طاولة دائري أنيق مصنوع بدقة بالكروشيه.',
        longDescription: 'مفرش طاولة دائري أنيق مصنوع بدقة بالكروشيه، يضفي لمسة تقليدية ودافئة على ديكور منزلك. قطر 60 سم. لون بيج طبيعي.',
        price: '2,800 دج',
        rawPrice: 2800,
        imageSrc: 'https://picsum.photos/seed/crochettablecloth/200/200',
        category: 'مستلزمات منزلية وديكور',
        type: 'بيع',
        dataAiHint: 'crochet tablecloth round',
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['كروشيه', 'مفرش طاولة', 'ديكور', 'يدوي'],
        availability: 'متوفر',
        sku: 'LD-TBL-CRCHT-RND60',
      },
       {
        id: 'lamsa-prod5', // Added previously for seller dashboard
        name: 'حقيبة يد كروشيه عملية',
        description: 'حقيبة يد كروشيه عملية وأنيقة، مثالية للاستخدام اليومي.',
        longDescription: 'حقيبة يد كروشيه عملية وأنيقة، مثالية للاستخدام اليومي. مبطنة من الداخل وبحزام كتف مريح وقابل للتعديل. لون أزرق داكن.',
        price: '3,200 دج',
        rawPrice: 3200,
        imageSrc: 'https://picsum.photos/seed/crochetbag/200/200',
        dataAiHint: 'crochet handbag blue',
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['حقيبة', 'كروشيه', 'يدوي', 'أزياء'],
        availability: 'نفذ المخزون', // Example of out of stock
        sku: 'LD-BAG-CRCHT-NVY',
      },
    ],
    services: [
      {
        id: 'lamsa-serv1',
        name: 'ورشة تعليم أساسيات الكروشيه',
        description: 'تعلمي فن الكروشيه من الصفر في ورشة تفاعلية وممتعة.',
        longDescription: 'انضمي إلى ورشتنا لتعلم أساسيات فن الكروشيه، من اختيار الخيوط والإبر إلى تنفيذ الغرز الأساسية وصنع قطعة بسيطة (مثل كوستر أو مربع صغير). الورشة مناسبة للمبتدئات تمامًا، وتتضمن جميع المواد وكوب قهوة!',
        price: '3,000 دج للشخص',
        rawPrice: 3000,
        priceType: 'ثابت',
        duration: '3 ساعات',
        category: 'ورش عمل فنية',
        type: 'خدمة',
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        imageSrc: 'https://picsum.photos/seed/crochetworkshop/400/300',
        dataAiHint: 'crochet workshop beginner',
        availability: 'الحجز المسبق مطلوب - تعقد في أول سبت من كل شهر',
        location: 'في مقرنا',
        tags: ['ورشة عمل', 'كروشيه', 'تعليم', 'حرف يدوية', 'مبتدئين'],
        averageRating: 4.9,
        reviewCount: 15,
      },
       {
        id: 'lamsa-serv2', // Added previously for seller dashboard
        name: 'تصميم شعار يدوي لعلامة تجارية',
        description: 'خدمة تصميم شعار فريد بلمسة فنية يدوية (رقمي أو مرسوم).',
        longDescription: 'هل تبحثين عن شعار فريد يعبر عن علامتك التجارية؟ نقدم خدمة تصميم شعارات بلمسة فنية يدوية تمزج بين الأصالة والإبداع. سيتم تصميم الشعار بناءً على رؤيتك ومتطلباتك، مع تقديم 3 نماذج أولية ومراجعتين. النسخة النهائية رقمية.',
        price: 'ابتداءً من 15,000 دج',
        rawPrice: 15000,
        priceType: 'بالمشروع',
        duration: '3-5 أيام عمل',
        category: 'خدمات تصميم إبداعية',
        type: 'خدمة',
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        imageSrc: 'https://picsum.photos/seed/logodesigncraft/200/200',
        dataAiHint: 'logo design handmade',
        availability: 'حسب الطلب',
        location: 'عبر الإنترنت',
        tags: ['تصميم شعار', 'علامة تجارية', 'يدوي', 'خدمة', 'تصميم جرافيك'],
      }
    ],
    storeType: 'crafts',
    accentColor: 'hsl(var(--accent-purple))', // Purple for crafts
    themeStyle: 'playful',
    rating: 4.8,
    reviewsCount: 195, // Sum of product/service reviews
    sellerName: 'نادية كريم',
    sellerAvatar: 'https://picsum.photos/seed/nadia/100/100',
    dataAiHintSellerAvatar: 'woman artist smiling',
    contact: {
      email: 'nadia.crafts@lamsadoha.com',
      address: 'ورشة لمسة إبداع، الجزائر العاصمة',
      phone: '+213 555 001 002'
    },
    socialMedia: { instagram: 'nadia_crafts_dz', facebook: 'NadiaHandmadeCrafts' },
    policies: { returnPolicy: 'يمكن إرجاع المنتجات الجاهزة خلال 7 أيام بحالتها الأصلية، باستثناء الطلبات المخصصة. الخدمات غير قابلة للاسترداد بعد تقديمها.', shippingPolicy: 'الشحن لجميع الولايات، التكلفة حسب المنطقة. الاستلام من الورشة متاح بالتنسيق.' },
    productTypes: [{id: 'بيع', name: 'إبداعات يدوية للبيع'}, {id: 'خدمة', name: 'ورش عمل وخدمات تصميم'}],
    openingHours: ['الطلبات عبر الإنترنت: 24/7', 'الورشة (للاستلام والورش): السبت - الخميس (10ص - 5م)'],
    specialAnnouncements: ['تخفيضات الربيع على جميع الشالات! 15% خصم إضافي.', 'ورشة عمل جديدة لتعليم أساسيات الكروشيه، سارعوا بالتسجيل!'],
    featuredProductIds: ['lamsa-prod1', 'lamsa-prod2', 'common-prod1'],
    featuredServiceIds: ['lamsa-serv1'],
    reviews: [
      { id: 'r1', authorName: 'أميرة ب.', rating: 5, comment: 'منتجات رائعة وجودة ممتازة! الشال دافئ جدًا والألوان كما في الصورة تمامًا.', date: '2024-05-12T10:00:00Z', itemId: 'lamsa-prod1', storeId: 'lamsa-ibdaa'},
      { id: 'r2', authorName: 'سلوى م.', rating: 5, comment: 'الدمية جميلة جدًا وابنتي أحبتها كثيرًا! الخيوط ناعمة وآمنة.', date: '2024-05-10T14:30:00Z', itemId: 'lamsa-prod2', storeId: 'lamsa-ibdaa'},
      { id: 'r3', authorName: 'ريم أ.', rating: 4, comment: 'الورشة كانت مفيدة وممتعة، تعلمت الأساسيات بشكل جيد. المدربة متعاونة جدًا.', date: '2024-05-08T18:00:00Z', itemId: 'lamsa-serv1', storeId: 'lamsa-ibdaa'},
    ]
  },

  // Store 2: Bakery Store (Mathaq AlBayt) - using 'mathaq-albayt' as ID (slug)
  {
    id: 'mathaq-albayt', // This is the storeSlug
    name: 'مذاق البيت مع سارة',
    slogan: 'حلويات تقليدية وعصرية تُحضّر بحب وجودة تليق بكم.',
    story: 'ورثت حب الطهي والحلويات من جدتي، وأضفت إليه لمستي الخاصة. في "مذاق البيت"، أقدم لكم أشهى الحلويات المصنوعة من أجود المكونات الطبيعية، كأنها أُعدت في منزلكم. كل قطعة هي دعوة لتذوق السعادة.',
    logo: 'https://picsum.photos/seed/mathaqlogo/200/100',
    dataAiHintLogo: 'bakery logo cakes',
    bannerImages: [
      'https://picsum.photos/seed/mathaqbanner1/1200/400',
      'https://picsum.photos/seed/mathaqbanner2/1200/400',
      'https://picsum.photos/seed/pastrychef/1200/400',
    ],
    dataAiHintBanner: ['assorted pastries display', 'baker decorating cake', 'pastry chef action'],
    heroImages: ['https://picsum.photos/seed/mathaqhero/1600/600', 'https://picsum.photos/seed/bakerydisplay/1600/600'],
    products: [
      {
        id: 'mathaq-prod1',
        name: 'كيكة العسل الروسية الأصلية',
        description: 'طبقات رقيقة من كيك العسل مع كريمة الزبدة الغنية، تحفة فنية.',
        longDescription: 'طبقات رقيقة متعددة من كيك العسل الرقيق مع كريمة الزبدة الغنية والقشطة، تحفة فنية تذوب في الفم. مثالية للمناسبات الخاصة والاحتفالات العائلية. تكفي 8-10 أشخاص.',
        price: '6,000 دج',
        originalPriceDisplay: '6,500 دج', // Example for deal display
        discountPercentage: '8', // Example discount
        rawPrice: 6000,
        imageSrc: 'https://picsum.photos/seed/honeycake/400/300',
        category: 'كيك ومناسبات',
        type: 'بيع',
        averageRating: 4.9,
        reviewCount: 85,
        isBestseller: true,
        dataAiHint: 'russian honey cake',
        images: ['https://picsum.photos/seed/honeycake/800/600', 'https://picsum.photos/seed/honeycakeslice/800/600', 'https://picsum.photos/seed/honeycaketop/800/600'],
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        tags: ['كيك', 'عسل', 'روسي', 'مناسبات', 'حلويات فاخرة'],
        availability: 'متوفر',
        preparationTime: 'يحتاج يوم للتجهيز',
        sku: 'MB-CK-HNY-RU',
      },
      {
        id: 'mathaq-prod2',
        name: 'علبة معمول مشكل فاخر',
        description: 'معمول هش بالتمر والجوز والفستق، محضر على الأصول وبنكهات لا تقاوم.',
        longDescription: 'معمول هش بالتمر والجوز والفستق، محضر على الأصول باستخدام السمن البلدي وبنكهات لا تقاوم. مثالي للتقديم مع القهوة أو كهدية قيمة. العلبة تحتوي على 24 قطعة مشكلة بعناية.',
        price: '3,200 دج',
        rawPrice: 3200,
        imageSrc: 'https://picsum.photos/seed/maamoulbox/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        dataAiHint: 'assorted maamoul cookies',
        images: ['https://picsum.photos/seed/maamoulbox/800/600', 'https://picsum.photos/seed/maamoulcloseup/800/600', 'https://picsum.photos/seed/maamoulplate/800/600'],
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        tags: ['معمول', 'تمر', 'جوز', 'فستق', 'حلويات عربية', 'عيد'],
        availability: 'متوفر',
        sku: 'MB-SWT-MML-MIX24',
      },
       {
        id: 'mathaq-prod3',
        name: 'صينية بقلاوة مشكلة',
        description: 'بقلاوة مقرمشة وغنية بالمكسرات والعسل، تحضر يوميًا لضمان الطعم الطازج.',
        longDescription: 'بقلاوة مقرمشة بطبقات رقيقة وغنية بالمكسرات الطازجة (فستق، جوز، لوز) والعسل الصافي، تحضر يوميًا لضمان الطعم الطازج. تشكيلة متنوعة من أصابع البقلاوة وعش البلبل. الوزن الصافي حوالي 1 كغ.',
        price: '4,500 دج',
        rawPrice: 4500,
        imageSrc: 'https://picsum.photos/seed/baklavatray/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        isNew: true,
        dataAiHint: 'baklava tray assorted',
        images: ['https://picsum.photos/seed/baklavatray/800/600', 'https://picsum.photos/seed/baklavaclose/800/600'],
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        tags: ['بقلاوة', 'مكسرات', 'عسل', 'حلويات تقليدية', 'صينية'],
        availability: 'متوفر',
        sku: 'MB-SWT-BKLV-MIX1KG',
      }
    ],
    services: [
        {
        id: 'mathaq-serv1',
        name: 'ورشة تزيين الكيك للمبتدئات',
        description: 'تعلمي أساسيات وفنون تزيين الكيك في ورشة عملية وممتعة.',
        longDescription: 'تعلمي أساسيات وفنون تزيين الكيك (الكريمة، عجينة السكر) في ورشة عملية وممتعة، واصنعي كيكتك الخاصة. تشمل الورشة جميع الأدوات والمواد اللازمة، بالإضافة إلى كتيب تعليمي ووصفات مجربة.',
        price: '7,500 دج للشخص',
        rawPrice: 7500,
        priceType: 'ثابت',
        duration: '4 ساعات',
        category: 'ورش عمل تعليمية',
        type: 'خدمة',
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        imageSrc: 'https://picsum.photos/seed/cakeworkshop/400/300',
        dataAiHint: 'cake decorating workshop',
        availability: 'تُعقد شهريًا، الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['ورشة عمل', 'تزيين كيك', 'تعليم', 'حلويات', 'فوندان'],
        averageRating: 5.0,
        reviewCount: 12,
      }
    ],
    storeType: 'bakery',
    accentColor: 'hsl(35, 85%, 60%)', // Warm Orange for bakery
    themeStyle: 'light', // Example theme style
    rating: 4.9,
    reviewsCount: 307, // Sum of product/service reviews
    sellerName: 'سارة عبدالله',
    sellerAvatar: 'https://picsum.photos/seed/sara/100/100',
    dataAiHintSellerAvatar: 'woman baker smiling',
    contact: {
      phone: '+213 555 123 457',
      email: 'sara.sweets@lamsadoha.com',
      address: 'مطبخ مذاق البيت، وهران',
    },
    socialMedia: { facebook: 'MathaqAlBaytBySara', instagram: 'mathaq_albayt' },
    policies: { shippingPolicy: 'التوصيل داخل وهران خلال 24-48 ساعة. يمكن الاستلام من المطبخ بالموعد المحدد.', customPolicy: {title: 'سياسة الطلبات الخاصة', content:'نستقبل الطلبات الخاصة للكيك والمناسبات قبل 3 أيام على الأقل. دفعة مقدمة قد تكون مطلوبة. يرجى التواصل للتفاصيل.'} },
    productTypes: [
      {id: 'بيع', name: 'أشهى الحلويات والمخبوزات'},
      {id: 'خدمة', name: 'ورش عمل وتجهيز مناسبات'}
    ],
    openingHours: ['الطلبات: 9ص - 6م (يوميًا عدا الجمعة)', 'استلام الطلبات الخاصة: بالتنسيق المسبق'],
    specialAnnouncements: ['جديدنا: تشكيلة كب كيك العيد متوفرة الآن!', 'خصم 10% على طلبات الكيك التي تزيد عن 10,000 دج هذا الأسبوع.'],
    featuredProductIds: ['mathaq-prod1', 'mathaq-prod2', 'mathaq-prod3'],
    featuredServiceIds: ['mathaq-serv1'],
    reviews: [
        { id: 'r4', authorName: 'فاطمة الزهراء', rating: 5, comment: 'كيكة العسل أكثر من رائعة! طعم خرافي وقوام مثالي. أفضل كيكة عسل ذقتها.', date: '2024-05-14T11:00:00Z', itemId: 'mathaq-prod1', storeId: 'mathaq-albayt' },
        { id: 'r5', authorName: 'هند ق.', rating: 5, comment: 'المعمول يذوب في الفم، تشكيلة ممتازة والتغليف أنيق جدًا.', date: '2024-05-11T09:20:00Z', itemId: 'mathaq-prod2', storeId: 'mathaq-albayt' },
        { id: 'r6', authorName: 'أسماء ل.', rating: 5, comment: 'ورشة تزيين الكيك كانت رائعة ومفيدة جدًا! شكرًا لكِ سارة على الشرح الوافي والصبر.', date: '2024-05-07T15:00:00Z', itemId: 'mathaq-serv1', storeId: 'mathaq-albayt' },
    ]
  },

  // Store 3: Fashion Rental (Anaqa Lilijar) - using 'anaqa-lilijar' as ID (slug)
  {
    id: 'anaqa-lilijar', // This is the storeSlug
    name: 'أناقة للإيجار مع ليلى',
    slogan: 'فساتين سهرة وعبايات فاخرة لمناسباتكِ التي لا تُنسى.',
    story: 'أؤمن بأن كل امرأة تستحق أن تتألق في مناسباتها الخاصة دون الحاجة لإنفاق الكثير. "أناقة للإيجار" يوفر لكِ تشكيلة متنوعة من فساتين السهرة والعبايات الراقية بتصاميم عصرية وكلاسيكية. مهمتنا هي أن نجعلكِ تشعرين بالثقة والجمال في كل خطوة.',
    logo: 'https://picsum.photos/seed/anaqalogo/200/100',
    dataAiHintLogo: 'fashion rental logo elegant',
    bannerImages: [
      'https://picsum.photos/seed/anaqabanner1/1200/400',
      'https://picsum.photos/seed/anaqabanner2/1200/400',
      'https://picsum.photos/seed/dressesrack/1200/400',
    ],
    dataAiHintBanner: ['evening gowns display', 'luxury abayas collection', 'dresses rack boutique'],
    heroImages: ['https://picsum.photos/seed/anaqahero/1600/600', 'https://picsum.photos/seed/fashionmodelhero/1600/600'],
    products: [
       ...commonProducts.filter(p => p.id === 'common-prod2').map(p => ({ ...p, sellerId: 'anaqa-lilijar', storeSlug: 'anaqa-lilijar' })),
      {
        id: 'anaqa-prod1',
        name: 'فستان سهرة ذهبي مطرز فاخر',
        description: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بالترتر الذهبي.',
        longDescription: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بالترتر الذهبي، مثالي للسهرات الفخمة وحفلات الزفاف. يأتي مع شال مطابق. خدمة التعديل البسيط متوفرة (لا يشمل التقصير الدائم).',
        price: '12,000 دج / 3 أيام', // Adjusted display price
        rawPrice: 12000, // Base price for the period
        imageSrc: 'https://picsum.photos/seed/golddress/400/300',
        category: 'فساتين سهرة راقية',
        type: 'إيجار',
        isBestseller: true,
        dataAiHint: 'gold sequin dress elegant',
        images: ['https://picsum.photos/seed/golddress/800/600', 'https://picsum.photos/seed/golddetail/800/600', 'https://picsum.photos/seed/goldmodel/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['فستان سهرة', 'ذهبي', 'مطرز', 'إيجار', 'زفاف', 'حورية البحر'],
        availability: 'الحجز المسبق مطلوب',
        rentalTerms: { period: 'مناسبة', minDuration: "3 أيام", deposit: "5,000 دج" },
        sku: 'ANQ-DRS-GLDSEQ-RENT',
      },
      {
        id: 'anaqa-prod2',
        name: 'عباءة سوداء بتطريز فضي يدوي',
        description: 'عباءة خليجية فاخرة من قماش الكريب الأصلي، بتطريز يدوي متقن.',
        longDescription: 'عباءة خليجية فاخرة من قماش الكريب الأصلي، بتطريز يدوي متقن بالخيوط الفضية على الأكمام والأطراف. تصميم أنيق وعملي يناسب مختلف المناسبات. متوفرة للإيجار الأسبوعي.',
        price: '7,000 دج / أسبوع',
        rawPrice: 7000,
        imageSrc: 'https://picsum.photos/seed/blackabaya/400/300',
        category: 'عبايات وقفاطين فاخرة',
        type: 'إيجار',
        dataAiHint: 'black abaya silver embroidery',
        images: ['https://picsum.photos/seed/blackabaya/800/600', 'https://picsum.photos/seed/abayadetail/800/600', 'https://picsum.photos/seed/abayamodel/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['عباءة', 'سوداء', 'تطريز فضي', 'إيجار', 'خليجي', 'كريب'],
        availability: 'متوفر',
        rentalTerms: { period: 'أسبوع', minDuration: "7 أيام", deposit: "3,000 دج" },
        sku: 'ANQ-ABY-BLKSLV-RENT',
      },
       {
        id: 'anaqa-prod3',
        name: 'قفطان مغربي تقليدي أخضر ملكي',
        description: 'قفطان أصيل بتصميم تراثي فاخر، مصنوع من المخمل ومطرز.',
        longDescription: 'قفطان أصيل بتصميم تراثي فاخر، مصنوع من المخمل الأخضر الملكي ومطرز بخيوط ذهبية، مثالي للمناسبات التقليدية والأعياد. يأتي مع حزام مطابق (مضمة).',
        price: '9,500 دج / 3 أيام',
        rawPrice: 9500,
        imageSrc: 'https://picsum.photos/seed/greencaftan/400/300',
        category: 'عبايات وقفاطين فاخرة',
        type: 'إيجار',
        dataAiHint: 'green moroccan caftan',
        images: ['https://picsum.photos/seed/greencaftan/800/600', 'https://picsum.photos/seed/caftandetail/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['قفطان', 'مغربي', 'أخضر', 'إيجار', 'تقليدي', 'مخمل'],
        availability: 'الحجز المسبق مطلوب',
        rentalTerms: { period: 'مناسبة', minDuration: "3 أيام", deposit: "4,000 دج" },
        sku: 'ANQ-CFTN-GRNVLV-RENT',
      },
    ],
    storeType: 'fashion', // Or 'rental'
    accentColor: 'hsl(var(--accent-pink))', // Pink for fashion/rental
    themeStyle: 'elegant', // Example theme
    rating: 4.7,
    reviewsCount: 215, // Sum of product reviews
    sellerName: 'ليلى الشريف',
    sellerAvatar: 'https://picsum.photos/seed/laila/100/100',
    dataAiHintSellerAvatar: 'woman fashion designer stylish',
    contact: {
      email: 'laila.fashion@lamsadoha.com',
      phone: '+213 660 112 233',
      address: 'بوتيك أناقة للإيجار، حي الرياض، الجزائر',
    },
    socialMedia: { instagram: 'anaqa_lilijar', snapchat: 'anaqa_rental'},
    policies: { returnPolicy: 'يجب إعادة القطع بنفس الحالة التي استلمت بها خلال 24 ساعة من انتهاء مدة الإيجار. يتم خصم مبلغ التأمين في حال وجود تلف كبير.', shippingPolicy: 'الاستلام والتسليم من البوتيك. خدمة توصيل خاصة متوفرة بتكلفة إضافية حسب المنطقة والتنسيق المسبق.' },
    productTypes: [{id: 'إيجار', name: 'أزياء راقية للإيجار'}, {id: 'بيع', name: 'إكسسوارات مكملة'}],
    openingHours: ['السبت - الخميس: 11ص - 8م (بموعد مسبق للمعاينة)'],
    specialAnnouncements: ['وصلت تشكيلة جديدة من فساتين السهرة لموسم الصيف! احجزي موعدك للمعاينة.', 'خصم خاص على إيجار قطعتين أو أكثر.'],
    featuredProductIds: ['anaqa-prod1', 'anaqa-prod2', 'common-prod2'],
    reviews: [
        { id: 'r7', authorName: 'نورة س.', rating: 5, comment: 'الفستان كان مذهلاً! الجميع سألني عنه. الخدمة ممتازة والتسليم كان في الموعد.', date: '2024-05-13T19:00:00Z', itemId: 'anaqa-prod1', storeId: 'anaqa-lilijar' },
        { id: 'r8', authorName: 'جميلة ع.', rating: 4, comment: 'العباءة جميلة جدًا والتطريز دقيق، لكن تمنيت لو كان هناك خيارات ألوان أخرى.', date: '2024-05-09T12:15:00Z', itemId: 'anaqa-prod2', storeId: 'anaqa-lilijar' },
    ]
  },

  // Store 4: Beauty Salon (Salon Farah) - using 'salon-farah' as ID (slug)
  {
    id: 'salon-farah', // This is the storeSlug
    name: 'صالون فرح للتجميل والعناية',
    slogan: 'جمالك يبدأ من هنا... عناية فائقة ولمسات احترافية تبرز تألقك.',
    story: 'في صالون فرح، نؤمن بأن الجمال الحقيقي ينبع من الثقة بالنفس. فريقنا من الخبيرات مستعد لتقديم أفضل خدمات العناية بالشعر، البشرة، والمكياج لتبرزي أجمل ما فيكِ في جو من الراحة والاسترخاء. نستخدم منتجات عالية الجودة ونهتم بأدق التفاصيل لضمان رضاكِ التام.',
    logo: 'https://picsum.photos/seed/salonfarahlogo/200/100',
    dataAiHintLogo: 'beauty salon logo modern',
    bannerImages: [
      'https://picsum.photos/seed/salonfarahbanner1/1200/400',
      'https://picsum.photos/seed/salonfarahbanner2/1200/400',
      'https://picsum.photos/seed/beautytreatment/1200/400',
    ],
    dataAiHintBanner: ['modern salon interior luxury', 'woman getting hair treatment spa', 'beauty products display spa'],
    heroImages: ['https://picsum.photos/seed/salonfarahhero/1600/600', 'https://picsum.photos/seed/salonrelax/1600/600'],
    products: [
        {
            id: 'farah-prod1',
            name: 'زيت الأرغان المغربي النقي للعناية بالشعر',
            description: 'زيت أرغان عضوي 100% لترطيب وتغذية الشعر الجاف والتالف.',
            longDescription: 'زيت أرغان مغربي أصلي عضوي 100% ومعصور على البارد لترطيب وتغذية الشعر الجاف والتالف، يعيد اللمعان والحيوية ويقلل التقصف. يمكن استخدامه كبلسم يترك على الشعر أو كعلاج قبل الاستحمام. 50 مل.',
            price: '2,800 دج',
            rawPrice: 2800,
            imageSrc: 'https://picsum.photos/seed/arganoilhair/400/300',
            category: 'منتجات عناية بالشعر',
            type: 'بيع',
            isBestseller: true,
            dataAiHint: 'argan oil hair product',
            images: ['https://picsum.photos/seed/arganoilhair/800/600', 'https://picsum.photos/seed/arganbottle/800/600'],
            sellerId: 'salon-farah',
            storeSlug: 'salon-farah',
            tags: ['زيت أرغان', 'عناية بالشعر', 'عضوي', 'ترطيب', 'مغربي'],
            availability: 'متوفر',
            sku: 'SF-HAIR-OIL-ARG50',
        },
        {
            id: 'farah-prod2',
            name: 'ماسك الذهب والكولاجين لنضارة البشرة',
            description: 'ماسك فاخر لشد البشرة، تقليل التجاعيد، وإعطاء إشراقة فورية.',
            longDescription: 'ماسك فاخر غني بجزيئات الذهب عيار 24 والكولاجين البحري، يعمل على شد البشرة، تقليل التجاعيد، وتحفيز تجديد الخلايا لإعطاء إشراقة فورية. مثالي قبل المناسبات. للاستخدام مرة أسبوعيًا. 50 جرام.',
            price: '4,500 دج',
            rawPrice: 4500,
            imageSrc: 'https://picsum.photos/seed/goldmask/400/300',
            category: 'منتجات عناية بالبشرة',
            type: 'بيع',
            dataAiHint: 'gold collagen face mask',
            images: ['https://picsum.photos/seed/goldmask/800/600', 'https://picsum.photos/seed/masktexture/800/600'],
            sellerId: 'salon-farah',
            storeSlug: 'salon-farah',
            tags: ['ماسك ذهب', 'كولاجين', 'عناية بالبشرة', 'مكافحة الشيخوخة', 'نضارة'],
            availability: 'متوفر',
            sku: 'SF-SKIN-MSK-GLDCOL50',
        }
    ],
    services: [
      {
        id: 'farah-serv1',
        name: 'قص وتصفيف شعر احترافي عصري',
        description: 'نقدم أحدث قصات الشعر التي تناسب شكل وجهك ونوع شعرك.',
        longDescription: 'نقدم أحدث قصات الشعر التي تناسب شكل وجهك ونوع شعرك، مع تصفيف متقن يدوم طويلاً ويبرز جمالك الطبيعي. يشمل الاستشارة، الغسيل الفاخر، والقص الدقيق، والتصفيف النهائي (سيشوار أو تجعيد خفيف).',
        price: 'ابتداءً من 2,500 دج',
        rawPrice: 2500, // Starting price
        priceType: 'حسب_الطلب', // Price varies
        duration: '60-90 دقيقة',
        category: 'خدمات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/haircutstyle/400/300',
        dataAiHint: 'haircut styling salon professional',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['قص شعر', 'تصفيف', 'صبغة', 'صالون نسائي', 'ستايل'],
        averageRating: 4.9,
        reviewCount: 75,
      },
      {
        id: 'farah-serv2',
        name: 'علاج بروتين وكيراتين للشعر التالف',
        description: 'أعيدي الحيوية واللمعان والنعومة لشعرك مع علاجاتنا المتخصصة.',
        longDescription: 'أعيدي الحيوية واللمعان والنعومة لشعرك مع علاجاتنا المتخصصة بالبروتين والكيراتين البرازيلي الأصلي التي تصلح التلف وتقوي الخصلات من الجذور. نتائج تدوم طويلاً ومظهر صحي وجذاب.',
        price: '9,000 - 18,000 دج', // Price range
        rawPrice: 9000, // Starting price
        priceType: 'حسب_الطلب', // Depends on hair
        duration: '2-3.5 ساعات',
        category: 'علاجات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
         imageSrc: 'https://picsum.photos/seed/hairprotein/400/300',
        dataAiHint: 'hair protein keratin treatment',
        availability: 'يتطلب استشارة مسبقة',
        location: 'في مقرنا',
        tags: ['بروتين شعر', 'كيراتين', 'علاج الشعر', 'شعر تالف', 'نعومة'],
        averageRating: 4.8,
        reviewCount: 55,
      },
      {
        id: 'farah-serv3',
        name: 'مكياج سهرة متكامل بأنامل خبيرة',
        description: 'إطلالة ساحرة لمناسباتك الخاصة مع مكياج سهرة احترافي.',
        longDescription: 'إطلالة ساحرة لمناسباتك الخاصة مع مكياج سهرة احترافي يبرز جمال ملامحك ويناسب إطلالتك بالكامل (كونتور، هايلايت، ظلال عيون، تركيب رموش اختيارية). نستخدم أفضل ماركات المكياج العالمية لضمان ثبات وجودة عالية.',
        price: '7,000 دج',
        rawPrice: 7000,
        priceType: 'ثابت',
        duration: '90-120 دقيقة',
        category: 'مكياج وتجميل',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/makeupartist/400/300',
        dataAiHint: 'evening makeup professional artist',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['مكياج سهرة', 'مكياج احترافي', 'مناسبات', 'تجميل', 'كونتور'],
        averageRating: 5.0,
        reviewCount: 30,
      },
      {
        id: 'farah-serv4',
        name: 'تنظيف بشرة عميق بالبخار والأقنعة',
        description: 'جددي نضارة بشرتك مع جلسة تنظيف عميقة تزيل الشوائب.',
        longDescription: 'جددي نضارة بشرتك مع جلسة تنظيف عميقة تزيل الشوائب والرؤوس السوداء وتترك بشرتك مشرقة وصحية. تتضمن الجلسة تنظيفًا بالبخار لفتح المسام، تقشيرًا لطيفًا، إزالة الرؤوس السوداء، واستخدام أقنعة مغذية تناسب نوع بشرتك.',
        price: '4,500 دج',
        rawPrice: 4500,
        priceType: 'ثابت',
        duration: '75 دقيقة',
        category: 'عناية بالبشرة',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/facialtreatment/400/300',
        dataAiHint: 'facial treatment spa steam',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['تنظيف بشرة', 'عناية بالوجه', 'سبا', 'نضارة', 'بخار'],
        averageRating: 4.7,
        reviewCount: 20,
      },
    ],
    storeType: 'salon',
    accentColor: 'hsl(330, 70%, 65%)', // Vibrant Pink for salon
    themeStyle: 'modern-minimal', // Example theme
    rating: 4.9,
    reviewsCount: 180, // Sum of product/service reviews
    sellerName: 'فرح حسين',
    sellerAvatar: 'https://picsum.photos/seed/farah/100/100',
    dataAiHintSellerAvatar: 'woman beautician smiling elegant',
    contact: {
      phone: '+213 555 987 654',
      address: 'صالون فرح، شارع الجمال، قسنطينة',
      mapLink: 'https://maps.google.com/?q=Salon+Farah+Constantine'
    },
    socialMedia: { instagram: 'salon_farah_official', facebook: 'SalonFarahBeauty', tiktok: 'salon.farah.beauty' },
    policies: { customPolicy: { title: 'سياسة الحجوزات والإلغاء', content: 'يرجى الحجز المسبق لضمان توفر الموعد. يمكن إلغاء أو تعديل الموعد قبل 24 ساعة على الأقل لتجنب رسوم الإلغاء. نقدر تفهمكم.' } , returnPolicy: 'منتجات العناية المباعة غير قابلة للإرجاع أو الاستبدال بعد الفتح حرصًا على سلامتكم.'},
    productTypes: [
        {id: 'خدمة', name: 'خدمات تجميل وعناية فاخرة'},
        {id: 'بيع', name: 'منتجات عناية مختارة'}
    ],
    openingHours: ['الأحد - الخميس: 10ص - 7م', 'السبت: 12ظ - 6م (الحجوزات فقط)', 'الجمعة: مغلق'],
    specialAnnouncements: ['عرض خاص: باقة العروس متوفرة الآن بخصم 20%!', 'تحصلي على استشارة مجانية للشعر عند حجز أي خدمة علاجية هذا الشهر.'],
    featuredServiceIds: ['farah-serv1', 'farah-serv3', 'farah-serv4'],
    featuredProductIds: ['farah-prod1'],
    reviews: [
        { id: 'r9', authorName: 'إيمان خ.', rating: 5, comment: 'أفضل خدمة قص شعر حصلت عليها! فرح فهمت بالضبط ما أريد وكانت النتيجة مذهلة.', date: '2024-05-15T16:30:00Z', itemId: 'farah-serv1', storeId: 'salon-farah'},
        { id: 'r10', authorName: 'عائشة ل.', rating: 5, comment: 'مكياج السهرة كان احترافيًا وثابتًا طوال الليل. أنصح به بشدة!', date: '2024-05-11T20:00:00Z', itemId: 'farah-serv3', storeId: 'salon-farah'},
        { id: 'r11', authorName: 'هدى م.', rating: 4, comment: 'زيت الأرغان رائع جدًا، شعري أصبح أكثر نعومة ولمعانًا.', date: '2024-05-09T09:00:00Z', itemId: 'farah-prod1', storeId: 'salon-farah'},
    ]
  },

  // Store 5: General Store (Souq Albanat) - using 'souq-albanat' as ID (slug)
  {
    id: 'souq-albanat', // This is the storeSlug
    name: 'سوق البنات المتنوع',
    slogan: 'كل ما تحتاجينه في مكان واحد... وأكثر!',
    story: 'سوق البنات هو وجهتكِ الأولى لكل ما هو جديد ومميز. نجمع لكِ بين المنتجات اليدوية، الأزياء العصرية، مستلزمات المنزل الأنيقة، وحتى الخدمات الفريدة. هدفنا توفير تجربة تسوق ممتعة وشاملة تلبي جميع اهتماماتك.',
    logo: 'https://picsum.photos/seed/souqlogo/200/100',
    dataAiHintLogo: 'general store diverse logo',
    bannerImages: [
      'https://picsum.photos/seed/souqbanner1/1200/400',
      'https://picsum.photos/seed/souqbanner2/1200/400',
      'https://picsum.photos/seed/souqbanner3/1200/400',
    ],
    dataAiHintBanner: ['diverse products display', 'happy shoppers group', 'colorful marketplace'],
    heroImages: ['https://picsum.photos/seed/souqhero1/1600/600', 'https://picsum.photos/seed/souqhero2/1600/600'],
    products: [
      {
        id: 'souq-prod1',
        name: 'مجموعة أقلام تحديد ملونة (12 لون)',
        description: 'أقلام تحديد عالية الجودة بألوان زاهية، مثالية للدراسة والرسم.',
        longDescription: 'مجموعة من 12 قلم تحديد بألوان متنوعة ومشرقة. حبر يدوم طويلاً وسن مزدوج (رفيع وعريض) يتيح التحكم في سمك الخط. مثالية للطلاب والفنانين ومحبي التخطيط.',
        price: '1,200 دج',
        rawPrice: 1200,
        imageSrc: 'https://picsum.photos/seed/colorpens/400/300',
        category: 'قرطاسية وأدوات مكتبية',
        type: 'بيع',
        averageRating: 4.5,
        reviewCount: 40,
        dataAiHint: 'colored marker pens set',
        images: ['https://picsum.photos/seed/colorpens/800/600', 'https://picsum.photos/seed/penwriting/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['أقلام تحديد', 'قرطاسية', 'ألوان', 'دراسة', 'رسم', 'مكتب'],
        availability: 'متوفر',
        sku: 'SQB-STAT-MRKR12',
      },
      {
        id: 'souq-prod2',
        name: 'إكسسوارات شعر مصنوعة يدويًا (ربطات وقباضات)',
        description: 'مجموعة من إكسسوارات الشعر الفريدة المصنوعة يدويًا بأقمشة متنوعة.',
        longDescription: 'أضيفي لمسة جمالية لتسريحتك مع مجموعتنا من إكسسوارات الشعر المصنوعة يدويًا. تتضمن ربطات شعر (سكرانشي)، قباضات مزينة، وأطواق بتصاميم وأقمشة فريدة ومتجددة.',
        price: '800 دج للمجموعة (3 قطع)',
        rawPrice: 800,
        imageSrc: 'https://picsum.photos/seed/hairaccessories/400/300',
        category: 'أزياء وإكسسوارات',
        type: 'بيع',
        dataAiHint: 'handmade hair accessories',
        images: ['https://picsum.photos/seed/hairaccessories/800/600', 'https://picsum.photos/seed/hairscrunchie/800/600', 'https://picsum.photos/seed/hairclips/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['إكسسوارات شعر', 'يدوي', 'أزياء', 'بناتي', 'سكرانشي'],
        availability: 'متوفر',
        sku: 'SQB-ACC-HAIRSET3',
      },
      {
        id: 'souq-prod3',
        name: 'حقيبة ظهر مدرسية عصرية متعددة الجيوب',
        description: 'حقيبة ظهر مريحة وعملية بتصميم جذاب، مثالية للمدرسة أو الجامعة.',
        longDescription: 'حقيبة ظهر متينة وخفيفة الوزن، مصنوعة من قماش مقاوم للماء. تحتوي على جيوب متعددة لتنظيم أغراضك بسهولة، بما في ذلك جيب مبطن للكمبيوتر المحمول (حتى 15 بوصة) وجيوب جانبية لزجاجة الماء. تصميم عصري بألوان متعددة يناسب جميع الأذواق.',
        price: '4,200 دج',
        rawPrice: 4200,
        imageSrc: 'https://picsum.photos/seed/schoolbackpack/400/300',
        category: 'حقائب ومحافظ',
        type: 'بيع',
        isNew: true,
        dataAiHint: 'modern school backpack',
        images: ['https://picsum.photos/seed/schoolbackpack/800/600', 'https://picsum.photos/seed/backpackdetails/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['حقيبة ظهر', 'مدرسية', 'جامعية', 'عصرية', 'لابتوب'],
        availability: 'متوفر',
        sku: 'SQB-BAG-BCKPCK-MOD',
      },
    ],
    services: [
      {
        id: 'souq-serv1',
        name: 'خدمة تغليف الهدايا بشكل احترافي',
        description: 'اجعلي هديتك أكثر تميزًا مع خدمة تغليف احترافية ومبتكرة.',
        longDescription: 'نقدم خدمة تغليف هدايا احترافية لجميع المناسبات. اختاري من بين مجموعة متنوعة من أوراق التغليف الفاخرة، الشرائط الملونة، والبطاقات المعبرة، ودعينا نضيف لمسة سحرية لهديتكِ لجعلها لا تُنسى.',
        price: '500 دج - 1500 دج', // Price range
        rawPrice: 500, // Starting price
        priceType: 'حسب_الطلب', // Depends on size/materials
        duration: '15-30 دقيقة',
        category: 'خدمات عامة',
        type: 'خدمة',
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        imageSrc: 'https://picsum.photos/seed/giftwrapping/400/300',
        dataAiHint: 'professional gift wrapping',
        availability: 'متوفرة خلال ساعات العمل',
        location: 'في مقرنا',
        tags: ['تغليف هدايا', 'هدايا', 'مناسبات', 'خدمة', 'تنسيق'],
        averageRating: 4.8,
        reviewCount: 25,
      }
    ],
    storeType: 'general',
    accentColor: 'hsl(180, 70%, 50%)', // Teal for general store
    themeStyle: 'light', // Example theme
    rating: 4.6,
    reviewsCount: 205, // Sum of product/service reviews
    sellerName: 'فريق سوق البنات',
    sellerAvatar: 'https://picsum.photos/seed/souqavatar/100/100',
    dataAiHintSellerAvatar: 'group diverse women smiling',
    contact: {
      email: 'contact@souqalbanat.com',
      address: 'سوق البنات، وسط المدينة، الجزائر',
    },
    socialMedia: { instagram: 'souq_albanat', tiktok: 'souqalbanat_official' },
    policies: { returnPolicy: 'سياسة إرجاع مرنة خلال 14 يومًا للمنتجات غير المستخدمة وفي تغليفها الأصلي. يرجى مراجعة الشروط الكاملة.', shippingPolicy: 'شحن سريع لجميع المناطق بتكلفة ثابتة. تتوفر خدمة التوصيل في نفس اليوم داخل المدينة للطلبات قبل الظهر.' },
    productTypes: [
        {id: 'بيع', name: 'منتجات متنوعة لكل الأذواق'},
        {id: 'خدمة', name: 'خدمات مساعدة وتنسيق'}
    ],
    openingHours: ['يوميًا: 10ص - 9م'],
    specialAnnouncements: ['عروض نهاية الأسبوع: خصومات تصل إلى 30% على منتجات مختارة!', 'انضمي إلى برنامج الولاء واحصلي على نقاط ومكافآت حصرية.'],
    featuredProductIds: ['souq-prod1', 'souq-prod2', 'souq-prod3'],
    featuredServiceIds: ['souq-serv1'],
    reviews: [
        { id: 'r12', authorName: 'خديجة ف.', rating: 5, comment: 'توصيل سريع جدًا والمنتجات كما في الوصف تمامًا. شكرًا لكم!', date: '2024-05-10T08:30:00Z', storeId: 'souq-albanat' },
        { id: 'r13', authorName: 'مريم ج.', rating: 4, comment: 'مجموعة الأقلام رائعة والألوان جميلة، لكن أحد الأقلام كان يجف بسرعة.', date: '2024-05-05T17:00:00Z', itemId: 'souq-prod1', storeId: 'souq-albanat' },
        { id: 'r14', authorName: 'زبيدة ر.', rating: 5, comment: 'خدمة تغليف الهدايا كانت ممتازة وسريعة، الهدية بدت رائعة!', date: '2024-04-28T13:00:00Z', itemId: 'souq-serv1', storeId: 'souq-albanat' },
    ]
  }
];

// --- Functions for Public Store Pages ---

// Function to get store data by ID (slug)
export const getStoreDataById = (storeId: string): StoreData | undefined => {
  return mockStoreDetails.find(store => store.id === storeId);
};

// Function to get a specific product by its ID (looking across all stores)
export const getProductById = (productId: string): Product | undefined => {
  for (const store of mockStoreDetails) {
    const product = store.products.find(p => p.id === productId);
    if (product) return { ...product, sellerId: store.id, storeSlug: store.id }; // Add sellerId and storeSlug
  }
  return undefined;
};

// Function to get a specific service by its ID (looking across all stores)
export const getServiceById = (serviceId: string): Service | undefined => {
    for (const store of mockStoreDetails) {
        if (store.services) {
            const service = store.services.find(s => s.id === serviceId);
            if (service) return { ...service, sellerId: store.id, storeSlug: store.id }; // Add sellerId and storeSlug
        }
    }
    return undefined;
};

// Function to get all products from all stores for the main products page
export const getAllPlatformProducts = (): Product[] => {
    return mockStoreDetails.reduce((acc, store) => {
        const storeProducts = store.products.map(p => ({
            ...p,
            sellerId: store.id, // Ensure sellerId is present
            storeSlug: store.id  // Ensure storeSlug is present
        }));
        return acc.concat(storeProducts);
    }, [] as Product[]);
};

// Function to get all services from all stores for the main products page
export const getAllPlatformServices = (): Service[] => {
    return mockStoreDetails.reduce((acc, store) => {
        const storeServices = (store.services || []).map(s => ({
            ...s,
            sellerId: store.id, // Ensure sellerId is present
            storeSlug: store.id  // Ensure storeSlug is present
        }));
        return acc.concat(storeServices);
    }, [] as Service[]);
};

// Function to get all products for a specific store ID (slug) for the store page
export const getProductsByStoreId = (storeId: string): Product[] => {
  const store = mockStoreDetails.find(s => s.id === storeId);
  return store ? store.products.map(p => ({ ...p, sellerId: store.id, storeSlug: store.id })) : [];
};

// Function to get all services for a specific store ID (slug) for the store page
export const getServicesByStoreId = (storeId: string): Service[] => {
  const store = mockStoreDetails.find(s => s.id === storeId);
  return store && store.services ? store.services.map(s => ({ ...s, sellerId: store.id, storeSlug: store.id })) : [];
};


// --- Seller Dashboard Specific Data ---
// Note: The seller dashboard only needs data for *one* specific seller.
// We'll use 'lamsa-ibdaa' as the example seller for the dashboard data.

export type SellerProductStatus = 'نشط' | 'غير نشط' | 'بانتظار الموافقة' | 'نفذ المخزون';

export interface DetailedSellerProduct {
  id: string;
  name: string;
  productType: ProductType; // Use the global ProductType
  category: string;
  detailsForAI: string; // For AI description generation
  description: string; // Main description for display
  story?: string; // Optional seller's story about the product
  price: string; // Raw price string for seller input (might differ from public display)
  stock?: string; // For 'بيع'
  discountPercentage?: string; // For 'بيع'
  isTaxable?: boolean; // For 'بيع'
  rentalPrice?: string; // For 'إيجار'
  rentalPeriod?: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'; // For 'إيجار'
  rentalDeposit?: string; // For 'إيجار'
  rentalAvailability?: string; // For 'إيجار'
  servicePriceType?: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'; // For 'خدمة'
  servicePrice?: string; // Service price value for seller input
  serviceDuration?: string; // For 'خدمة'
  serviceLocation?: string; // For 'خدمة'
  imageSrc: string; // Primary image
  images?: string[]; // Additional images
  dataAiHint: string;
  dateAdded: string; // ISO date string
  status: SellerProductStatus;
  sku?: string;
  tags?: string[];
  preparationTime?: string;
}


// Filter mockStoreDetails to get only 'lamsa-ibdaa' data for the dashboard
const lamsaIbdaaStore = mockStoreDetails.find(store => store.id === 'lamsa-ibdaa');

// Map products and services from the specific store to DetailedSellerProduct format
const lamsaIbdaaProducts: DetailedSellerProduct[] = lamsaIbdaaStore ? lamsaIbdaaStore.products.map(p => ({
  id: p.id,
  name: p.name,
  productType: p.type,
  category: p.category,
  detailsForAI: `${p.name}, ${p.category}, ${p.tags?.join(', ')}, ${p.description.substring(0, 50)}...`, // Example AI details
  description: p.longDescription || p.description,
  story: lamsaIbdaaStore.story || '', // Seller story can be generic or per product
  price: p.rawPrice?.toString() || '', // Use rawPrice for seller input if available
  stock: p.type === 'بيع' ? (Math.floor(Math.random() * 50) + 1).toString() : undefined, // Random stock for demo
  discountPercentage: p.discountPercentage,
  isTaxable: Math.random() < 0.2, // Random taxable for demo
  rentalPrice: p.type === 'إيجار' ? p.rawPrice?.toString() : undefined,
  rentalPeriod: p.rentalTerms?.period,
  rentalDeposit: p.rentalTerms?.deposit,
  rentalAvailability: p.availability, // Use general availability for rental notes initially
  servicePriceType: undefined, // Not a service
  servicePrice: undefined,
  serviceDuration: undefined,
  serviceLocation: undefined,
  imageSrc: p.imageSrc,
  images: p.images,
  dataAiHint: p.dataAiHint,
  dateAdded: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
  status: p.availability === 'نفذ المخزون' ? 'نفذ المخزون' : (Math.random() < 0.1 ? 'بانتظار الموافقة' : (Math.random() < 0.15 ? 'غير نشط' : 'نشط')), // Random status
  sku: p.sku,
  tags: p.tags,
  preparationTime: p.preparationTime,
})) : [];

const lamsaIbdaaServices: DetailedSellerProduct[] = lamsaIbdaaStore && lamsaIbdaaStore.services ? lamsaIbdaaStore.services.map(s => ({
  id: s.id,
  name: s.name,
  productType: s.type,
  category: s.category,
  detailsForAI: `${s.name}, ${s.category}, ${s.tags?.join(', ')}, ${s.description.substring(0, 50)}...`,
  description: s.longDescription || s.description,
  story: lamsaIbdaaStore.story || '',
  price: '', // Price managed by service fields
  stock: undefined,
  discountPercentage: undefined,
  isTaxable: undefined,
  rentalPrice: undefined,
  rentalPeriod: undefined,
  rentalDeposit: undefined,
  rentalAvailability: undefined,
  servicePriceType: s.priceType,
  servicePrice: s.rawPrice?.toString() || s.price, // Use raw or formatted if raw is unavailable
  serviceDuration: s.duration,
  serviceLocation: s.location,
  imageSrc: s.imageSrc || 'https://picsum.photos/seed/serviceplaceholder/200/200',
  images: s.imageSrc ? [s.imageSrc] : undefined,
  dataAiHint: s.dataAiHint || 'service image',
  dateAdded: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 60 days
  status: Math.random() < 0.1 ? 'بانتظار الموافقة' : (Math.random() < 0.1 ? 'غير نشط' : 'نشط'),
  sku: `SERV-${s.id.substring(0, 4).toUpperCase()}`,
  tags: s.tags,
  preparationTime: s.availability,
})) : [];


// Combine and export for the seller dashboard
// Use let instead of const to allow modification by deleteSellerProduct
// @ts-ignore
let allSellerProductsList: DetailedSellerProduct[] = [
    ...lamsaIbdaaProducts,
    ...lamsaIbdaaServices,
];


// Function to get product/service summary for the seller's dashboard list
export const getSellerProductsSummary = () => allSellerProductsList.map(p => {
  let priceDisplay = '';
  if (p.productType === 'بيع') {
      priceDisplay = `${parseInt(p.price || '0').toLocaleString()} دج`;
      if (p.discountPercentage && parseInt(p.discountPercentage) > 0) {
          const discounted = parseInt(p.price || '0') * (1 - parseInt(p.discountPercentage)/100);
          priceDisplay = `${discounted.toLocaleString()} دج (خصم ${p.discountPercentage}%)`;
      }
  } else if (p.productType === 'إيجار') {
    priceDisplay = `${parseInt(p.rentalPrice || '0').toLocaleString()} دج / ${p.rentalPeriod || 'فترة'}`;
  } else if (p.productType === 'خدمة') {
    priceDisplay = p.servicePrice || 'عند الطلب';
    if (p.servicePriceType === 'بالساعة' && !priceDisplay.includes('/ساعة') && priceDisplay !== 'عند الطلب') {
        priceDisplay += '/ساعة';
    } else if (p.servicePriceType === 'بالمشروع' && !priceDisplay.includes('للمشروع') && priceDisplay !== 'عند الطلب') {
        priceDisplay += ' (للمشروع)';
    }
  }

  return {
    id: p.id,
    name: p.name,
    category: p.category,
    priceDisplay: priceDisplay,
    type: p.productType,
    stock: p.productType === 'بيع' ? parseInt(p.stock || '0') : undefined,
    status: p.status,
    imageSrc: p.imageSrc,
    dataAiHint: p.dataAiHint,
    dateAdded: p.dateAdded,
  };
});

// Function to get a specific product/service *for the seller dashboard* by its ID
export const getDetailedSellerProductById = (id: string): DetailedSellerProduct | undefined => {
  return allSellerProductsList.find(p => p.id === id);
};

// Function to simulate updating a product in the seller's list (for demo purposes)
export const updateSellerProduct = (updatedProduct: DetailedSellerProduct): boolean => {
    const index = allSellerProductsList.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        allSellerProductsList[index] = updatedProduct;
        // In a real app, you would also need to update the corresponding item
        // within the `mockStoreDetails` array if the changes should reflect publicly.
        const storeIndex = mockStoreDetails.findIndex(s => s.id === updatedProduct.productType); // Assuming productType matches store ID for now
        if (storeIndex !== -1) {
            if (updatedProduct.productType === 'خدمة') {
                const serviceIndex = mockStoreDetails[storeIndex].services?.findIndex(s => s.id === updatedProduct.id);
                if (serviceIndex !== undefined && serviceIndex !== -1 && mockStoreDetails[storeIndex].services) {
                   // Map back DetailedSellerProduct to Service format (simplified example)
                   mockStoreDetails[storeIndex].services![serviceIndex] = {
                       ...mockStoreDetails[storeIndex].services![serviceIndex],
                       name: updatedProduct.name,
                       description: updatedProduct.description.substring(0, 150), // Shorten for display
                       longDescription: updatedProduct.description,
                       price: updatedProduct.servicePrice || 'عند الطلب', // Use updated service price
                       category: updatedProduct.category,
                       imageSrc: updatedProduct.imageSrc,
                       tags: updatedProduct.tags,
                       duration: updatedProduct.serviceDuration,
                       location: updatedProduct.serviceLocation as any, // Cast might be needed
                       availability: updatedProduct.preparationTime,
                   };
                }
            } else {
                const productIndex = mockStoreDetails[storeIndex].products.findIndex(p => p.id === updatedProduct.id);
                 if (productIndex !== -1) {
                     // Map back DetailedSellerProduct to Product format (simplified example)
                     mockStoreDetails[storeIndex].products[productIndex] = {
                        ...mockStoreDetails[storeIndex].products[productIndex],
                        name: updatedProduct.name,
                        description: updatedProduct.description.substring(0, 150),
                        longDescription: updatedProduct.description,
                        price: updatedProduct.price ? `${parseInt(updatedProduct.price).toLocaleString()} دج` : '', // Format price
                        rawPrice: parseInt(updatedProduct.price || '0'),
                        category: updatedProduct.category,
                        imageSrc: updatedProduct.imageSrc,
                        images: updatedProduct.images,
                        tags: updatedProduct.tags,
                        availability: updatedProduct.status === 'نفذ المخزون' ? 'نفذ المخزون' : (updatedProduct.status === 'نشط' ? 'متوفر' : 'قريباً'),
                        sku: updatedProduct.sku,
                        rentalTerms: updatedProduct.productType === 'إيجار' ? { period: updatedProduct.rentalPeriod, deposit: updatedProduct.rentalDeposit, minDuration: 'غير محدد'} : undefined,
                        discountPercentage: updatedProduct.discountPercentage,
                     };
                 }
            }
        }
        return true;
    }
    return false;
};

// Function to simulate deleting a product (for demo)
export const deleteSellerProduct = (productId: string): boolean => {
    const initialLength = allSellerProductsList.length;
    allSellerProductsList = allSellerProductsList.filter(p => p.id !== productId);
    // Also remove from public store data
    mockStoreDetails.forEach(store => {
        store.products = store.products.filter(p => p.id !== productId);
        if(store.services) {
            store.services = store.services.filter(s => s.id !== productId);
        }
    });
    return allSellerProductsList.length < initialLength;
};
