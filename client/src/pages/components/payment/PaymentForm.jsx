import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import useFetch from "../../../hooks/useFetch"

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "black",
            color: "#black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#black" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "red"
        }
    }
}



export default function PaymentForm({ amount, b_id }) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    // const { data, loading, error, reFetch } = useFetch(`/booking/${b_id}`);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                console.log("b_id", b_id);
                const { id } = paymentMethod
                console.log(id, paymentMethod);
                const response = await axios.post(`/booking/payment`, {
                    amount: amount * 100,
                    id
                })
                console.log('this is response from servser:', response);
                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true);
                    console.log(1, b_id);
                    await axios.put(`/booking/${b_id}`, {
                        isPaid: true
                    });

                    //data.isPaid = true;
                    window.location.reload(false);
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    { <h2>Pay booking Successfully!</h2>}
                </div>
            }

        </>
    )
}
