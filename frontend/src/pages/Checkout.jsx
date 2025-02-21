import React from 'react';
import CustomerAddress from '../components/CustomerAddress';
import DeliveryDetails from '../components/DeliveryDetails';
import Payment from '../components/Payment';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  return (
    <div className="flex md:flex-row flex-col mx-auto max-w-5xl p-4">
      {/* Left Content (CustomerAddress, DeliveryDetails, Payment) */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>

        <div className="m-4">
          <CustomerAddress />
        </div>

        <div className="m-4">
          <DeliveryDetails />
        </div>

        <div className="m-4">
          <Payment />
        </div>
      </div>

      {/* Right Content (Order Summary) */}
      <div className="md:w-1/3 md:ml-4">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;