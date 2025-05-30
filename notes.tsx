/**
 * Notes for square and stripe and payment gateways.
 *
 *
 * Payment gateways are a way the service transmits payments from website to processor.
 * It acts as the bridge between your application, bank, customer bank, and the payment processor.
 *
 * Square and Stripe are two popular payment gateways. They encrypt card data and communicate with banks. A payment processor
 * is the system that moves money by communicating with issuing and acquiring banks - it verikfies funs, approces
 * transaction, and transfers funds to the merchant's account. In practice, modern providers
 * like sqare and Stripe bundle both gateway and processing functionality for you so as a dev
 * you don't have to worry about the details of how the payment is processed.
 *
 * APIS handle that under the hood.
 *
 * Tokenization and PCI compliance -
 *
 * Tokenization is a security mechanism tha treplaces sensitive data with a random token. This means
 * youre application never directly sees or stores the card number only a token that represents that card.
 *
 * When using Stripe or Squares front end libraries, the card details are sent directly to their servers which
 * return a token representing that card. Your server then uses this token to process payments without ever
 * handling the sensitive card data directly. This is crucial for PCI compliance, which is a set of security standards
 *
 * Letting stripe/Square handle card info you reduce your compliance burden by a drastic amount.
 *Stripe notres that if you use thier Elements or Checkout to teokenize card data
 * Bottom line: Always use the provided SDKs to tokenize payment info on tjhe client side.
 * never collect credit card numbers in plain form always use the provided SDKs to tokenize payment info on the client side.
 *
 * souliton artichect, someone who can look at a problem and come up with a solution
 *
 * Solution engineer, someone who can understand a problem and come up with a solution
 *
 * they differ from a software engineer in that they are not just writing code, but also
 * understanding the problem and coming up with a solution that works for the client.
 *
 * have clients come to you and what problems they are happening and she becomes an investigator
 *
 * what kinda job are you looking for?
 * Even if you land a job yoiu dont want it can lead you to a job you do want.
 * iiiiikikki9iikikikuikjkp'88
 * stronger assets are your ability to understand a problem and come up with a solution can be applied to many roles.
 * treat connecting at networking events like speed dating, you want to get to know the person and get them to love you and your skills.
 *
 * Consultant and designer,
 * have some confidence and learn to clearly articulate your skills and how they can help the client. it can excel your career in any tech role
 * When you are looking for jobs u8
 *
 * think of 3 career roles and how you can apply your skills to those roles. and apply for those roles.
 *
 * nothing is permanent, you can always change your mind and pivot to a different role.
 * p your diversity
 * reparing for 3 increases
 *
 *
 * audit logs, aiudit trails, get access to applications and review breaches and security issues.who you are where you are your ip where your traveling what you have been doing
 *
 *
 * SHARE YOUR SKILLS AND KNOWLEDGE WITH OTHERS, IT CAN HELP YOU LEARN AND GROW.
 *
 *
 * lean on your network, ask for referrals, and reach out to people in your network.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * /** @format */
