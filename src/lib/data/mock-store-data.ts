// src/lib/data/mock-store-data.ts

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type StoreType = 'general' | 'bakery' | 'fashion' | 'salon' | 'crafts' | 'rental' | 'service_provider';

export interface Product {
  id: string;
  name: string;
  description: string; // Short description for cards
  longDescription?: string; // Detailed description for product page/modal
  price: string; // Formatted price string (e.g., "5,000 دج", "عند الطلب", "يبدأ من 200 دج/ساعة")
  imageSrc: string; // Primary image for cards
  category: string;
  type: ProductType;
  averageRating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  dataAiHint: string;
  images: string[]; // Array of image URLs for product details dialog (can include imageSrc)
  sellerId: string; // To link product to a store
  storeSlug: string; // Added for easier linking from product cards
  sku?: string;
  tags?: string[];
  availability?: 'متوفر' | 'نفذ المخزون' | 'قريباً';
  preparationTime?: string; // e.g., "يحتاج يومين للتجهيز"
  rentalTerms?: { // Specific to rental products
    minDuration?: string; // e.g., "3 أيام"
    deposit?: string; // e.g., "1,000 دج"
  };
}

export interface Service {
  id: string;
  name: string;
  description: string; // Short description
  longDescription?: string; // Detailed description
  price: string; // e.g., "5,000 دج/جلسة", "عند الطلب"
  duration?: string; // e.g., "60 دقيقة", "3 جلسات"
  category: string;
  imageSrc?: string;
  dataAiHint?: string;
  type: 'خدمة'; // Ensure type is 'خدمة'
  sellerId: string;
  storeSlug: string; // Added for easier linking
  availability?: string; // e.g., "الحجز المسبق مطلوب", "أيام محددة"
  location?: 'عبر الإنترنت' | 'في موقع العميل' | 'في مقرنا';
  tags?: string[];
}

export interface ProductTypeCollection {
  id: ProductType;
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
}

