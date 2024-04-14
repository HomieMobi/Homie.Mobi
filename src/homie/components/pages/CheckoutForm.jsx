import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { pushFormDataToDatabase } from "../../../firebaseConfig";
import stripelogo from "../../../assets/stripelogo.svg";

import { HiOutlineInformationCircle } from "react-icons/hi";


const getPrice = (selectedProduct) => {
  switch (selectedProduct) {
    case 'domain':
      return 25.00;
    case '2D':
      return 320.00;
    case '3D':
      return 640.00;
    default:
      return 0.00; // Default price if product is not recognized
  }
};

export default function CheckoutForm({ selectedProduct, searchTerm }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formStep, setFormStep] = useState(1); // Track the form step

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidEmail = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      billing_details: {
        email: email,
        name: name,
        phone: null
      },
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        receipt_email: email,

      },
      redirect: 'if_required',
    });



    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage("Payment status: " + paymentIntent.status + "!!");
      setFormStep(3); // Set formStep to 3 if payment is successful
      pushFormDataToDatabase({ name, email, selectedProduct, searchTerm: searchTerm || null, price: getPrice(selectedProduct) });
    } else {
      setMessage("Unexpected State")
    }

    setIsProcessing(false);
  };
  const handleNextStep = () => {
    if (email && name && isValidEmail(email)) {
      setFormStep(2); // Proceed to form step 2 if email, name, and email are valid
    }
  };

  const paymentElementOptions = {
    layout: 'accordion',
    paymentMethodOrder: ['card']
  };

  const handleCancel = () => {
    setFormStep(1); // Go back to form step 1
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative w-full h-full">
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center bg-black bg-opacity-50 pt-6 px-2 z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="modal-content bg-black text-white text-md p-4 rounded-lg flex flex-col">
              <div className="w-full flex justify-end text-xl">
                <span className="close  cursor-pointer" onClick={toggleModal}>&times;</span>
              </div>
              <p className="text-md">We utilize Stripe's API to securely process payments. Upon submission, Homie.Mobi receives your name and email for contact purposes, while your card information and payment are securely managed by Stripe. Please note that Homie.Mobi neither observes, retains, nor accesses your card details.</p>

            </div>
            <div className="py-2 px-4 bg-white text-xl  border-black border-2 rounded-lg cursor-pointer" onClick={toggleModal}>Close</div>
          </div>

        </div>
      )}
      <form className="w-full h-full " id="payment-form" onSubmit={handleSubmit}>
        {/* Step 1: Display email and name input fields */}
        {formStep === 1 && (
          <div className="w-full h-full flex justify-center items-center bg-gray-100 ">
            <div className="w-5/6 h-fit  p-4 bg-white flex flex-col gap-4 rounded-xl border-2 shadow-lg">


              <div className="text-xl font-bold pb-2 flex flex-col gap-0 ">
                <div className="w-full flex justify-end">
                  <img src={stripelogo} alt="Stripe Logo" className="h-8 w-auto mr-0" />
                  <HiOutlineInformationCircle className="h-6 w-auto " onClick={toggleModal} />
                </div>
                <div>Contact</div>
              </div>

              <div className='h-60  flex flex-col  justify-center gap-6 '>
                <div className="flex flex-col gap-2 pt-2">
                  <p>Your Name:</p>
                  <input
                    className="w-full p-2 border-black border-2 shadow-inner shadow-gray-400"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Your Email:</p>
                  <input
                    className=" w-full p-2 border-black border-2 shadow-inner shadow-gray-400"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="product-info flex justify-between text-xl">
                  {/* Display product name and price */}
                  <p>{selectedProduct}</p>
                  <p>{searchTerm}.mobi</p>
                </div>
                <div className="bg-white h-14 w-full flex items-center justify-between">
                  <div> Total:</div>
                  {/* Render total amount based on selected product */}
                  {selectedProduct === 'domain' && <div className="border-b-4   border-double  border-red-400">$25.00 USD</div>}
                  {selectedProduct === '2D' && <div className="border-b-4 border-double border-red-400">$320.00 USD</div>}
                  {selectedProduct === '3D' && <div className="border-b-4 border-double border-red-400">$640.00 USD</div>}
                </div>
              </div>
              <div className=" w-full h- flex justify-end items-end p-6">
                <button className="border-2 rounded-lg border-black h-fit py-2 w-40" onClick={handleNextStep}>Checkout</button>
              </div>
            </div>
          </div>

        )
        }

        {/* Step 2: Display payment element */}
        {
          formStep === 2 && (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center ">

              <div className="h-fit flex flex-col  items-center z-30 bg-black bg-opacity-50 w-full px-4 py-8">
                <div className="w-full bg-gray-50 py-4 flex flex-col px-4 rounded-2xl">
                  <div className="text-xl font-bold pr-0 flex flex-col gap-0  w-">
                    <div className="w-full flex justify-end pr-2">
                      <img src={stripelogo} alt="Stripe Logo" className="h-8 w-auto mr-0 " />
                      <HiOutlineInformationCircle className="h-6 w-auto " onClick={toggleModal} />
                    </div>

                  </div>
                  <PaymentElement
                    id="payment-element"
                    options={paymentElementOptions}
                  />
                  <div className="w-full flex justify-center gap-4 items-center ">
                    <button className="px-2 py-2 mt-2 border-red-600 border-2  h-fit rounded-lg" onClick={handleCancel}>cancel</button>
                    <button className=" border-2 cursor-pointer bg-blue-500 hover:bg-blue-600 w-2/3 rounded mt-2 p-2 py-2" disabled={isProcessing || !stripe || !elements} id="submit">
                      <span className="text-white" id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                      </span>
                    </button>
                  </div>
                  {/* Show any error or success messages */}
                  {message && <div id="payment-message">{message}</div>}
                </div>
              </div>
            </div>
          )
        }

        {/* Step 3: Display success message */}
        {formStep === 3 && (
          <div className="h-full flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white text-2xl p-4 border-green-500 border-8 border-double">
              Success! Thank You
            </div>
          </div>
        )}
      </form >
    </div>
  );
}
