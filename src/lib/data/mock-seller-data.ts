// src/lib/data/mock-seller-data.ts

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type SellerProductStatus = 'نشط' | 'غير نشط' | 'بانتظار الموافقة' | 'نفذ المخزون';

export interface DetailedSellerProduct {
  id: string;
  name: string;
  productType: ProductType;
  category: string;
  detailsForAI: string; // For AI description generation
  description: string; // Seller's full description
  story?: string;
  price: string; // Raw price string for seller input for 'بيع' type
  stock?: string; // For 'بيع'
  discountPercentage?: string; // For 'بيع'
  isTaxable?: boolean; // For 'بيع'
  rentalPrice?: string; // For 'إيجار'
  rentalPeriod?: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'; // For 'إيجار'
  rentalDeposit?: string; // For 'إيجار'
  rentalAvailability?: string; // For 'إيجار'
  servicePriceType?: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'; // For 'خدمة'
  servicePrice?: string; // Service price value for seller input for 'خدمة' type
  serviceDuration?: string; // For 'خدمة'
  serviceLocation?: string; // For 'خدمة'
  imageSrc: string; // Primary image
  images?: string[]; // Additional images
  dataAiHint: string;
  dateAdded: string; // ISO date string
  status: SellerProductStatus;
  sku?: string;
  tags?: string[];
  preparationTime?: string; // e.g., "يحتاج يومين للتجهيز"
  views?: number;
  sales?: number;
  shippingWeight?: string; // kg
  shippingDimensions?: string; // L x W x H cm
  metaTitle?: string;
  metaDescription?: string;
  variants?: Array<{ name: string; values: string }>; // e.g. [{ name: "Size", values: "S,M,L" }]
}

const lamsaIbdaaProducts: DetailedSellerProduct[] = [
  {
    id: 'sprod1',
    name: 'أقراط فضية مرصعة بحجر الفيروز',
    category: 'أزياء وإكسسوارات',
    price: '3500',
    productType: 'بيع',
    stock: '15',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/sprod1/200/200',
    dataAiHint: 'silver turquoise earrings',
    dateAdded: '2024-05-01T10:00:00Z',
    detailsForAI: 'أقراط فضية نسائية، مصنوعة يدويًا، حجر فيروز طبيعي، تصميم عصري وأنيق، مناسبة للهدايا والمناسبات اليومية.',
    description: 'تألقي بلمسة من الأصالة والجمال مع هذه الأقراط الفضية المصنوعة يدويًا، والمرصعة بحجر الفيروز الطبيعي الساحر. تصميمها العصري يجمع بين الأناقة والبساطة، مما يجعلها قطعة مثالية لإطلالاتكِ اليومية أو كهدية تعبر عن ذوقكِ الرفيع.\n\nتتميز هذه الأقراط بجودة الفضة العالية وحرفية الصنع الدقيقة، مع تركيز على إبراز جمال حجر الفيروز بألوانه الزاهية التي تضفي حيوية وجاذبية. خفيفة الوزن ومريحة للارتداء طوال اليوم.\n\nاقتني هذه القطعة الفريدة الآن وأضيفي لمسة من السحر الطبيعي إلى صندوق مجوهراتكِ، أو قدميها كهدية لا تُنسى لمن تحبين!',
    story: 'كل قطعة أصنعها تحمل شغفي بالأحجار الكريمة وسحر الفضة. هذه الأقراط مستوحاة من زرقة السماء الصافية.',
    discountPercentage: '5',
    isTaxable: false,
    views: Math.floor(Math.random() * 1000) + 50,
    sales: Math.floor(Math.random() * 100) + 5,
  },
  {
    id: 'sprod4',
    name: 'لوحة فنية مرسومة يدويًا "أزهار الربيع"',
    category: 'فن وديكور يدوي',
    price: '7200',
    productType: 'بيع',
    stock: '1',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/springflowersart/200/200',
    dataAiHint: 'spring flowers painting',
    dateAdded: '2024-04-10T11:00:00Z',
    detailsForAI: 'لوحة زيتية أصلية، ألوان مشرقة، زهور الربيع، ديكور منزل، فن تجريدي، مقاس 50x70 سم',
    description: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة وانطلاق الحياة، مثالية لتزيين منزلك أو مكتبك وإضفاء لمسة من البهجة. مقاس 50x70 سم. إطار خشبي متين وجاهزة للتعليق.',
    story: 'هذه اللوحة تمثل انطلاقة جديدة، تمامًا كالربيع بعد الشتاء.',
    discountPercentage: '10',
    isTaxable: true,
    views: Math.floor(Math.random() * 1000) + 50,
    sales: Math.floor(Math.random() * 100) + 5,
  },
   {
    id: 'sprod6',
    name: 'حقيبة يد كروشيه عملية',
    category: 'أزياء وإكسسوارات يدوية',
    price: '3200',
    productType: 'بيع',
    stock: '0',
    status: 'نفذ المخزون',
    imageSrc: 'https://picsum.photos/seed/crochetbag/200/200',
    dataAiHint: 'crochet handbag blue',
    dateAdded: '2024-03-25T15:00:00Z',
    detailsForAI: 'حقيبة يد كروشيه، لون أزرق داكن، عملية للاستخدام اليومي، مبطنة، حزام قابل للتعديل',
    description: 'حقيبة يد كروشيه عملية وأنيقة، مثالية للاستخدام اليومي. مبطنة من الداخل وبحزام كتف مريح وقابل للتعديل. لون أزرق داكن. **نفذ المخزون حاليًا، سيتم توفيره قريبًا!**',
    story: 'أردت تصميم حقيبة تجمع بين العملية وجمال الكروشيه.',
    isTaxable: false,
    views: Math.floor(Math.random() * 1000) + 50,
    sales: Math.floor(Math.random() * 100) + 5,
  },
];