const commonProducts: Product[] = [
  {
    id: 'common-prod1',
    name: 'مجموعة شموع معطرة فاخرة',
    description: 'ثلاث شموع يدوية الصنع بروائح تبعث على الاسترخاء.',
    longDescription: 'ثلاث شموع يدوية الصنع بروائح تبعث على الاسترخاء: لافندر، فانيليا، وخشب الصندل. مصنوعة من شمع الصويا الطبيعي وزيوت عطرية نقية.',
    price: '3,500 دج',
    imageSrc: 'https://picsum.photos/seed/candleset/400/300',
    category: 'هدايا وديكور',
    type: 'بيع',
    averageRating: 4.8,
    reviewCount: 65,
    isNew: true,
    dataAiHint: 'scented candles gift',
    images: ['https://picsum.photos/seed/candleset/800/600', 'https://picsum.photos/seed/candlelav/800/600', 'https://picsum.photos/seed/candlevan/800/600'],
    sellerId: 'lamsa-ibdaa', // Store ID
    storeSlug: 'lamsa-ibdaa',
    tags: ['شموع', 'هدايا', 'ديكور', 'استرخاء'],
    availability: 'متوفر',
  },
  {
    id: 'common-prod2',
    name: 'حقيبة جلدية أنيقة',
    description: 'حقيبة يد جلد طبيعي بتصميم عصري، مثالية للاستخدام اليومي.',
    longDescription: 'حقيبة يد جلد طبيعي بتصميم عصري، مثالية للاستخدام اليومي والمناسبات. تتميز بجيوب داخلية متعددة وحزام كتف قابل للتعديل.',
    price: '8,200 دج',
    imageSrc: 'https://picsum.photos/seed/leatherbag/400/300',
    category: 'أزياء وإكسسوارات',
    type: 'بيع',
    averageRating: 4.9,
    reviewCount: 120,
    isBestseller: true,
    dataAiHint: 'leather handbag fashion',
    images: ['https://picsum.photos/seed/leatherbag/800/600', 'https://picsum.photos/seed/bagdetail/800/600', 'https://picsum.photos/seed/bagmodel/800/600'],
    sellerId: 'anaqa-lilijar',
    storeSlug: 'anaqa-lilijar',
    tags: ['حقيبة', 'جلد طبيعي', 'أزياء', 'نسائية'],
    availability: 'متوفر',
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
        longDescription: 'شال دافئ مصنوع يدويًا بخيوط صوف عالية الجودة وألوان زاهية تناسب كل الأذواق. مثالي للأمسيات الباردة أو كإضافة أنيقة لملابسك.',
        price: '4,800 دج',
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
        tags: ['كروشيه', 'شال', 'صوف', 'يدوي'],
        availability: 'متوفر',
      },
      {
        id: 'lamsa-prod2',
        name: 'مجموعة دُمى أميغورومي لطيفة',
        description: 'دُمى كروشيه محببة للأطفال، مصنوعة بدقة من خيوط قطنية آمنة.',
        longDescription: 'دُمى كروشيه محببة للأطفال، مصنوعة بدقة من خيوط قطنية آمنة وناعمة. تصميمات متنوعة لشخصيات حيوانات ودمى كلاسيكية. هدية مثالية للصغار.',
        price: '2,500 دج للقطعة',
        imageSrc: 'https://picsum.photos/seed/amigurumi/400/300',
        category: 'ألعاب وهدايا يدوية',
        type: 'بيع',
        isBestseller: true,
        dataAiHint: 'amigurumi dolls handmade',
        images: ['https://picsum.photos/seed/amigurumi/800/600', 'https://picsum.photos/seed/dollgroup/800/600', 'https://picsum.photos/seed/dollplay/800/600'],
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['أميغورومي', 'دمى', 'كروشيه', 'أطفال', 'هدايا'],
        availability: 'متوفر',
      },
       {
        id: 'lamsa-prod3',
        name: 'لوحة فنية مرسومة يدويًا "أزهار الربيع"',
        description: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة.',
        longDescription: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة، مثالية لتزيين منزلك أو مكتبك. مقاس 50x70 سم. إطار خشبي متين.',
        price: '7,200 دج',
        imageSrc: 'https://picsum.photos/seed/springflowersart/400/300',
        category: 'فن وديكور يدوي',
        type: 'بيع',
        dataAiHint: 'spring flowers painting',
        images: ['https://picsum.photos/seed/springflowersart/800/600', 'https://picsum.photos/seed/artdetail1/800/600'],
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        tags: ['لوحة زيتية', 'فن تجريدي', 'ديكور', 'أزهار'],
        availability: 'متوفر',
      },
    ],
    services: [
      {
        id: 'lamsa-serv1',
        name: 'ورشة تعليم أساسيات الكروشيه',
        description: 'تعلمي فن الكروشيه من الصفر في ورشة تفاعلية وممتعة.',
        longDescription: 'انضمي إلى ورشتنا لتعلم أساسيات فن الكروشيه، من اختيار الخيوط والإبر إلى تنفيذ الغرز الأساسية وصنع قطعة بسيطة. الورشة مناسبة للمبتدئات تمامًا.',
        price: '3,000 دج للشخص',
        duration: '3 ساعات',
        category: 'ورش عمل فنية',
        type: 'خدمة',
        sellerId: 'lamsa-ibdaa',
        storeSlug: 'lamsa-ibdaa',
        imageSrc: 'https://picsum.photos/seed/crochetworkshop/400/300',
        dataAiHint: 'crochet workshop beginner',
        availability: 'الحجز المسبق مطلوب',
        location: 'في مقرنا',
        tags: ['ورشة عمل', 'كروشيه', 'تعليم', 'حرف يدوية'],
      }
    ],
    storeType: 'crafts',
    accentColor: 'hsl(var(--accent-purple))',
    themeStyle: 'playful',
    rating: 4.8,
    reviewsCount: 150,
    sellerName: 'نادية كريم',
    sellerAvatar: 'https://picsum.photos/seed/nadia/100/100',
    dataAiHintSellerAvatar: 'woman artist smiling',
    contact: {
      email: 'nadia.crafts@lamsadoha.com',
      address: 'ورشة لمسة إبداع، الجزائر العاصمة',
      phone: '+213 555 001 002'
    },
    socialMedia: { instagram: 'nadia_crafts_dz', facebook: 'NadiaHandmadeCrafts' },
    policies: { returnPolicy: 'يمكن إرجاع المنتجات خلال 7 أيام بحالتها الأصلية، باستثناء الطلبات المخصصة.', shippingPolicy: 'الشحن لجميع الولايات، التكلفة حسب المنطقة. الاستلام من الورشة متاح.' },
    productTypes: [{id: 'بيع', name: 'إبداعات يدوية للبيع'}, {id: 'خدمة', name: 'ورش عمل فنية وتعليمية'}],
    openingHours: ['الطلبات عبر الإنترنت: 24/7', 'الورشة (للاستلام والورش): السبت - الخميس (10ص - 5م)'],
    specialAnnouncements: ['تخفيضات الربيع على جميع الشالات! 15% خصم إضافي.', 'ورشة عمل جديدة لتعليم أساسيات الكروشيه، سارعوا بالتسجيل!'],
    featuredProductIds: ['lamsa-prod1', 'lamsa-prod2', 'common-prod1'],
    featuredServiceIds: ['lamsa-serv1'],
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
        longDescription: 'طبقات رقيقة من كيك العسل مع كريمة الزبدة الغنية، تحفة فنية تذوب في الفم. مثالية للمناسبات الخاصة والاحتفالات العائلية. تكفي 8-10 أشخاص.',
        price: '6,000 دج',
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
      },
      {
        id: 'mathaq-prod2',
        name: 'علبة معمول مشكل فاخر',
        description: 'معمول هش بالتمر والجوز والفستق، محضر على الأصول وبنكهات لا تقاوم.',
        longDescription: 'معمول هش بالتمر والجوز والفستق، محضر على الأصول وبنكهات لا تقاوم. مثالي للتقديم مع القهوة أو كهدية قيمة. العلبة تحتوي على 24 قطعة مشكلة.',
        price: '3,200 دج',
        imageSrc: 'https://picsum.photos/seed/maamoulbox/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        dataAiHint: 'assorted maamoul cookies',
        images: ['https://picsum.photos/seed/maamoulbox/800/600', 'https://picsum.photos/seed/maamoulcloseup/800/600', 'https://picsum.photos/seed/maamoulplate/800/600'],
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        tags: ['معمول', 'تمر', 'جوز', 'فستق', 'حلويات عربية'],
        availability: 'متوفر',
      },
       {
        id: 'mathaq-prod3',
        name: 'صينية بقلاوة مشكلة',
        description: 'بقلاوة مقرمشة وغنية بالمكسرات والعسل، تحضر يوميًا لضمان الطعم الطازج.',
        longDescription: 'بقلاوة مقرمشة وغنية بالمكسرات والعسل، تحضر يوميًا لضمان الطعم الطازج. تشكيلة متنوعة من أصابع البقلاوة وعش البلبل. الوزن الصافي حوالي 1 كغ.',
        price: '4,500 دج',
        imageSrc: 'https://picsum.photos/seed/baklavatray/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        isNew: true,
        dataAiHint: 'baklava tray assorted',
        images: ['https://picsum.photos/seed/baklavatray/800/600', 'https://picsum.photos/seed/baklavaclose/800/600'],
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        tags: ['بقلاوة', 'مكسرات', 'عسل', 'حلويات تقليدية'],
        availability: 'متوفر',
      }
    ],
    services: [
        {
        id: 'mathaq-serv1',
        name: 'ورشة تزيين الكيك للمبتدئات',
        description: 'تعلمي أساسيات وفنون تزيين الكيك في ورشة عملية وممتعة.',
        longDescription: 'تعلمي أساسيات وفنون تزيين الكيك في ورشة عملية وممتعة، واصنعي كيكتك الخاصة. تشمل الورشة جميع الأدوات والمواد اللازمة، بالإضافة إلى كتيب تعليمي.',
        price: '7,500 دج للشخص',
        duration: '4 ساعات',
        category: 'ورش عمل تعليمية',
        type: 'خدمة',
        sellerId: 'mathaq-albayt',
        storeSlug: 'mathaq-albayt',
        imageSrc: 'https://picsum.photos/seed/cakeworkshop/400/300',
        dataAiHint: 'cake decorating workshop',
        availability: 'تُعقد شهريًا، الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['ورشة عمل', 'تزيين كيك', 'تعليم', 'حلويات'],
      }
    ],
    storeType: 'bakery',
    accentColor: 'hsl(35, 85%, 60%)', // Warm Orange
    themeStyle: 'light',
    rating: 4.9,
    reviewsCount: 210,
    sellerName: 'سارة عبدالله',
    sellerAvatar: 'https://picsum.photos/seed/sara/100/100',
    dataAiHintSellerAvatar: 'woman baker smiling',
    contact: {
      phone: '+213 555 123 457',
      email: 'sara.sweets@lamsadoha.com',
      address: 'مطبخ مذاق البيت، وهران',
    },
    socialMedia: { facebook: 'MathaqAlBaytBySara', instagram: 'mathaq_albayt' },
    policies: { shippingPolicy: 'التوصيل داخل وهران خلال 24-48 ساعة. يمكن الاستلام من المطبخ بالموعد.', customPolicy: {title: 'سياسة الطلبات الخاصة', content:'نستقبل الطلبات الخاصة للكيك والمناسبات قبل 3 أيام على الأقل. يرجى التواصل للتفاصيل.'} },
    productTypes: [
      {id: 'بيع', name: 'أشهى الحلويات والمخبوزات'},
      {id: 'خدمة', name: 'ورش عمل وتجهيز مناسبات'}
    ],
    openingHours: ['الطلبات: 9ص - 6م (يوميًا عدا الجمعة)', 'استلام الطلبات الخاصة: بالتنسيق المسبق'],
    specialAnnouncements: ['جديدنا: تشكيلة كب كيك العيد متوفرة الآن!', 'خصم 10% على طلبات الكيك التي تزيد عن 10,000 دج هذا الأسبوع.'],
    featuredProductIds: ['mathaq-prod1', 'mathaq-prod2', 'mathaq-prod3'],
    featuredServiceIds: ['mathaq-serv1'],
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
        longDescription: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بالترتر الذهبي، مثالي للسهرات الفخمة وحفلات الزفاف. يأتي مع شال مطابق. خدمة التعديل البسيط متوفرة.',
        price: '12,000 دج (إيجار لـ 3 أيام)',
        imageSrc: 'https://picsum.photos/seed/golddress/400/300',
        category: 'فساتين سهرة راقية',
        type: 'إيجار',
        isBestseller: true,
        dataAiHint: 'gold sequin dress elegant',
        images: ['https://picsum.photos/seed/golddress/800/600', 'https://picsum.photos/seed/golddetail/800/600', 'https://picsum.photos/seed/goldmodel/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['فستان سهرة', 'ذهبي', 'مطرز', 'إيجار', 'زفاف'],
        availability: 'الحجز المسبق مطلوب',
        rentalTerms: { minDuration: "3 أيام", deposit: "5,000 دج" }
      },
      {
        id: 'anaqa-prod2',
        name: 'عباءة سوداء بتطريز فضي يدوي',
        description: 'عباءة خليجية فاخرة من قماش الكريب الأصلي، بتطريز يدوي متقن.',
        longDescription: 'عباءة خليجية فاخرة من قماش الكريب الأصلي، بتطريز يدوي متقن بالخيوط الفضية على الأكمام والأطراف. تصميم أنيق وعملي يناسب مختلف المناسبات.',
        price: '7,000 دج (إيجار لـ أسبوع)',
        imageSrc: 'https://picsum.photos/seed/blackabaya/400/300',
        category: 'عبايات وقفاطين فاخرة',
        type: 'إيجار',
        dataAiHint: 'black abaya silver embroidery',
        images: ['https://picsum.photos/seed/blackabaya/800/600', 'https://picsum.photos/seed/abayadetail/800/600', 'https://picsum.photos/seed/abayamodel/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['عباءة', 'سوداء', 'تطريز فضي', 'إيجار', 'خليجي'],
        availability: 'متوفر',
        rentalTerms: { minDuration: "7 أيام", deposit: "3,000 دج" }
      },
       {
        id: 'anaqa-prod3',
        name: 'قفطان مغربي تقليدي أخضر ملكي',
        description: 'قفطان أصيل بتصميم تراثي فاخر، مصنوع من المخمل ومطرز.',
        longDescription: 'قفطان أصيل بتصميم تراثي فاخر، مصنوع من المخمل ومطرز بخيوط ذهبية، مثالي للمناسبات التقليدية والأعياد. يأتي مع حزام مطابق.',
        price: '9,500 دج (إيجار لـ 3 أيام)',
        imageSrc: 'https://picsum.photos/seed/greencaftan/400/300',
        category: 'عبايات وقفاطين فاخرة',
        type: 'إيجار',
        dataAiHint: 'green moroccan caftan',
        images: ['https://picsum.photos/seed/greencaftan/800/600', 'https://picsum.photos/seed/caftandetail/800/600'],
        sellerId: 'anaqa-lilijar',
        storeSlug: 'anaqa-lilijar',
        tags: ['قفطان', 'مغربي', 'أخضر', 'إيجار', 'تقليدي'],
        availability: 'الحجز المسبق مطلوب',
        rentalTerms: { minDuration: "3 أيام", deposit: "4,000 دج" }
      },
    ],
    storeType: 'fashion', // Could also be 'rental' if specialized
    accentColor: 'hsl(var(--accent-pink))',
    themeStyle: 'elegant',
    rating: 4.7,
    reviewsCount: 95,
    sellerName: 'ليلى الشريف',
    sellerAvatar: 'https://picsum.photos/seed/laila/100/100',
    dataAiHintSellerAvatar: 'woman fashion designer stylish',
    contact: {
      email: 'laila.fashion@lamsadoha.com',
      phone: '+213 660 112 233',
      address: 'بوتيك أناقة للإيجار، حي الرياض، الجزائر',
    },
    socialMedia: { instagram: 'anaqa_lilijar', snapchat: 'anaqa_rental'},
    policies: { returnPolicy: 'يجب إعادة القطع بنفس الحالة التي استلمت بها خلال 24 ساعة من انتهاء مدة الإيجار. يتم خصم مبلغ التأمين في حال وجود تلف.', shippingPolicy: 'الاستلام والتسليم من البوتيك. خدمة توصيل خاصة متوفرة بتكلفة إضافية حسب المنطقة.' },
    productTypes: [{id: 'إيجار', name: 'أزياء راقية للإيجار'}, {id: 'بيع', name: 'إكسسوارات مكملة'}],
    openingHours: ['السبت - الخميس: 11ص - 8م (بموعد مسبق للمعاينة)'],
    specialAnnouncements: ['وصلت تشكيلة جديدة من فساتين السهرة لموسم الصيف! احجزي موعدك للمعاينة.', 'خصم خاص على إيجار قطعتين أو أكثر.'],
    featuredProductIds: ['anaqa-prod1', 'anaqa-prod2', 'common-prod2'],
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
            longDescription: 'زيت أرغان عضوي 100% لترطيب وتغذية الشعر الجاف والتالف، يعيد اللمعان والحيوية. يمكن استخدامه كبلسم أو كعلاج قبل الاستحمام. 50 مل.',
            price: '2,800 دج',
            imageSrc: 'https://picsum.photos/seed/arganoilhair/400/300',
            category: 'منتجات عناية بالشعر',
            type: 'بيع',
            isBestseller: true,
            dataAiHint: 'argan oil hair product',
            images: ['https://picsum.photos/seed/arganoilhair/800/600', 'https://picsum.photos/seed/arganbottle/800/600'],
            sellerId: 'salon-farah',
            storeSlug: 'salon-farah',
            tags: ['زيت أرغان', 'عناية بالشعر', 'عضوي', 'ترطيب'],
            availability: 'متوفر',
        },
        {
            id: 'farah-prod2',
            name: 'ماسك الذهب والكولاجين لنضارة البشرة',
            description: 'ماسك فاخر لشد البشرة، تقليل التجاعيد، وإعطاء إشراقة فورية.',
            longDescription: 'ماسك فاخر غني بجزيئات الذهب والكولاجين، يعمل على شد البشرة، تقليل التجاعيد، وإعطاء إشراقة فورية. مثالي قبل المناسبات. للاستخدام مرة أسبوعيًا. 50 جرام.',
            price: '4,500 دج',
            imageSrc: 'https://picsum.photos/seed/goldmask/400/300',
            category: 'منتجات عناية بالبشرة',
            type: 'بيع',
            dataAiHint: 'gold collagen face mask',
            images: ['https://picsum.photos/seed/goldmask/800/600', 'https://picsum.photos/seed/masktexture/800/600'],
            sellerId: 'salon-farah',
            storeSlug: 'salon-farah',
            tags: ['ماسك ذهب', 'كولاجين', 'عناية بالبشرة', 'مكافحة الشيخوخة'],
            availability: 'متوفر',
        }
    ],
    services: [
      {
        id: 'farah-serv1',
        name: 'قص وتصفيف شعر احترافي عصري',
        description: 'نقدم أحدث قصات الشعر التي تناسب شكل وجهك ونوع شعرك.',
        longDescription: 'نقدم أحدث قصات الشعر التي تناسب شكل وجهك ونوع شعرك، مع تصفيف متقن يدوم طويلاً ويبرز جمالك الطبيعي. يشمل الاستشارة، الغسيل، والقص، والتصفيف.',
        price: 'ابتداءً من 2,500 دج',
        duration: '60-90 دقيقة',
        category: 'خدمات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/haircutstyle/400/300',
        dataAiHint: 'haircut styling salon professional',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['قص شعر', 'تصفيف', 'صبغة', 'صالون نسائي'],
      },
      {
        id: 'farah-serv2',
        name: 'علاج بروتين وكيراتين للشعر التالف',
        description: 'أعيدي الحيوية واللمعان والنعومة لشعرك مع علاجاتنا المتخصصة.',
        longDescription: 'أعيدي الحيوية واللمعان والنعومة لشعرك مع علاجاتنا المتخصصة بالبروتين والكيراتين التي تصلح التلف وتقوي الخصلات من الجذور. نتائج تدوم طويلاً.',
        price: '9,000 - 18,000 دج (حسب طول وكثافة الشعر)',
        duration: '2-3.5 ساعات',
        category: 'علاجات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
         imageSrc: 'https://picsum.photos/seed/hairprotein/400/300',
        dataAiHint: 'hair protein keratin treatment',
        availability: 'يتطلب استشارة مسبقة',
        location: 'في مقرنا',
        tags: ['بروتين شعر', 'كيراتين', 'علاج الشعر', 'شعر تالف'],
      },
      {
        id: 'farah-serv3',
        name: 'مكياج سهرة متكامل بأنامل خبيرة',
        description: 'إطلالة ساحرة لمناسباتك الخاصة مع مكياج سهرة احترافي.',
        longDescription: 'إطلالة ساحرة لمناسباتك الخاصة مع مكياج سهرة احترافي يبرز جمال ملامحك ويناسب إطلالتك بالكامل. نستخدم أفضل ماركات المكياج العالمية.',
        price: '7,000 دج',
        duration: '90-120 دقيقة',
        category: 'مكياج وتجميل',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/makeupartist/400/300',
        dataAiHint: 'evening makeup professional artist',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['مكياج سهرة', 'مكياج احترافي', 'مناسبات', 'تجميل'],
      },
      {
        id: 'farah-serv4',
        name: 'تنظيف بشرة عميق بالبخار والأقنعة',
        description: 'جددي نضارة بشرتك مع جلسة تنظيف عميقة تزيل الشوائب.',
        longDescription: 'جددي نضارة بشرتك مع جلسة تنظيف عميقة تزيل الشوائب والرؤوس السوداء وتترك بشرتك مشرقة وصحية. تتضمن الجلسة تنظيفًا بالبخار، تقشيرًا لطيفًا، واستخدام أقنعة مغذية.',
        price: '4,500 دج',
        duration: '75 دقيقة',
        category: 'عناية بالبشرة',
        type: 'خدمة',
        sellerId: 'salon-farah',
        storeSlug: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/facialtreatment/400/300',
        dataAiHint: 'facial treatment spa steam',
        availability: 'الحجز المسبق ضروري',
        location: 'في مقرنا',
        tags: ['تنظيف بشرة', 'عناية بالوجه', 'سبا', 'نضارة'],
      },
    ],
    storeType: 'salon',
    accentColor: 'hsl(330, 70%, 65%)', // A brighter, more vibrant pink
    themeStyle: 'modern-minimal',
    rating: 4.9,
    reviewsCount: 180,
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
        longDescription: 'مجموعة من 12 قلم تحديد بألوان متنوعة ومشرقة. حبر يدوم طويلاً وسن مرن يتيح التحكم في سمك الخط. مثالية للطلاب والفنانين.',
        price: '1,200 دج',
        imageSrc: 'https://picsum.photos/seed/colorpens/400/300',
        category: 'قرطاسية وأدوات مكتبية',
        type: 'بيع',
        averageRating: 4.5,
        reviewCount: 40,
        dataAiHint: 'colored marker pens set',
        images: ['https://picsum.photos/seed/colorpens/800/600', 'https://picsum.photos/seed/penwriting/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['أقلام تحديد', 'قرطاسية', 'ألوان', 'دراسة', 'رسم'],
        availability: 'متوفر',
      },
      {
        id: 'souq-prod2',
        name: 'إكسسوارات شعر مصنوعة يدويًا (ربطات وقباضات)',
        description: 'مجموعة من إكسسوارات الشعر الفريدة المصنوعة يدويًا بأقمشة متنوعة.',
        longDescription: 'أضيفي لمسة جمالية لتسريحتك مع مجموعتنا من إكسسوارات الشعر المصنوعة يدويًا. تتضمن ربطات شعر، قباضات، وأطواق مزينة بأقمشة فريدة وتفاصيل أنيقة.',
        price: '800 دج للمجموعة',
        imageSrc: 'https://picsum.photos/seed/hairaccessories/400/300',
        category: 'أزياء وإكسسوارات',
        type: 'بيع',
        dataAiHint: 'handmade hair accessories',
        images: ['https://picsum.photos/seed/hairaccessories/800/600', 'https://picsum.photos/seed/hairscrunchie/800/600', 'https://picsum.photos/seed/hairclips/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['إكسسوارات شعر', 'يدوي', 'أزياء', 'بناتي'],
        availability: 'متوفر',
      },
      {
        id: 'souq-prod3',
        name: 'حقيبة ظهر مدرسية عصرية متعددة الجيوب',
        description: 'حقيبة ظهر مريحة وعملية بتصميم جذاب، مثالية للمدرسة أو الجامعة.',
        longDescription: 'حقيبة ظهر متينة وخفيفة الوزن، مصنوعة من قماش مقاوم للماء. تحتوي على جيوب متعددة لتنظيم أغراضك بسهولة، بالإضافة إلى جيب مبطن للكمبيوتر المحمول. تصميم عصري يناسب جميع الأذواق.',
        price: '4,200 دج',
        imageSrc: 'https://picsum.photos/seed/schoolbackpack/400/300',
        category: 'حقائب ومحافظ',
        type: 'بيع',
        isNew: true,
        dataAiHint: 'modern school backpack',
        images: ['https://picsum.photos/seed/schoolbackpack/800/600', 'https://picsum.photos/seed/backpackdetails/800/600'],
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        tags: ['حقيبة ظهر', 'مدرسية', 'جامعية', 'عصرية'],
        availability: 'متوفر',
      },
    ],
    services: [
      {
        id: 'souq-serv1',
        name: 'خدمة تغليف الهدايا بشكل احترافي',
        description: 'اجعلي هديتك أكثر تميزًا مع خدمة تغليف احترافية ومبتكرة.',
        longDescription: 'نقدم خدمة تغليف هدايا احترافية لجميع المناسبات. اختاري من بين مجموعة متنوعة من أوراق التغليف، الشرائط، والبطاقات، ودعينا نضيف لمسة سحرية لهديتك.',
        price: '500 دج - 1500 دج (حسب حجم الهدية والمواد المستخدمة)',
        duration: '15-30 دقيقة',
        category: 'خدمات عامة',
        type: 'خدمة',
        sellerId: 'souq-albanat',
        storeSlug: 'souq-albanat',
        imageSrc: 'https://picsum.photos/seed/giftwrapping/400/300',
        dataAiHint: 'professional gift wrapping',
        availability: 'متوفرة خلال ساعات العمل',
        location: 'في مقرنا',
        tags: ['تغليف هدايا', 'هدايا', 'مناسبات', 'خدمة'],
      }
    ],
    storeType: 'general',
    accentColor: 'hsl(180, 70%, 50%)', // Teal for general store
    themeStyle: 'light',
    rating: 4.6,
    reviewsCount: 250,
    sellerName: 'فريق سوق البنات',
    sellerAvatar: 'https://picsum.photos/seed/souqavatar/100/100',
    dataAiHintSellerAvatar: 'group diverse women smiling',
    contact: {
      email: 'contact@souqalbanat.com',
      address: 'سوق البنات، وسط المدينة، الجزائر',
    },
    socialMedia: { instagram: 'souq_albanat', tiktok: 'souqalbanat_official' },
    policies: { returnPolicy: 'سياسة إرجاع مرنة خلال 14 يومًا للمنتجات غير المستخدمة وفي تغليفها الأصلي.', shippingPolicy: 'شحن سريع لجميع المناطق. تتوفر خدمة التوصيل في نفس اليوم داخل المدينة للطلبات قبل الظهر.' },
    productTypes: [
        {id: 'بيع', name: 'منتجات متنوعة لكل الأذواق'},
        {id: 'خدمة', name: 'خدمات مساعدة وتنسيق'}
    ],
    openingHours: ['يوميًا: 10ص - 9م'],
    specialAnnouncements: ['عروض نهاية الأسبوع: خصومات تصل إلى 30% على منتجات مختارة!', 'انضمي إلى برنامج الولاء واحصلي على نقاط ومكافآت حصرية.'],
    featuredProductIds: ['souq-prod1', 'souq-prod2', 'souq-prod3'],
    featuredServiceIds: ['souq-serv1'],
  }
];

