import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  const subtotal = cartItems?.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)), 0) || 0;

  if (isLoading) return <div className="min-h-screen pt-32 text-center">Loading cart...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-secondary/10">
      <div className="container-wide">
        <h1 className="text-4xl font-heading text-primary mb-12">Your Cart</h1>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-20 bg-background rounded-2xl border border-border shadow-sm">
            <h2 className="text-2xl font-heading text-muted-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any spiritual essentials yet.</p>
            <Button asChild size="lg">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-background p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-secondary/20 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={item.product?.imageUrl} 
                      alt={item.product?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-heading text-base sm:text-lg text-primary">{item.product?.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product?.category}</p>
                      </div>
                      <div className="font-semibold text-base sm:text-lg text-primary shrink-0">
                        &#8377;{(item.product?.price || 0) * item.quantity}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-border rounded-full bg-background">
                        <button 
                          onClick={() => updateItem.mutate({ id: item.id, quantity: Math.max(1, item.quantity - 1) })}
                          className="p-2 hover:bg-secondary/50 rounded-l-full"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateItem.mutate({ id: item.id, quantity: item.quantity + 1 })}
                          className="p-2 hover:bg-secondary/50 rounded-r-full"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem.mutate(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background p-8 rounded-xl border border-border shadow-sm sticky top-32">
                <h3 className="font-heading text-xl text-primary mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>&#8377;{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg text-primary">
                    <span>Total</span>
                    <span>&#8377;{subtotal}</span>
                  </div>
                </div>
                <Button className="w-full h-12 text-lg rounded-xl" size="lg">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
