import { useSubmitContact } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const submitContact = useSubmitContact();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContact) => {
    submitContact.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
        
        {/* Info Side */}
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl sm:text-5xl font-heading text-primary mb-6">Lets Connect ...</h1>
            <p className="text-lg text-muted-foreground">
              For corporate gifting, event gifting, bulk orders, please feel free to connect with us directly.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary shrink-0">
                <MapPin />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary">Visit Us</h3>
                <p className="text-muted-foreground">
                  The Mystic Trails HQ<br />
                  123 Green Avenue, Eco Park<br />
                  New Delhi, India 110001
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary shrink-0">
                <Mail />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary">Email Us</h3>
                <p className="text-muted-foreground">hello@themystictrails.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary shrink-0">
                <Phone />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary">Call Us</h3>
                <p className="text-muted-foreground">+91 8904051767</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-background p-6 sm:p-8 md:p-12 rounded-3xl border border-border shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help?" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your message here..." {...field} className="min-h-[150px] rounded-xl resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 rounded-xl text-base"
                disabled={submitContact.isPending}
              >
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>

      </div>
    </div>
  );
}