// Detailed product data for seller dashboard (matches what's used in `getSellerProductsSummary` and `getDetailedSellerProductById`)
export type SellerProductStatus = 'نشط' | 'غير نشط' | 'بانتظار الموافقة' | 'نفذ المخزون';
export interface DetailedSellerProduct {
  id: string;
  name: string;
  productType: ProductType; // Use the global ProductType
  category: string;
  detailsForAI: string; // For AI description generation
  description: string; // Main description for display
  story: string; // Optional seller's story about the product
  price: string; // Always string, might be " عند الطلب" or numeric for 'بيع'
  stock?: string; // For 'بيع'
  discountPercentage?: string; // For 'بيع'
  isTaxable?: boolean; // For 'بيع'
  rentalPrice?: string; // For 'إيجار'
  rentalPeriod?: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'; // For 'إيجار'
  rentalDeposit?: string; // For 'إيجار'
  rentalAvailability?: string; // For 'إيجار'
  servicePriceType?: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'; // For 'خدمة'
  servicePrice?: string; // This is the actual price value for service, 'price' field in Product/Service is display string.
  serviceDuration?: string; // For 'خدمة'
  serviceLocation?: string; // For 'خدمة'
  imageSrc: string; // Primary image
  images?: string[]; // Additional images
  dataAiHint: string;
  dateAdded: string;
  status: SellerProductStatus;
  sku?: string;
  tags?: string[];
  preparationTime?: string;
}


