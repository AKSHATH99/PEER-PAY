// This is the API route for creating a Razorpay order. This will be used to create a new order for a user and the response 
// will be sent to the client for confirmation of the order.

import { razorpay } from "../../../lib/Razorpay";

export async function POST(req) {
  try {
    const { amount, currency = "INR" } = await req.json();

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return Response.json({
      success: true,
      amount: order.amount,
      currency: order.currency,
      id: order.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
