// src/lib/data/mock-seller-data.ts
// This file remains largely the same as provided before, focusing on the delete function fix.

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type SellerProductStatus = 'نشط' | 'غير نشط' | 'بانتظار الموافقة' | 'نفذ المخزون';

// Existing interfaces (DetailedSellerProduct, etc.) remain the same...
export interface DetailedSellerProduct {
  id: string;
  name: string;
  productType: ProductType;
  category: string;
  detailsForAI: string;
  description: string;
  story?: string;
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

// Existing mock data generation (lamsaIbdaaProducts, lamsaIbdaaServices) remains the same...
const lamsaIbdaaProducts: DetailedSellerProduct[] = [
  {
    id: 'sprod1',
    name: 'أقراط فضية مرصعة بحجر الفيروز',
    category: 'أزياء وإكسسوارات',
    price: '3500',
    type: 'بيع',
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
    isTaxable: false
  },
  {
    id: 'sprod4', // Changed from lamsa-prod3 to ensure uniqueness if needed later
    name: 'لوحة فنية مرسومة يدويًا "أزهار الربيع"',
    category: 'فن وديكور يدوي',
    price: '7200',
    productType: 'بيع',
    stock: '1', // Only one available
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/springflowersart/200/200',
    dataAiHint: 'spring flowers painting',
    dateAdded: '2024-04-10T11:00:00Z',
    detailsForAI: 'لوحة زيتية أصلية، ألوان مشرقة، زهور الربيع، ديكور منزل، فن تجريدي، مقاس 50x70 سم',
    description: 'لوحة زيتية أصلية بألوان مشرقة تجسد جمال الطبيعة وانطلاق الحياة، مثالية لتزيين منزلك أو مكتبك وإضفاء لمسة من البهجة. مقاس 50x70 سم. إطار خشبي متين وجاهزة للتعليق.',
    story: 'هذه اللوحة تمثل انطلاقة جديدة، تمامًا كالربيع بعد الشتاء.',
    discountPercentage: '10',
    isTaxable: true,
  },
   {
    id: 'sprod6', // Changed from lamsa-prod5
    name: 'حقيبة يد كروشيه عملية',
    category: 'أزياء وإكسسوارات يدوية',
    price: '3200',
    productType: 'بيع',
    stock: '0', // Out of stock example
    status: 'نفذ المخزون',
    imageSrc: 'https://picsum.photos/seed/crochetbag/200/200',
    dataAiHint: 'crochet handbag blue',
    dateAdded: '2024-03-25T15:00:00Z',
    detailsForAI: 'حقيبة يد كروشيه، لون أزرق داكن، عملية للاستخدام اليومي، مبطنة، حزام قابل للتعديل',
    description: 'حقيبة يد كروشيه عملية وأنيقة، مثالية للاستخدام اليومي. مبطنة من الداخل وبحزام كتف مريح وقابل للتعديل. لون أزرق داكن. **نفذ المخزون حاليًا، سيتم توفيره قريبًا!**',
    story: 'أردت تصميم حقيبة تجمع بين العملية وجمال الكروشيه.',
    isTaxable: false,
  },
];

const lamsaIbdaaServices: DetailedSellerProduct[] = [
  {
    id: 'sserv1', // Changed from lamsa-serv1
    name: 'ورشة تعليم أساسيات الكروشيه',
    category: 'ورش عمل فنية',
    productType: 'خدمة',
    servicePriceType: 'ثابت',
    servicePrice: '3000', // Price as number string
    serviceDuration: '3 ساعات',
    serviceLocation: 'في مقرنا',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/crochetworkshop/200/200',
    dataAiHint: 'crochet workshop beginner',
    dateAdded: '2024-04-01T09:00:00Z',
    detailsForAI: 'ورشة عمل كروشيه للمبتدئين، تعلم الغرز الأساسية، صنع قطعة بسيطة، شاملة المواد، 3 ساعات',
    description: 'انضمي إلى ورشتنا لتعلم أساسيات فن الكروشيه، من اختيار الخيوط والإبر إلى تنفيذ الغرز الأساسية وصنع قطعة بسيطة (مثل كوستر أو مربع صغير). الورشة مناسبة للمبتدئات تمامًا، وتتضمن جميع المواد وكوب قهوة! السعر للشخص الواحد.',
    story: 'أحب مشاركة متعة الكروشيه مع الأخريات ومشاهدة إبداعاتهن الأولى.',
    price: '', // Not applicable for service price display here
  },
  {
    id: 'sserv2', // Changed from lamsa-serv2
    name: 'تصميم شعار يدوي لعلامة تجارية',
    category: 'خدمات تصميم إبداعية',
    productType: 'خدمة',
    servicePriceType: 'بالمشروع',
    servicePrice: 'يبدأ من 15000', // Indicative price
    serviceDuration: '3-5 أيام عمل',
    serviceLocation: 'عبر الإنترنت',
    status: 'نشط',
    imageSrc: 'https://picsum.photos/seed/logodesigncraft/200/200',
    dataAiHint: 'logo design handmade',
    dateAdded: '2024-03-15T14:00:00Z',
    detailsForAI: 'تصميم شعار يدوي، علامة تجارية، لمسة فنية، تصميم جرافيك، هوية بصرية، خدمة عبر الإنترنت',
    description: 'هل تبحثين عن شعار فريد يعبر عن علامتك التجارية؟ نقدم خدمة تصميم شعارات بلمسة فنية يدوية تمزج بين الأصالة والإبداع. سيتم تصميم الشعار بناءً على رؤيتك ومتطلباتك، مع تقديم 3 نماذج أولية ومراجعتين. النسخة النهائية رقمية. السعر يبدأ من 15,000 دج ويتحدد بناءً على التعقيد.',
    story: 'أساعد العلامات التجارية الناشئة في بناء هوية بصرية مميزة.',
    price: '', // Not applicable
  },
];

// **FIXED:** Use `let` for `allSellerProductsList` to allow reassignment in `deleteSellerProduct`
let allSellerProductsList = [
  ...lamsaIbdaaProducts,
  ...lamsaIbdaaServices,
];

// Existing getSellerProductsSummary and getDetailedSellerProductById functions remain the same...
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

export const getDetailedSellerProductById = (id: string): DetailedSellerProduct | undefined => {
  return allSellerProductsList.find(p => p.id === id);
};


// --- Functions for Public Store Pages ---
// These need to be defined or imported if used elsewhere.
// Assuming mockStoreDetails and related types/functions are defined in `mock-store-data.ts`

// Example: Re-exporting necessary types and functions from the correct path if they were moved
export type { StoreData, Product, Service, Review } from './mock-store-data'; // Adjust path if needed
export { getStoreDataById, getProductById, getServiceById, getAllPlatformProducts, getAllPlatformServices, getProductsByStoreId, getServicesByStoreId, mockStoreDetails } from './mock-store-data'; // Adjust path if needed

// FIX for deleteSellerProduct
export const deleteSellerProduct = (productId: string): boolean => {
    const initialLength = allSellerProductsList.length;
    // Correctly reassign using let
    allSellerProductsList = allSellerProductsList.filter(p => p.id !== productId);
    // Also remove from public store data (assuming mockStoreDetails is accessible and mutable here)
    // Note: In a real DB, this would be a DB operation.
     mockStoreDetails.forEach(store => {
         store.products = store.products.filter(p => p.id !== productId);
         if(store.services) {
             store.services = store.services.filter(s => s.id !== productId);
         }
     });
    return allSellerProductsList.length < initialLength;
};

// updateSellerProduct remains the same as previously provided
export const updateSellerProduct = (updatedProduct: DetailedSellerProduct): boolean => {
    const index = allSellerProductsList.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        allSellerProductsList[index] = updatedProduct;
        // Update mockStoreDetails as well (simplified example)
        const storeIndex = mockStoreDetails.findIndex(s => s.id === updatedProduct.sku?.split('-')[0]); // Example: derive storeId from SKU prefix
        if (storeIndex !== -1) {
            if (updatedProduct.productType === 'خدمة') {
                const serviceIndex = mockStoreDetails[storeIndex].services?.findIndex(s => s.id === updatedProduct.id);
                if (serviceIndex !== undefined && serviceIndex !== -1 && mockStoreDetails[storeIndex].services) {
                   mockStoreDetails[storeIndex].services![serviceIndex] = {
                       ...mockStoreDetails[storeIndex].services![serviceIndex],
                       name: updatedProduct.name,
                       description: updatedProduct.description.substring(0, 150),
                       longDescription: updatedProduct.description,
                       price: updatedProduct.servicePrice || 'عند الطلب',
                       priceType: updatedProduct.servicePriceType,
                       category: updatedProduct.category,
                       imageSrc: updatedProduct.imageSrc,
                       tags: updatedProduct.tags,
                       duration: updatedProduct.serviceDuration,
                       location: updatedProduct.serviceLocation as any,
                       availability: updatedProduct.preparationTime, // Map status/prep time back if needed
                   };
                }
            } else { // 'بيع' or 'إيجار'
                const productIndex = mockStoreDetails[storeIndex].products.findIndex(p => p.id === updatedProduct.id);
                 if (productIndex !== -1) {
                     mockStoreDetails[storeIndex].products[productIndex] = {
                        ...mockStoreDetails[storeIndex].products[productIndex],
                        name: updatedProduct.name,
                        description: updatedProduct.description.substring(0, 150),
                        longDescription: updatedProduct.description,
                        price: updatedProduct.productType === 'بيع'
                            ? (updatedProduct.price ? `${parseInt(updatedProduct.price).toLocaleString()} دج` : '')
                            : (updatedProduct.rentalPrice ? `${parseInt(updatedProduct.rentalPrice).toLocaleString()} دج / ${updatedProduct.rentalPeriod || 'فترة'}` : ''),
                        rawPrice: updatedProduct.productType === 'بيع' ? parseInt(updatedProduct.price || '0') : parseInt(updatedProduct.rentalPrice || '0'),
                        category: updatedProduct.category,
                        imageSrc: updatedProduct.imageSrc,
                        images: updatedProduct.images,
                        tags: updatedProduct.tags,
                        availability: updatedProduct.status === 'نفذ المخزون' ? 'نفذ المخزون' : (updatedProduct.status === 'نشط' ? 'متوفر' : 'قريباً'),
                        sku: updatedProduct.sku,
                        rentalTerms: updatedProduct.productType === 'إيجار' ? { period: updatedProduct.rentalPeriod, deposit: updatedProduct.rentalDeposit, minDuration: 'غير محدد'} : undefined, // Simplified mapping
                        discountPercentage: updatedProduct.discountPercentage,
                        preparationTime: updatedProduct.preparationTime,
                     };
                 }
            }
        }
        return true;
    }
    return false;
};
