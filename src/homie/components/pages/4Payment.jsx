import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment({ selectedProduct, searchTerm }) { // Accept selectedProduct as prop
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://us-central1-homiemobie.cloudfunctions.net/api/config")
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Error loading publishable key:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Selected Product:", selectedProduct); // Log selectedProduct prop
    const productInfo = {
      productType: selectedProduct, // Use selectedProduct instead of activeProduct
    };

    fetch("https://us-central1-homiemobie.cloudfunctions.net/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Set content type to JSON
      },
      body: JSON.stringify(productInfo),
    })
      .then(async (result) => {
        if (!result.ok) {
          throw new Error("Failed to fetch client secret");
        }
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [selectedProduct]);

  const appearance = {
    theme: 'stripe'
  };

  // Pass the appearance object to the Elements instance


  return (
    <>
      {/* <h1>React Stripe and the Payment Element</h1> */}
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm selectedProduct={selectedProduct} searchTerm={searchTerm} />
        </Elements>
      ) : (
        selectedProduct ? <div>Loading...</div> : <div className="font-sriracha txt-3xl">No product selected</div>
      )}

    </>
  );
}

export default Payment;