const lamsaIbdaaServices: DetailedSellerProduct[] = [
  {
    id: 'sserv1',
    name: 'ورشة تعليم أساسيات الكروشيه',
    category: 'ورش عمل فنية',
    productType: 'خدمة',
    servicePriceType: 'ثابت',
    servicePrice: '3000',
    serviceDuration: '3 ساعات',
    serviceLocation: 'في مقرنا',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/crochetworkshop/200/200',
    dataAiHint: 'crochet workshop beginner',
    dateAdded: '2024-04-01T09:00:00Z',
    detailsForAI: 'ورشة عمل كروشيه للمبتدئين، تعلم الغرز الأساسية، صنع قطعة بسيطة، شاملة المواد، 3 ساعات',
    description: 'انضمي إلى ورشتنا لتعلم أساسيات فن الكروشيه، من اختيار الخيوط والإبر إلى تنفيذ الغرز الأساسية وصنع قطعة بسيطة (مثل كوستر أو مربع صغير). الورشة مناسبة للمبتدئات تمامًا، وتتضمن جميع المواد وكوب قهوة! السعر للشخص الواحد.',
    story: 'أحب مشاركة متعة الكروشيه مع الأخريات ومشاهدة إبداعاتهن الأولى.',
    price: '', 
    views: Math.floor(Math.random() * 500) + 20, // Services might have fewer views/sales initially
    sales: Math.floor(Math.random() * 20) + 1,
  },
  {
    id: 'sserv2',
    name: 'تصميم شعار يدوي لعلامة تجارية',
    category: 'خدمات تصميم إبداعية',
    productType: 'خدمة',
    servicePriceType: 'بالمشروع',
    servicePrice: 'يبدأ من 15000',
    serviceDuration: '3-5 أيام عمل',
    serviceLocation: 'عبر الإنترنت',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/logodesigncraft/200/200',
    dataAiHint: 'logo design handmade',
    dateAdded: '2024-03-15T14:00:00Z',
    detailsForAI: 'تصميم شعار يدوي، علامة تجارية، لمسة فنية، تصميم جرافيك، هوية بصرية، خدمة عبر الإنترنت',
    description: 'هل تبحثين عن شعار فريد يعبر عن علامتك التجارية؟ نقدم خدمة تصميم شعارات بلمسة فنية يدوية تمزج بين الأصالة والإبداع. سيتم تصميم الشعار بناءً على رؤيتك ومتطلباتك، مع تقديم 3 نماذج أولية ومراجعتين. النسخة النهائية رقمية. السعر يبدأ من 15,000 دج ويتحدد بناءً على التعقيد.',
    story: 'أساعد العلامات التجارية الناشئة في بناء هوية بصرية مميزة.',
    price: '',
    views: Math.floor(Math.random() * 300) + 10,
    sales: Math.floor(Math.random() * 5) + 0,
  },
];

// This is the list intended for the seller dashboard.
// It is mutable and used by dashboard operations.
export let allSellerProductsList: DetailedSellerProduct[] = [
  ...lamsaIbdaaProducts,
  ...lamsaIbdaaServices,
];

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
    views: p.views,
    sales: p.sales,
  };
});