// Initial detailed product list for seller dashboard
export const allSellerProductsList: DetailedSellerProduct[] = [
  // Example Product 1 (Sale)
  {
    id: 'sprod1',
    name: 'أقراط فضية مرصعة بحجر الفيروز',
    productType: 'بيع',
    category: 'أزياء وإكسسوارات',
    detailsForAI: 'أقراط فضية نسائية، مصنوعة يدويًا، حجر فيروز طبيعي، تصميم عصري وأنيق، مناسبة للهدايا والمناسبات اليومية.',
    description: 'تألقي بلمسة من الأصالة والجمال مع هذه الأقراط الفضية المصنوعة يدويًا، والمرصعة بحجر الفيروز الطبيعي الساحر. تصميمها العصري يجمع بين الأناقة والبساطة، مما يجعلها قطعة مثالية لإطلالاتكِ اليومية أو كهدية تعبر عن ذوقكِ الرفيع.\n\nتتميز هذه الأقراط بجودة الفضة العالية وحرفية الصنع الدقيقة، مع تركيز على إبراز جمال حجر الفيروز بألوانه الزاهية التي تضفي حيوية وجاذبية. خفيفة الوزن ومريحة للارتداء طوال اليوم.\n\nاقتني هذه القطعة الفريدة الآن وأضيفي لمسة من السحر الطبيعي إلى صندوق مجوهراتكِ، أو قدميها كهدية لا تُنسى لمن تحبين!',
    story: 'كل قطعة أصنعها تحمل شغفي بالأحجار الكريمة وسحر الفضة. هذه الأقراط مستوحاة من زرقة السماء الصافية.',
    price: '3500',
    stock: '15',
    discountPercentage: '5',
    isTaxable: false,
    imageSrc: 'https://picsum.photos/seed/sprod1/200/200',
    images: ['https://picsum.photos/seed/sprod1/200/200', 'https://picsum.photos/seed/sprod1-detail1/200/200', 'https://picsum.photos/seed/sprod1-detail2/200/200'],
    dataAiHint: 'silver turquoise earrings',
    dateAdded: '2024-05-01',
    status: 'نشط',
    sku: 'EAR-SIL-TRQ-001',
    tags: ['مجوهرات', 'فضة', 'فيروز', 'أقراط', 'يدوي'],
    preparationTime: 'جاهز للشحن',
  },
  // Example Product 2 (Rental)
  {
    id: 'sprod2',
    name: 'فستان سهرة أحمر طويل (للإيجار)',
    productType: 'إيجار',
    category: 'تأجير إبداعات',
    detailsForAI: 'فستان سهرة طويل، لون أحمر، تصميم فاخر من الساتان، مناسب للحفلات الكبرى والمناسبات الرسمية. قصة حورية البحر.',
    description: 'تألقي كالنجمات في هذا الفستان الأحمر الساحر. تصميمه الطويل وقماشه الفاخر يمنحانكِ إطلالة ملكية. مثالي لحفلات الزفاف، الخطوبة، أو أي مناسبة ترغبين في أن تكوني فيها محط الأنظار. خدمة الإيجار تشمل التنظيف الجاف والتعديلات البسيطة.',
    story: 'صمم هذا الفستان ليجسد الأنوثة والقوة. كل تفصيل فيه يعكس شغفنا بالموضة الراقية. ارتديه واشعري بالتميز.',
    price: '', // Rental price is in rentalPrice
    rentalPrice: '8000',
    rentalPeriod: 'يوم',
    rentalDeposit: '4000',
    rentalAvailability: 'متوفر للحجز. يرجى التحقق من التقويم للمواعيد المتاحة.',
    imageSrc: 'https://picsum.photos/seed/sprod2/200/200',
    images: ['https://picsum.photos/seed/sprod2/200/200', 'https://picsum.photos/seed/sprod2-model/200/200'],
    dataAiHint: 'red evening gown',
    dateAdded: '2024-04-20',
    status: 'نشط',
    tags: ['فستان سهرة', 'إيجار', 'أحمر', 'ساتان', 'مناسبات'],
  },
  // Example Product 3 (Service)
  {
    id: 'sprod3',
    name: 'كيكة عيد ميلاد مخصصة (شوكولاتة)',
    productType: 'خدمة',
    category: 'حلويات ومأكولات شهية',
    detailsForAI: 'كيكة شوكولاتة غنية، تصميم مخصص حسب الطلب للمناسبات السعيدة، أعياد الميلاد، وحفلات التخرج. نستخدم أجود أنواع الشوكولاتة والمكونات الطازجة.',
    description: 'احتفلي بلحظاتكِ الحلوة مع كيكة الشوكولاتة الفاخرة المصممة خصيصًا لكِ. نستخدم أجود أنواع الشوكولاتة البلجيكية والمكونات الطازجة لضمان مذاق لا يُنسى. شاركينا فكرتكِ أو اختاري من تصاميمنا المبتكرة. يمكن إضافة رسالة شخصية.',
    story: 'شغفنا بالحلويات يدفعنا لابتكار كيكات ليست فقط لذيذة، بل هي تحف فنية تليق بمناسباتكم الغالية. كل كيكة هي قصة حب نرويها بالسكر والشوكولاتة.',
    price: '', // Service price is in servicePrice fields
    servicePriceType: 'حسب_الطلب',
    servicePrice: 'عند الطلب', // This will be used for display in the summary
    serviceDuration: 'يعتمد على التصميم',
    serviceLocation: 'الاستلام من المطبخ أو التوصيل (بتكلفة إضافية)',
    imageSrc: 'https://picsum.photos/seed/sprod3/200/200',
    images: ['https://picsum.photos/seed/sprod3/200/200', 'https://picsum.photos/seed/sprod3-design/200/200'],
    dataAiHint: 'custom chocolate cake',
    dateAdded: '2024-04-15',
    status: 'نشط',
    tags: ['كيك', 'شوكولاتة', 'عيد ميلاد', 'مخصص', 'حلويات'],
    preparationTime: 'يتطلب حجز مسبق بـ 3 أيام',
  },
  {
    id: 'sprod4',
    name: 'لوحة زيتية تجريدية "ألوان الربيع"',
    productType: 'بيع',
    category: 'فن ومقتنيات',
    detailsForAI: 'لوحة زيتية تجريدية بألوان زاهية مستوحاة من فصل الربيع، قطعة فنية فريدة لتزيين منزلك أو مكتبك. مقاس 50x70 سم. موقعة من الفنانة.',
    description: 'أضيفي لمسة فنية راقية إلى مساحتكِ مع هذه اللوحة الزيتية التجريدية المفعمة بالحياة. "ألوان الربيع" هي قطعة فريدة تجسد تناغم الألوان وانسيابية الخطوط، مما يجعلها نقطة جذب محورية في أي غرفة. مرسومة على قماش كانفاس عالي الجودة بألوان زيتية ثابتة.',
    story: 'كل ضربة فرشاة هي تعبير عن إحساس، وكل لون يحكي قصة. هذه اللوحة هي دعوة للتأمل في جمال الطبيعة المتجدد وانعكاساته على الروح.',
    price: '12000',
    stock: '1',
    discountPercentage: '10',
    isTaxable: true,
    imageSrc: 'https://picsum.photos/seed/sprod4/200/200',
    images: ['https://picsum.photos/seed/sprod4/200/200', 'https://picsum.photos/seed/sprod4-wall/200/200'],
    dataAiHint: 'abstract oil painting',
    dateAdded: '2024-03-10',
    status: 'غير نشط',
    sku: 'ART-OIL-ABS-005',
    tags: ['لوحة زيتية', 'فن تجريدي', 'ديكور منزل', 'ألوان الربيع'],
  },
  {
    id: 'sprod5',
    name: 'استشارة تصميم داخلي (ساعة)',
    productType: 'خدمة',
    category: 'خدمات احترافية',
    detailsForAI: 'جلسة استشارة تصميم داخلي لمدة ساعة لمساعدتك في تنسيق مساحتك، اختيار الألوان، وتوزيع الأثاث بشكل مثالي. عبر الإنترنت أو حضوريًا (حسب الاتفاق).',
    description: 'حوّلي منزلكِ إلى تحفة فنية تعكس ذوقكِ وشخصيتكِ. نقدم لكِ استشارة تصميم داخلي مخصصة لمدة ساعة، نساعدكِ فيها على تحقيق أقصى استفادة من مساحتكِ، واختيار الألوان والأثاث المناسب، وخلق جو متناغم ومريح. سيتم تقديم مقترحات عملية ومبتكرة.',
    story: 'خبرة سنوات في عالم التصميم الداخلي نضعها بين يديكِ لمساعدتكِ على تحقيق منزل أحلامكِ. نصغي لاحتياجاتك ونحولها إلى واقع جميل وعملي.',
    price: '',
    servicePriceType: 'بالساعة',
    servicePrice: '5000',
    serviceDuration: '60 دقيقة',
    serviceLocation: 'عبر الإنترنت أو حضوري',
    imageSrc: 'https://picsum.photos/seed/sprod5/200/200',
    images: ['https://picsum.photos/seed/sprod5/200/200', 'https://picsum.photos/seed/sprod5-moodboard/200/200'],
    dataAiHint: 'interior design consultation',
    dateAdded: '2024-05-05',
    status: 'بانتظار الموافقة',
    tags: ['تصميم داخلي', 'استشارة', 'ديكور', 'خدمة احترافية'],
    preparationTime: 'يتطلب تحديد موعد',
  },
  {
    id: 'sprod6',
    name: 'مجموعة شموع عطرية يدوية الصنع',
    productType: 'بيع',
    category: 'مستلزمات منزلية وديكور',
    detailsForAI: 'مجموعة من ثلاث شموع عطرية مصنوعة يدويًا من شمع الصويا الطبيعي والزيوت العطرية الفاخرة. روائح متنوعة: لافندر، فانيليا، وخشب الصندل. مثالية كهدية أو للاسترخاء.',
    description: 'استرخي وأضيفي لمسة دافئة إلى منزلكِ مع مجموعتنا من الشموع العطرية المصنوعة يدويًا. كل شمعة مصنوعة بحب من شمع الصويا الطبيعي الصديق للبيئة، ومعطرة بزيوت عطرية نقية لتمنحكِ تجربة استرخاء فريدة. تأتي في عبوات زجاجية أنيقة.',
    story: 'صنعت بحب لتنير أمسياتكِ وتملأها بالسكينة والعبير الفواح. كل شمعة تحمل أمنية بالهدوء والسعادة.',
    price: '2200',
    stock: '0',
    imageSrc: 'https://picsum.photos/seed/sprod6/200/200',
    images: ['https://picsum.photos/seed/sprod6/200/200', 'https://picsum.photos/seed/sprod6-group/200/200'],
    dataAiHint: 'handmade scented candles',
    dateAdded: '2024-02-28',
    status: 'نفذ المخزون',
    isTaxable: false,
    tags: ['شموع', 'عطرية', 'يدوية', 'ديكور', 'هدية'],
  },
];


