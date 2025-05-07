// src/lib/data/mock-store-data.ts

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type StoreType = 'general' | 'bakery' | 'fashion' | 'salon' | 'crafts'; // Added more specific store types

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; 
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
}

export interface Service {
  id: string;
  name: string;
  price: string;
  duration?: string;
  description?: string;
  category: string;
  imageSrc?: string;
  dataAiHint?: string;
  type: 'خدمة'; // Ensure type is 'خدمة'
  sellerId: string;
}

export interface ProductTypeCollection {
  id: ProductType; 
  name: string; 
}


export interface StoreData {
  id: string; 
  name: string;
  slogan?: string;
  story?: string;
  logo: string; 
  dataAiHintLogo: string;
  bannerImages: string[]; 
  dataAiHintBanner: string[];
  heroImages: string[]; 
  products: Product[]; 
  services?: Service[]; 
  storeType: StoreType; // Type of the store (e.g., bakery, fashion, salon)
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
  };
  policies?: {
    returnPolicy?: string;
    shippingPolicy?: string;
    customPolicy?: { title: string, content: string };
  };
  productTypes: ProductTypeCollection[];
  openingHours?: string[];
  specialAnnouncements?: string[]; 
}

const commonProducts: Product[] = [
  {
    id: 'common-prod1',
    name: 'مجموعة شموع معطرة فاخرة',
    description: 'ثلاث شموع يدوية الصنع بروائح تبعث على الاسترخاء: لافندر، فانيليا، وخشب الصندل.',
    price: '3,500 دج',
    imageSrc: 'https://picsum.photos/seed/candleset/400/300',
    category: 'هدايا وديكور',
    type: 'بيع',
    averageRating: 4.8,
    reviewCount: 65,
    isNew: true,
    dataAiHint: 'scented candles gift',
    images: ['https://picsum.photos/seed/candleset/800/600', 'https://picsum.photos/seed/candlelav/800/600', 'https://picsum.photos/seed/candlevan/800/600'],
    sellerId: 'lamsa-ibdaa',
  },
  {
    id: 'common-prod2',
    name: 'حقيبة جلدية أنيقة',
    description: 'حقيبة يد جلد طبيعي بتصميم عصري، مثالية للاستخدام اليومي والمناسبات.',
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
  }
];

