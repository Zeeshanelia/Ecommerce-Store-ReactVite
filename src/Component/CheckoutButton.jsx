
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_live_51RdAaS07fQfDbTFlYbLiqPDQoiVpE7JksoD4Z6rRycBdHdx9aayGQq0t7wWz5Kr26Fb5jfeJrXXNKPrFsrWfEVJY00V4KmwCTEs");

export default function CheckoutButton() {
  const handle = async () => {
    const stripe = await stripePromise;
    // redirectToCheckout with a pre-created price ID
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_XXXXXXXX", quantity: 1 }],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });
    if (error) console.error(error);
  };

  return <button onClick={handle}>Pay (Test)</button>;
}
