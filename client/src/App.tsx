import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetails from "@/pages/ProductDetails";
import About from "@/pages/About";
import Impact from "@/pages/Impact";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Faq from "@/pages/Faq";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/shop" component={Shop}/>
          <Route path="/product/:id" component={ProductDetails}/>
          <Route path="/about" component={About}/>
          <Route path="/impact" component={Impact}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/faq" component={Faq}/>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
