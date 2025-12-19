import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const CheckoutForm = ({ tuition, feeAmount, closePaymentModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        if (feeAmount > 0) {
            axios.post(`${BASE_URL}/create-payment-intent`, { price: feeAmount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Failed to get client secret:", err);
                    setCardError('Failed to initialize payment process.');
                });
        }
    }, [feeAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setProcessing(true);
        setCardError('');
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            setProcessing(false);
            return;
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'Unknown',
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                transactionId: paymentIntent.id,
                amount: feeAmount,
                currency: 'bdt',
                applicationId: tuition.applicationId, 
            };
            
            const token = localStorage.getItem('tuition-access-token');

            try {
                 const res = await axios.patch(`${BASE_URL}/payments/${tuition.applicationId}`, paymentInfo, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.data.insertCount) {
                    Swal.fire({
                        title: 'Payment Successful!',
                        html: `Transaction ID: <span class="font-bold text-success">${paymentIntent.id}</span>`,
                        icon: 'success',
                        confirmButtonText: 'Done'
                    });
                    closePaymentModal(true);
                }
            } catch (error) {
                 Swal.fire('Update Failed', 'Payment succeeded, but failed to update tuition status.', 'error');
                 console.error(error);
                 closePaymentModal(false);
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 border rounded-lg bg-gray-50 mb-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            {cardError && <p className="text-error text-sm mb-4">{cardError}</p>}
            
            <div className="flex justify-end">
                <button 
                    type="submit" 
                    disabled={!stripe || !clientSecret || processing} 
                    className="btn btn-primary"
                >
                    {processing ? 'Processing...' : `Pay ৳ ${feeAmount.toLocaleString()}`}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;