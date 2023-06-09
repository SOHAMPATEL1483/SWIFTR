import { Stripe } from 'stripe';
import { env } from '$env/dynamic/private';


const stripe = new Stripe(env.STRIPE_SERVER_KEY as string, { apiVersion: "2022-11-15" });
export default stripe;