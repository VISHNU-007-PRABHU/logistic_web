import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock for creating a Razorpay order
  http.post('/api/create-razorpay-order', async ({ request }) => {
    const orderRequest = await request.json();
    
    if (!orderRequest || typeof orderRequest.amount !== 'number') {
        return HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Simulate creating an order ID
    const mockOrderId = `order_${Date.now()}`;

    return HttpResponse.json({
      id: mockOrderId,
      entity: 'order',
      amount: orderRequest.amount,
      currency: 'INR',
      status: 'created',
    });
  }),

  // Mock for verifying a payment
  http.post('/api/verify-payment', async ({ request }) => {
    const verificationData = await request.json();

    if (!verificationData || !verificationData.razorpay_order_id || !verificationData.razorpay_payment_id) {
        return HttpResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Simulate a successful verification
    return HttpResponse.json({ status: 'success' });
  }),
];
