import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51P8g7qP653pYFh8H95K9bFhL6u803Q0gE83h9YnS9i6NfS2S9gJ6e1c0y8Vb8YjFjC78c6G0w8mH7v5lI0O7v11gS'); // REPLACE THIS

const PaymentPage = ({ tuition, onClose }) => {
    const FEE_PERCENTAGE = 0.20; 
    const MIN_FEE = 500;
    const feeAmount = Math.max(MIN_FEE, Math.round(tuition.expectedSalary * FEE_PERCENTAGE));

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Service Fee Payment</h2>
            <div className="bg-base-200 p-4 rounded-lg mb-6">
                <p className="font-semibold text-lg">Tuition: {tuition.tuitionSubject} - {tuition.tuitionClass}</p>
                <p>Selected Tutor: <span className="font-medium">{tuition.tutorName}</span></p>
                <p>Expected Salary: ৳ {tuition.expectedSalary.toLocaleString()}</p>
                <p className='mt-2 text-primary font-bold'>Service Fee (20%): ৳ {feeAmount.toLocaleString()}</p>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    tuition={tuition} 
                    feeAmount={feeAmount} 
                    closePaymentModal={onClose} 
                />
            </Elements>
        </div>
    );
};

export default PaymentPage;