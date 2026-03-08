import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const { email, success_url, cancel_url } = await req.json();

    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1T8duzIeDXSzt8uEmN2Y83or',
        quantity: 1,
      }],
      mode: 'payment',
      success_url: success_url || 'https://example.com/success',
      cancel_url: cancel_url || 'https://example.com/cancel',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
      },
    };

    if (email) {
      sessionParams.customer_email = email;
      sessionParams.metadata.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});