export const mockStoreDetails: StoreData[] = [
  {
    id: 'lamsa-ibdaa', 
    name: 'لمسة إبداع نادية',
    slogan: 'حيث تتحول الخيوط والألوان إلى فن يروي قصصًا.',
    story: 'منذ صغري وأنا أعشق الألوان وتفاصيل الحرف اليدوية. "لمسة إبداع" هي مساحتي التي أشارك فيها هذا الشغف من خلال قطع فنية فريدة مصنوعة بحب وإتقان، كل قطعة تحمل جزءًا من روحي.',
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
      ...commonProducts.filter(p => p.sellerId === 'lamsa-ibdaa' || Math.random() > 0.5).slice(0, 2),
      {
        id: 'lamsa-prod1',
        name: 'شال كروشيه ملون فاخر',
        description: 'شال دافئ مصنوع يدويًا بخيوط صوف عالية الجودة وألوان زاهية تناسب كل الأذواق.',
        price: '4,800 دج',
        imageSrc: 'https://picsum.photos/seed/crochetshawl/400/300',
        category: 'أزياء وإكسسوارات',
        type: 'بيع',
        averageRating: 4.7,
        reviewCount: 30,
        isNew: true,
        dataAiHint: 'crochet shawl colorful',
        images: ['https://picsum.photos/seed/crochetshawl/800/600', 'https://picsum.photos/seed/shawldetail/800/600', 'https://picsum.photos/seed/shawlmodel/800/600'],
        sellerId: 'lamsa-ibdaa',
      },
      {
        id: 'lamsa-prod2',
        name: 'مجموعة دُمى أميغورومي لطيفة',
        description: 'دُمى كروشيه محببة للأطفال، مصنوعة بدقة من خيوط قطنية آمنة وناعمة.',
        price: '2,500 دج للقطعة',
        imageSrc: 'https://picsum.photos/seed/amigurumi/400/300',
        category: 'ألعاب وهدايا',
        type: 'بيع',
        isBestseller: true,
        dataAiHint: 'amigurumi dolls handmade',
        images: ['https://picsum.photos/seed/amigurumi/800/600', 'https://picsum.photos/seed/dollgroup/800/600', 'https://picsum.photos/seed/dollplay/800/600'],
        sellerId: 'lamsa-ibdaa',
      },
       {
        id: 'lamsa-prod3',
        name: 'لوحة فنية مرسومة يدويًا "أزهار الربيع"',
        description: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة، مثالية لتزيين منزلك.',
        price: '7,200 دج',
        imageSrc: 'https://picsum.photos/seed/springflowersart/400/300',
        category: 'فن وديكور',
        type: 'بيع',
        dataAiHint: 'spring flowers painting',
        images: ['https://picsum.photos/seed/springflowersart/800/600', 'https://picsum.photos/seed/artdetail1/800/600'],
        sellerId: 'lamsa-ibdaa',
      },
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
    },
    socialMedia: { instagram: 'nadia_crafts_dz', facebook: 'NadiaHandmadeCrafts' },
    policies: { returnPolicy: 'يمكن إرجاع المنتجات خلال 7 أيام بحالتها الأصلية، باستثناء الطلبات المخصصة.', shippingPolicy: 'الشحن لجميع الولايات، التكلفة حسب المنطقة.' },
    productTypes: [{id: 'بيع', name: 'إبداعات يدوية للبيع'}],
    openingHours: ['الطلبات عبر الإنترنت متاحة 24/7', 'الاستلام من الورشة: السبت - الخميس (10ص - 5م)'],
    specialAnnouncements: ['تخفيضات الربيع على جميع الشالات! 15% خصم إضافي.', 'ورشة عمل جديدة لتعليم أساسيات الكروشيه، سارعوا بالتسجيل!'],
  },
  {
    id: 'mathaq-albayt', 
    name: 'مذاق البيت مع سارة',
    slogan: 'حلويات تقليدية وعصرية تُحضّر بحب وجودة تليق بكم.',
    story: 'ورثت حب الطهي والحلويات من جدتي، وأضفت إليه لمستي الخاصة. في "مذاق البيت"، أقدم لكم أشهى الحلويات المصنوعة من أجود المكونات الطبيعية، كأنها أُعدت في منزلكم.',
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
      ...commonProducts.filter(p => p.sellerId === 'mathaq-albayt' || Math.random() > 0.6).slice(0,1),
      {
        id: 'mathaq-prod1',
        name: 'كيكة العسل الروسية الأصلية',
        description: 'طبقات رقيقة من كيك العسل مع كريمة الزبدة الغنية، تحفة فنية تذوب في الفم.',
        price: '6,000 دج (تكفي 8-10 أشخاص)',
        imageSrc: 'https://picsum.photos/seed/honeycake/400/300',
        category: 'كيك ومناسبات',
        type: 'بيع',
        averageRating: 4.9,
        reviewCount: 85,
        isBestseller: true,
        dataAiHint: 'russian honey cake',
        images: ['https://picsum.photos/seed/honeycake/800/600', 'https://picsum.photos/seed/honeycakeslice/800/600', 'https://picsum.photos/seed/honeycaketop/800/600'],
        sellerId: 'mathaq-albayt',
      },
      {
        id: 'mathaq-prod2',
        name: 'علبة معمول مشكل فاخر',
        description: 'معمول هش بالتمر والجوز والفستق، محضر على الأصول وبنكهات لا تقاوم.',
        price: '3,200 دج (24 قطعة)',
        imageSrc: 'https://picsum.photos/seed/maamoulbox/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        dataAiHint: 'assorted maamoul cookies',
        images: ['https://picsum.photos/seed/maamoulbox/800/600', 'https://picsum.photos/seed/maamoulcloseup/800/600', 'https://picsum.photos/seed/maamoulplate/800/600'],
        sellerId: 'mathaq-albayt',
      },
       {
        id: 'mathaq-prod3',
        name: 'صينية بقلاوة مشكلة',
        description: 'بقلاوة مقرمشة وغنية بالمكسرات والعسل، تحضر يوميًا لضمان الطعم الطازج.',
        price: '4,500 دج (1 كغ)',
        imageSrc: 'https://picsum.photos/seed/baklavatray/400/300',
        category: 'حلويات شرقية',
        type: 'بيع',
        isNew: true,
        dataAiHint: 'baklava tray assorted',
        images: ['https://picsum.photos/seed/baklavatray/800/600', 'https://picsum.photos/seed/baklavaclose/800/600'],
        sellerId: 'mathaq-albayt',
      }
    ],
    services: [
        {
        id: 'mathaq-serv1',
        name: 'ورشة تزيين الكيك للمبتدئات',
        description: 'تعلمي أساسيات وفنون تزيين الكيك في ورشة عملية وممتعة، واصنعي كيكتك الخاصة.',
        price: '7,500 دج للشخص',
        duration: '4 ساعات',
        imageSrc: 'https://picsum.photos/seed/cakeworkshop/400/300',
        category: 'ورش عمل وخدمات',
        type: 'خدمة',
        dataAiHint: 'cake decorating workshop',
        sellerId: 'mathaq-albayt',
      }
    ],
    storeType: 'bakery',
    accentColor: 'hsl(35, 85%, 60%)', // Warm Orange for bakery
    themeStyle: 'light',
    rating: 4.9,
    reviewsCount: 210,
    sellerName: 'سارة عبدالله',
    sellerAvatar: 'https://picsum.photos/seed/sara/100/100',
    dataAiHintSellerAvatar: 'woman baker smiling',
    contact: {
      phone: '+213555123457',
      email: 'sara.sweets@lamsadoha.com',
      address: 'مطبخ مذاق البيت، وهران',
    },
    socialMedia: { facebook: 'MathaqAlBaytBySara', instagram: 'mathaq_albayt' },
    policies: { shippingPolicy: 'التوصيل داخل وهران خلال 24-48 ساعة. يمكن الاستلام من المطبخ بالموعد.', customPolicy: {title: 'سياسة الطلبات الخاصة', content:'نستقبل الطلبات الخاصة للكيك والمناسبات قبل 3 أيام على الأقل.'} },
    productTypes: [
      {id: 'بيع', name: 'أشهى الحلويات والمخبوزات'},
      {id: 'خدمة', name: 'ورش عمل تعليمية وتجهيز مناسبات'}
    ],
    openingHours: ['الطلبات: 9ص - 6م (يوميًا عدا الجمعة)', 'استلام الطلبات الخاصة: بالتنسيق المسبق'],
    specialAnnouncements: ['جديدنا: تشكيلة كب كيك العيد متوفرة الآن!', 'خصم 10% على طلبات الكيك التي تزيد عن 10,000 دج هذا الأسبوع.'],
  },
  {
    id: 'anaqa-lilijar', 
    name: 'أناقة للإيجار مع ليلى',
    slogan: 'فساتين سهرة وعبايات فاخرة لمناسباتكِ التي لا تُنسى.',
    story: 'أؤمن بأن كل امرأة تستحق أن تتألق في مناسباتها الخاصة دون الحاجة لإنفاق الكثير. "أناقة للإيجار" يوفر لكِ تشكيلة متنوعة من فساتين السهرة والعبايات الراقية بتصاميم عصرية وكلاسيكية.',
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
       ...commonProducts.filter(p => p.sellerId === 'anaqa-lilijar' || Math.random() > 0.7).slice(0,1),
      {
        id: 'anaqa-prod1',
        name: 'فستان سهرة ذهبي مطرز فاخر',
        description: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بالترتر الذهبي، مثالي للسهرات الفخمة وحفلات الزفاف.',
        price: '12,000 دج (إيجار لـ 3 أيام)',
        imageSrc: 'https://picsum.photos/seed/golddress/400/300',
        category: 'فساتين سهرة',
        type: 'إيجار',
        isBestseller: true,
        dataAiHint: 'gold sequin dress elegant',
        images: ['https://picsum.photos/seed/golddress/800/600', 'https://picsum.photos/seed/golddetail/800/600', 'https://picsum.photos/seed/goldmodel/800/600'],
        sellerId: 'anaqa-lilijar',
      },
      {
        id: 'anaqa-prod2',
        name: 'عباءة سوداء بتطريز فضي يدوي',
        description: 'عباءة خليجية فاخرة من قماش الكريب الأصلي، بتطريز يدوي متقن بالخيوط الفضية على الأكمام والأطراف.',
        price: '7,000 دج (إيجار لـ أسبوع)',
        imageSrc: 'https://picsum.photos/seed/blackabaya/400/300',
        category: 'عبايات وقفاطين',
        type: 'إيجار',
        dataAiHint: 'black abaya silver embroidery',
        images: ['https://picsum.photos/seed/blackabaya/800/600', 'https://picsum.photos/seed/abayadetail/800/600', 'https://picsum.photos/seed/abayamodel/800/600'],
        sellerId: 'anaqa-lilijar',
      },
       {
        id: 'anaqa-prod3',
        name: 'قفطان مغربي تقليدي أخضر ملكي',
        description: 'قفطان أصيل بتصميم تراثي فاخر، مصنوع من المخمل ومطرز بخيوط ذهبية، مثالي للمناسبات التقليدية.',
        price: '9,500 دج (إيجار لـ 3 أيام)',
        imageSrc: 'https://picsum.photos/seed/greencaftan/400/300',
        category: 'عبايات وقفاطين',
        type: 'إيجار',
        dataAiHint: 'green moroccan caftan',
        images: ['https://picsum.photos/seed/greencaftan/800/600', 'https://picsum.photos/seed/caftandetail/800/600'],
        sellerId: 'anaqa-lilijar',
      },
    ],
    storeType: 'fashion', 
    accentColor: 'hsl(var(--accent-pink))', 
    themeStyle: 'elegant',
    rating: 4.7,
    reviewsCount: 95,
    sellerName: 'ليلى الشريف',
    sellerAvatar: 'https://picsum.photos/seed/laila/100/100',
    dataAiHintSellerAvatar: 'woman fashion designer stylish',
    contact: {
      email: 'laila.fashion@lamsadoha.com',
      phone: '+213660112233'
    },
    policies: { returnPolicy: 'يجب إعادة القطع بنفس الحالة التي استلمت بها خلال 24 ساعة من انتهاء مدة الإيجار. يتم خصم مبلغ التأمين في حال وجود تلف.', shippingPolicy: 'الاستلام والتسليم من البوتيك. خدمة توصيل خاصة متوفرة بتكلفة إضافية حسب المنطقة.' },
    productTypes: [{id: 'إيجار', name: 'أزياء راقية للإيجار'}],
    openingHours: ['السبت - الخميس: 11ص - 8م (بموعد مسبق)'],
    specialAnnouncements: ['وصلت تشكيلة جديدة من فساتين السهرة لموسم الصيف! احجزي موعدك للمعاينة.'],
  },
  {
    id: 'salon-farah',
    name: 'صالون فرح للتجميل والعناية',
    slogan: 'جمالك يبدأ من هنا... عناية فائقة ولمسات احترافية تبرز تألقك.',
    story: 'في صالون فرح، نؤمن بأن الجمال الحقيقي ينبع من الثقة بالنفس. فريقنا من الخبيرات مستعد لتقديم أفضل خدمات العناية بالشعر، البشرة، والمكياج لتبرزي أجمل ما فيكِ في جو من الراحة والاسترخاء.',
    logo: 'https://picsum.photos/seed/salonfarahlogo/200/100',
    dataAiHintLogo: 'beauty salon logo modern',
    bannerImages: [
      'https://picsum.photos/seed/salonfarahbanner1/1200/400',
      'https://picsum.photos/seed/salonfarahbanner2/1200/400',
      'https://picsum.photos/seed/beautytreatment/1200/400',
    ],
    dataAiHintBanner: ['modern salon interior luxury', 'woman getting hair treatment spa', 'beauty products display spa'],
    heroImages: ['https://picsum.photos/seed/salonfarahhero/1600/600', 'https://picsum.photos/seed/salonrelax/1600/600'],
    products: [ // Salons might sell some beauty products
        {
            id: 'farah-prod1',
            name: 'زيت الأرغان المغربي النقي للعناية بالشعر',
            description: 'زيت أرغان عضوي 100% لترطيب وتغذية الشعر الجاف والتالف، يعيد اللمعان والحيوية.',
            price: '2,800 دج (50 مل)',
            imageSrc: 'https://picsum.photos/seed/arganoilhair/400/300',
            category: 'منتجات عناية',
            type: 'بيع',
            isBestseller: true,
            dataAiHint: 'argan oil hair product',
            images: ['https://picsum.photos/seed/arganoilhair/800/600', 'https://picsum.photos/seed/arganbottle/800/600'],
            sellerId: 'salon-farah',
        }
    ],
    services: [
      {
        id: 'farah-serv1',
        name: 'قص وتصفيف شعر احترافي عصري',
        price: 'ابتداءً من 2,500 دج',
        duration: '60-90 دقيقة',
        description: 'نقدم أحدث قصات الشعر التي تناسب شكل وجهك ونوع شعرك، مع تصفيف متقن يدوم طويلاً ويبرز جمالك الطبيعي.',
        category: 'خدمات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/haircutstyle/400/300',
        dataAiHint: 'haircut styling salon professional'
      },
      {
        id: 'farah-serv2',
        name: 'علاج بروتين وكيراتين للشعر التالف',
        price: '9,000 - 18,000 دج (حسب طول وكثافة الشعر)',
        duration: '2-3.5 ساعات',
        description: 'أعيدي الحيوية واللمعان والنعومة لشعرك مع علاجاتنا المتخصصة بالبروتين والكيراتين التي تصلح التلف وتقوي الخصلات من الجذور.',
        category: 'علاجات الشعر',
        type: 'خدمة',
        sellerId: 'salon-farah',
         imageSrc: 'https://picsum.photos/seed/hairprotein/400/300',
        dataAiHint: 'hair protein keratin treatment'
      },
      {
        id: 'farah-serv3',
        name: 'مكياج سهرة متكامل بأنامل خبيرة',
        price: '7,000 دج',
        duration: '90-120 دقيقة',
        description: 'إطلالة ساحرة لمناسباتك الخاصة مع مكياج سهرة احترافي يبرز جمال ملامحك ويناسب إطلالتك بالكامل.',
        category: 'مكياج وتجميل',
        type: 'خدمة',
        sellerId: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/makeupartist/400/300',
        dataAiHint: 'evening makeup professional artist'
      },
      {
        id: 'farah-serv4',
        name: 'تنظيف بشرة عميق بالبخار والأقنعة',
        price: '4,500 دج',
        duration: '75 دقيقة',
        description: 'جددي نضارة بشرتك مع جلسة تنظيف عميقة تزيل الشوائب والرؤوس السوداء وتترك بشرتك مشرقة وصحية.',
        category: 'عناية بالبشرة',
        type: 'خدمة',
        sellerId: 'salon-farah',
        imageSrc: 'https://picsum.photos/seed/facialtreatment/400/300',
        dataAiHint: 'facial treatment spa steam'
      },
    ],
    storeType: 'salon',
    accentColor: 'hsl(330, 70%, 65%)', // A brighter, more vibrant pink for salon
    themeStyle: 'modern-minimal',
    rating: 4.9,
    reviewsCount: 180,
    sellerName: 'فرح حسين',
    sellerAvatar: 'https://picsum.photos/seed/farah/100/100',
    dataAiHintSellerAvatar: 'woman beautician smiling elegant',
    contact: {
      phone: '+213555987654',
      address: 'صالون فرح، شارع الجمال، قسنطينة',
      mapLink: 'https://maps.google.com/?q=Salon+Farah+Constantine'
    },
    socialMedia: { instagram: 'salon_farah_official', facebook: 'SalonFarahBeauty' },
    policies: { customPolicy: { title: 'سياسة الحجوزات والإلغاء', content: 'يرجى الحجز المسبق لضمان توفر الموعد. يمكن إلغاء أو تعديل الموعد قبل 24 ساعة على الأقل لتجنب رسوم الإلغاء. نقدر تفهمكم.' } , returnPolicy: 'منتجات العناية المباعة غير قابلة للإرجاع أو الاستبدال بعد الفتح حرصًا على سلامتكم.'},
    productTypes: [
        {id: 'خدمة', name: 'خدمات تجميل وعناية فاخرة'},
        {id: 'بيع', name: 'منتجات عناية مختارة'}
    ],
    openingHours: ['الأحد - الخميس: 10ص - 7م', 'السبت: 12ظ - 6م (الحجوزات فقط)', 'الجمعة: مغلق'],
    specialAnnouncements: ['عرض خاص: باقة العروس متوفرة الآن بخصم 20%!', 'تحصلي على استشارة مجانية للشعر عند حجز أي خدمة علاجية هذا الشهر.'],
  },
];
