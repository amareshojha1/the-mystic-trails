import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      q: "Where do you get your flowers from?",
      a: "We collect floral offerings directly from temples in our local region daily. These flowers would otherwise end up in landfills or rivers."
    },
    {
      q: "Are your products charcoal-free?",
      a: "Yes, absolutely. All our incense sticks and cones are 100% charcoal-free and sulphur-free, ensuring a clean and non-toxic burn."
    },
    {
      q: "Are your products safe for pets and children?",
      a: "Since our products are made from natural ingredients and free from harmful chemicals, they are generally safer. However, we always recommend keeping burning incense out of reach of children and pets and ensuring good ventilation."
    },
    {
      q: "Do you use synthetic fragrances?",
      a: "We use a blend of natural essential oils and high-quality fragrance oils to ensure a consistent and pleasing aroma that isn't overpowering."
    },
    {
      q: "How long does shipping take?",
      a: "We usually process orders within 24 hours. Domestic shipping typically takes 3-5 business days depending on your location."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container-wide max-w-3xl">
        <h1 className="text-4xl font-heading text-primary text-center mb-12">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6 bg-secondary/10">
              <AccordionTrigger className="text-lg font-medium text-primary hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
