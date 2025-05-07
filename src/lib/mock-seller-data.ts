// src/lib/mock-seller-data.ts

export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type ProductStatus = 'نشط' | 'غير نشط' | 'بانتظار الموافقة' | 'نفذ المخزون';

export interface DetailedSellerProduct {
  id: string;
  name: string;
  productType: ProductType;
  category: string;
  detailsForAI: string;
  description: string;
  story: string;
  price: string; // For 'بيع'
  stock?: string; // For 'بيع'
  discountPercentage?: string; // For 'بيع'
  isTaxable?: boolean; // For 'بيع'
  rentalPrice?: string; // For 'إيجار'
  rentalPeriod?: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'; // For 'إيجار'
  rentalDeposit?: string; // For 'إيجار'
  rentalAvailability?: string; // For 'إيجار'
  servicePriceType?: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'; // For 'خدمة'
  servicePrice?: string; // For 'خدمة'
  serviceDuration?: string; // For 'خدمة'
  serviceLocation?: string; // For 'خدمة'
  imageSrc: string;
  dataAiHint: string;
  dateAdded: string;
  status: ProductStatus;
}

export const allSellerProductsList: DetailedSellerProduct[] = [
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
    dateAdded: '2024-05-01', 
    detailsForAI: 'أقراط فضية نسائية، مصنوعة يدويًا، حجر فيروز طبيعي، تصميم عصري وأنيق، مناسبة للهدايا والمناسبات اليومية.', 
    description: 'تألقي بلمسة من الأصالة والجمال مع هذه الأقراط الفضية المصنوعة يدويًا، والمرصعة بحجر الفيروز الطبيعي الساحر. تصميمها العصري يجمع بين الأناقة والبساطة، مما يجعلها قطعة مثالية لإطلالاتكِ اليومية أو كهدية تعبر عن ذوقكِ الرفيع.\n\nتتميز هذه الأقراط بجودة الفضة العالية وحرفية الصنع الدقيقة، مع تركيز على إبراز جمال حجر الفيروز بألوانه الزاهية التي تضفي حيوية وجاذبية. خفيفة الوزن ومريحة للارتداء طوال اليوم.\n\nاقتني هذه القطعة الفريدة الآن وأضيفي لمسة من السحر الطبيعي إلى صندوق مجوهراتكِ، أو قدميها كهدية لا تُنسى لمن تحبين!', 
    story: 'كل قطعة أصنعها تحمل شغفي بالأحجار الكريمة وسحر الفضة. هذه الأقراط مستوحاة من زرقة السماء الصافية.', 
    discountPercentage: '5', 
    isTaxable: false 
  },
  { 
    id: 'sprod2', 
    name: 'فستان سهرة أحمر طويل (للإيجار)', 
    category: 'تأجير إبداعات', 
    rentalPrice: '8000', 
    rentalPeriod: 'يوم', 
    type: 'إيجار', 
    productType: 'إيجار',
    status: 'نشط', 
    imageSrc: 'https://picsum.photos/seed/sprod2/200/200', 
    dataAiHint: 'red evening gown', 
    dateAdded: '2024-04-20',
    detailsForAI: 'فستان سهرة طويل، لون أحمر، تصميم فاخر من الساتان، مناسب للحفلات الكبرى والمناسبات الرسمية.',
    description: 'تألقي كالنجمات في هذا الفستان الأحمر الساحر. تصميمه الطويل وقماشه الفاخر يمنحانكِ إطلالة ملكية. مثالي لحفلات الزفاف، الخطوبة، أو أي مناسبة ترغبين في أن تكوني فيها محط الأنظار. خدمة الإيجار تشمل التنظيف الجاف.',
    story: 'صمم هذا الفستان ليجسد الأنوثة والقوة. كل تفصيل فيه يعكس شغفنا بالموضة الراقية.',
    price: '' // Not for sale
  },
  { 
    id: 'sprod3', 
    name: 'كيكة عيد ميلاد مخصصة (شوكولاتة)', 
    category: 'حلويات ومأكولات شهية', 
    servicePriceType: 'حسب_الطلب', 
    servicePrice: 'عند الطلب', 
    type: 'خدمة', 
    productType: 'خدمة',
    status: 'نشط', 
    imageSrc: 'https://picsum.photos/seed/sprod3/200/200', 
    dataAiHint: 'custom chocolate cake', 
    dateAdded: '2024-04-15',
    detailsForAI: 'كيكة شوكولاتة غنية، تصميم مخصص حسب الطلب للمناسبات السعيدة، أعياد الميلاد، وحفلات التخرج. نستخدم أجود أنواع الشوكولاتة والمكونات الطازجة.',
    description: 'احتفلي بلحظاتكِ الحلوة مع كيكة الشوكولاتة الفاخرة المصممة خصيصًا لكِ. نستخدم أجود أنواع الشوكولاتة البلجيكية والمكونات الطازجة لضمان مذاق لا يُنسى. شاركينا فكرتكِ أو اختاري من تصاميمنا المبتكرة.',
    story: 'شغفنا بالحلويات يدفعنا لابتكار كيكات ليست فقط لذيذة، بل هي تحف فنية تليق بمناسباتكم الغالية.',
    price: '' // Service
  },
  { 
    id: 'sprod4', 
    name: 'لوحة زيتية تجريدية "ألوان الربيع"', 
    category: 'فن ومقتنيات', 
    price: '12000', 
    type: 'بيع', 
    productType: 'بيع',
    stock: '1', 
    status: 'غير نشط', 
    imageSrc: 'https://picsum.photos/seed/sprod4/200/200', 
    dataAiHint: 'abstract oil painting', 
    dateAdded: '2024-03-10',
    detailsForAI: 'لوحة زيتية تجريدية بألوان زاهية مستوحاة من فصل الربيع، قطعة فنية فريدة لتزيين منزلك أو مكتبك. مقاس 50x70 سم.',
    description: 'أضيفي لمسة فنية راقية إلى مساحتكِ مع هذه اللوحة الزيتية التجريدية المفعمة بالحياة. "ألوان الربيع" هي قطعة فريدة تجسد تناغم الألوان وانسيابية الخطوط، مما يجعلها نقطة جذب محورية في أي غرفة.',
    story: 'كل ضربة فرشاة هي تعبير عن إحساس، وكل لون يحكي قصة. هذه اللوحة هي دعوة للتأمل في جمال الطبيعة المتجدد.',
    discountPercentage: '10',
    isTaxable: true
  },
  { 
    id: 'sprod5', 
    name: 'استشارة تصميم داخلي (ساعة)', 
    category: 'خدمات احترافية', 
    servicePriceType: 'بالساعة', 
    servicePrice: '5000', 
    type: 'خدمة', 
    productType: 'خدمة',
    status: 'بانتظار الموافقة', 
    imageSrc: 'https://picsum.photos/seed/sprod5/200/200', 
    dataAiHint: 'interior design consultation', 
    dateAdded: '2024-05-05',
    detailsForAI: 'جلسة استشارة تصميم داخلي لمدة ساعة لمساعدتك في تنسيق مساحتك، اختيار الألوان، وتوزيع الأثاث بشكل مثالي. عبر الإنترنت أو حضوريًا (حسب الاتفاق).',
    description: 'حوّلي منزلكِ إلى تحفة فنية تعكس ذوقكِ وشخصيتكِ. نقدم لكِ استشارة تصميم داخلي مخصصة لمدة ساعة، نساعدكِ فيها على تحقيق أقصى استفادة من مساحتكِ، واختيار الألوان والأثاث المناسب، وخلق جو متناغم ومريح.',
    story: 'خبرة سنوات في عالم التصميم الداخلي نضعها بين يديكِ لمساعدتكِ على تحقيق منزل أحلامكِ.',
    price: '' // Service
  },
  { 
    id: 'sprod6', 
    name: 'مجموعة شموع عطرية يدوية الصنع', 
    category: 'مستلزمات منزلية وديكور', 
    price: '2200', 
    type: 'بيع', 
    productType: 'بيع',
    stock: '0', 
    status: 'نفذ المخزون', 
    imageSrc: 'https://picsum.photos/seed/sprod6/200/200', 
    dataAiHint: 'handmade scented candles', 
    dateAdded: '2024-02-28',
    detailsForAI: 'مجموعة من ثلاث شموع عطرية مصنوعة يدويًا من شمع الصويا الطبيعي والزيوت العطرية الفاخرة. روائح متنوعة: لافندر، فانيليا، وخشب الصندل.',
    description: 'استرخي وأضيفي لمسة دافئة إلى منزلكِ مع مجموعتنا من الشموع العطرية المصنوعة يدويًا. كل شمعة مصنوعة بحب من شمع الصويا الطبيعي الصديق للبيئة، ومعطرة بزيوت عطرية نقية لتمنحكِ تجربة استرخاء فريدة.',
    story: 'صنعت بحب لتنير أمسياتكِ وتملأها بالسكينة والعبير الفواح.',
    isTaxable: false
  },
];

// Function to derive summary for the product list page
export const getSellerProductsSummary = () => allSellerProductsList.map(p => {
  let priceDisplay = '';
  if (p.productType === 'بيع') {
    priceDisplay = `${parseInt(p.price).toLocaleString()} دج`;
  } else if (p.productType === 'إيجار') {
    priceDisplay = `${parseInt(p.rentalPrice || '0').toLocaleString()} دج/${p.rentalPeriod || 'فترة'}`;
  } else if (p.productType === 'خدمة') {
    priceDisplay = p.servicePrice || 'عند الطلب';
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
