'use server';
/**
 * @fileOverview Generates product descriptions using AI for WomenCommerce.
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
  description: z.string().describe('A compelling product or service description, approximately 3 paragraphs long, including one call to action. The tone should be engaging and suitable for an e-commerce platform targeting women.'),
  // For Arabic prompt: description: z.string().describe('وصف جذاب للمنتج أو الخدمة، يتكون من ٣ فقرات تقريبًا، ويتضمن نداءً واحدًا لاتخاذ إجراء. يجب أن تكون النبرة جذابة ومناسبة لمنصة تجارة إلكترونية تستهدف النساء.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

// English Prompt
const prompt = ai.definePrompt({
  name: 'generateWomenCommerceProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in writing captivating product and service descriptions for WomenCommerce, an e-commerce platform empowering women entrepreneurs.
Your descriptions should be engaging, highlight unique selling points, and appeal to a female audience.

Write a description for the following: {{{productDetails}}}.

The description should be approximately 3 paragraphs long and must include one clear call to action (e.g., "Shop Now!", "Book Your Service Today!", "Rent This Look!", "Learn More!").
Ensure the tone is warm, trustworthy, and inspiring.
Focus on benefits for the customer and the story behind the product/service if applicable.
`,
});

/*
// Arabic Prompt (If the model and Genkit setup supports Arabic well for structured output)
const promptAr = ai.definePrompt({
  name: 'generateWomenCommerceProductDescriptionPromptAr',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `أنت مساعد ذكاء اصطناعي متخصص في كتابة أوصاف جذابة للمنتجات والخدمات على منصة "نساء كوميرس" (WomenCommerce)، وهي منصة تجارة إلكترونية تهدف لتمكين رائدات الأعمال.
يجب أن تكون أوصافك جذابة، تبرز نقاط البيع الفريدة، وتناسب الجمهور النسائي.

اكتب وصفًا لما يلي: {{{productDetails}}}.

يجب أن يتكون الوصف من ٣ فقرات تقريبًا وأن يتضمن نداءً واحدًا واضحًا لاتخاذ إجراء (مثال: "تسوقي الآن!"، "احجزي خدمتك اليوم!"، "استأجري هذه الإطلالة!"، "اعرفي المزيد!").
احرص على أن تكون النبرة ودودة، موثوقة، وملهمة.
ركزي على الفوائد التي تعود على العميلة والقصة وراء المنتج/الخدمة إن أمكن.
`,
});
*/

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async (input) => {
    // Use the English prompt by default. Switch to promptAr if Arabic output is preferred and supported.
    const {output} = await prompt(input); 
    return output!;
  }
);
