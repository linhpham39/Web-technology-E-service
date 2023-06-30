import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


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

export default function PaymentForm({amount}) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            console.log(id, paymentMethod);
            const response = await axios.post(`/booking/payment`, {
                amount: amount * 100,
                id
            })
            console.log('this is response from servser:',response);
            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
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
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>Pay booking Successfully!</h2>
       </div> 
        }
            
        </>
    )
}
