'use server';
/**
 * @fileOverview Generates product descriptions using AI for لمسة ضحى.
 *
 * - generateProductDescription: Function to generate a product description.
 * - GenerateProductDescriptionInput: Input type for the generation.
 * - GenerateProductDescriptionOutput: Output type for the generation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productDetails: z.string().describe('Key details about the product or service, e.g., "homemade apple cinnamon sweets", "evening gown rental for weddings", "online marketing consultation for small businesses".'),
  // For Arabic prompt: productDetails: z.string().describe('تفاصيل رئيسية عن المنتج أو الخدمة، مثال: "حلويات منزلية بنكهات التفاح والقرفة"'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling product or service description, approximately 3 paragraphs long, including one call to action. The tone should be engaging and suitable for an e-commerce platform targeting women like لمسة ضحى.'),
  // For Arabic prompt: description: z.string().describe('وصف جذاب للمنتج أو الخدمة، يتكون من ٣ فقرات تقريبًا، ويتضمن نداءً واحدًا لاتخاذ إجراء. يجب أن تكون النبرة جذابة ومناسبة لمنصة تجارة إلكترونية تستهدف النساء مثل لمسة ضحى.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  // For now, defaulting to English.
  // To use Arabic, you would potentially pass a language preference
  // or have separate functions/flows.
  // Example: if (input.language === 'ar') return generateProductDescriptionFlowAr(input);
  return generateProductDescriptionFlow(input);
}

// English Prompt
const prompt = ai.definePrompt({
  name: 'generateLamsaDohaProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in writing captivating product and service descriptions for لمسة ضحى (Lamsa Doha), an e-commerce platform empowering women entrepreneurs.
Your descriptions should be engaging, highlight unique selling points, and appeal to a female audience.

Write a description for the following: {{{productDetails}}}.

The description should be approximately 3 paragraphs long and must include one clear call to action (e.g., "Shop Now!", "Book Your Service Today!", "Rent This Look!", "Learn More!").
Ensure the tone is warm, trustworthy, and inspiring, reflecting the essence of 'لمسة ضحى' (Doha's Touch).
Focus on benefits for the customer and the story behind the product/service if applicable.
`,
});


// Arabic Prompt
const promptAr = ai.definePrompt({
  name: 'generateLamsaDohaProductDescriptionPromptAr',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `أنتِ مساعدة ذكاء اصطناعي مبدعة، متخصصة في صياغة أوصاف آسرة للمنتجات والخدمات على منصة "لمسة ضحى"، وجهة رائدات الأعمال الطموحات.
يجب أن تكون أوصافكِ ملهمة، تبرز التفاصيل الفريدة، وتلامس قلوب جمهورنا النسائي الراقي.

صيغي وصفًا لما يلي: {{{productDetails}}}.

يجب أن يتألق الوصف في حوالي ثلاث فقرات، مع دعوة واحدة واضحة لاتخاذ إجراء (مثال: "اكتشفي الآن!"، "احجزي تجربتكِ اليوم!"، "تألقي بهذه الإطلالة!"، "اعرفي المزيد!").
احرصي على أن تكون النبرة دافئة، جديرة بالثقة، ومفعمة بالإلهام، تعكس جوهر 'لمسة ضحى'.
ركزي على المزايا التي ستعود على العميلة، واسردي القصة الكامنة وراء المنتج/الخدمة بأسلوب جذاب إن أمكن.
اجعلي كل كلمة تنبض بالحياة وتعكس شغف مبدعاتنا.
`,
});


const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async (input) => {
    // Defaulting to English prompt
    // Consider using promptAr if Arabic is the primary language
    // const {output} = await promptAr(input); 
    const {output} = await prompt(input); 
    return output!;
  }
);

// Flow for Arabic (can be called explicitly if needed)
/*
const generateProductDescriptionFlowAr = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlowAr',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await promptAr(input); 
    return output!;
  }
);
*/
