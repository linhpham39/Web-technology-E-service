import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51NO3EwGJKXpqwm9HFCFl7NV9HSTnQt9g5AXNm3wSZr9ahxmDvixKu64B90sOwNBT5STZ5pWstiG2bD0LoKE9cxQ000aeL3vBW5"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