export const getSellerProductsSummary = () => allSellerProductsList.map(p => {
  let priceDisplay = '';
  if (p.productType === 'بيع') {
    priceDisplay = `${parseInt(p.price).toLocaleString()} دج`;
  } else if (p.productType === 'إيجار') {
    priceDisplay = `${parseInt(p.rentalPrice || '0').toLocaleString()} دج / ${p.rentalPeriod || 'فترة'}`;
  } else if (p.productType === 'خدمة') {
    priceDisplay = p.servicePriceType === 'حسب_الطلب' ? 'عند الطلب' : `${parseInt(p.servicePrice || '0').toLocaleString()} دج${p.servicePriceType === 'بالساعة' ? '/ساعة' : ''}`;
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

export const getDetailedSellerProductById = (id: string): DetailedSellerProduct | undefined => {
  return allSellerProductsList.find(p => p.id === id);
};

// Function to get all products for a specific store ID (slug)
export const getProductsByStoreId = (storeId: string): Product[] => {
  const store = mockStoreDetails.find(s => s.id === storeId);
  return store ? store.products : [];
};

// Function to get all services for a specific store ID (slug)
export const getServicesByStoreId = (storeId: string): Service[] => {
  const store = mockStoreDetails.find(s => s.id === storeId);
  return store && store.services ? store.services : [];
};

// Function to get a specific product by its ID
export const getProductById = (productId: string): Product | undefined => {
  for (const store of mockStoreDetails) {
    const product = store.products.find(p => p.id === productId);
    if (product) return product;
  }
  return undefined;
};

// Function to get a specific service by its ID
export const getServiceById = (serviceId: string): Service | undefined => {
    for (const store of mockStoreDetails) {
        if (store.services) {
            const service = store.services.find(s => s.id === serviceId);
            if (service) return service;
        }
    }
    return undefined;
};

// Function to get all products from all stores
export const getAllPlatformProducts = (): Product[] => {
    return mockStoreDetails.reduce((acc, store) => acc.concat(store.products), [] as Product[]);
};

// Function to get all services from all stores
export const getAllPlatformServices = (): Service[] => {
    return mockStoreDetails.reduce((acc, store) => acc.concat(store.services || []), [] as Service[]);
};

export const getStoreDataById = (storeId: string): StoreData | undefined => {
  return mockStoreDetails.find(store => store.id === storeId);
};