export const getDetailedSellerProductById = (id: string): DetailedSellerProduct | undefined => {
  return allSellerProductsList.find(p => p.id === id);
};

// --- Re-exports from mock-store-data.ts ---
export type { StoreData, Product, Service, Review } from './mock-store-data'; // Product and Service here are for public store view
export {
    getStoreDataById,
    getProductById,
    getServiceById,
    getAllPlatformProducts,
    getAllPlatformServices,
    mockStoreDetails,
} from './mock-store-data';


export const deleteSellerProduct = (productId: string): boolean => {
    const initialLength = allSellerProductsList.length;
    allSellerProductsList = allSellerProductsList.filter(p => p.id !== productId);
    
    mockStoreDetails.forEach(store => {
         store.products = store.products.filter(p => p.id !== productId);
         if(store.services) {
             store.services = store.services.filter(s => s.id !== productId);
         }
         store.featuredProductIds = store.featuredProductIds?.filter(id => id !== productId);
         store.featuredServiceIds = store.featuredServiceIds?.filter(id => id !== productId);
     });
    return allSellerProductsList.length < initialLength;
};

export const updateSellerProduct = (updatedProduct: DetailedSellerProduct): boolean => {
    const index = allSellerProductsList.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        allSellerProductsList[index] = updatedProduct;
        
        // Find the correct store to update.
        const storeToUpdate = mockStoreDetails.find(s => s.id === 'lamsa-ibdaa'); // Or derive storeId dynamically
        
        if (storeToUpdate) {
             if (updatedProduct.productType === 'خدمة') {
                const serviceIndex = storeToUpdate.services?.findIndex(s => s.id === updatedProduct.id);
                if (serviceIndex !== undefined && serviceIndex !== -1 && storeToUpdate.services) {
                   storeToUpdate.services[serviceIndex] = {
                       ...storeToUpdate.services[serviceIndex],
                       name: updatedProduct.name,
                       description: updatedProduct.description.substring(0, 150),
                       longDescription: updatedProduct.description,
                       price: updatedProduct.servicePrice || 'عند الطلب',
                       rawPrice: parseInt(updatedProduct.servicePrice?.replace(/\D/g,'') || '0'),
                       priceType: updatedProduct.servicePriceType,
                       category: updatedProduct.category,
                       imageSrc: updatedProduct.imageSrc,
                       tags: updatedProduct.tags,
                       duration: updatedProduct.serviceDuration,
                       location: updatedProduct.serviceLocation as any,
                       availability: updatedProduct.preparationTime,
                       sellerId: storeToUpdate.id,
                       storeSlug: storeToUpdate.id,
                       type: 'خدمة',
                   };
                }
            } else { 
                const productIndex = storeToUpdate.products.findIndex(p => p.id === updatedProduct.id);
                 if (productIndex !== -1) {
                     storeToUpdate.products[productIndex] = {
                        ...storeToUpdate.products[productIndex],
                        name: updatedProduct.name,
                        description: updatedProduct.description.substring(0, 150),
                        longDescription: updatedProduct.description,
                        price: updatedProduct.productType === 'بيع'
                            ? (updatedProduct.price ? `${parseInt(updatedProduct.price).toLocaleString()} دج` : '')
                            : (updatedProduct.rentalPrice ? `${parseInt(updatedProduct.rentalPrice).toLocaleString()} دج / ${updatedProduct.rentalPeriod || 'فترة'}` : ''),
                        rawPrice: parseInt(updatedProduct.productType === 'بيع' ? (updatedProduct.price || '0') : (updatedProduct.rentalPrice || '0')),
                        category: updatedProduct.category,
                        imageSrc: updatedProduct.imageSrc,
                        images: updatedProduct.images,
                        tags: updatedProduct.tags,
                        availability: updatedProduct.status === 'نفذ المخزون' ? 'نفذ المخزون' : (updatedProduct.status === 'نشط' ? 'متوفر' : 'قريباً'),
                        sku: updatedProduct.sku,
                        rentalTerms: updatedProduct.productType === 'إيجار' ? { period: updatedProduct.rentalPeriod, deposit: updatedProduct.rentalDeposit, minDuration: 'غير محدد'} : undefined,
                        discountPercentage: updatedProduct.discountPercentage,
                        preparationTime: updatedProduct.preparationTime,
                        sellerId: storeToUpdate.id,
                        storeSlug: storeToUpdate.id,
                        type: updatedProduct.productType,
                     };
                 }
            }
        }
        return true;
    }
    return false;
};
    
