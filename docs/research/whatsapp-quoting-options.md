# WhatsApp options for sneaker quotations

Research date: 2026-08-13

## Executive recommendation

Keep the existing **click-to-chat** flow for now, and operate the number in the
free WhatsApp Business app. It is the lowest-friction way to collect a quote
request and is appropriate for a small catalogue with a person replying to
customers. Improve it with the app's greeting, quick replies, labels, catalog,
and QR code. Do not adopt the Business Platform / Cloud API until the business
needs structured lead storage, automatic quote/order updates, several agents in
one inbox, or automated follow-up at meaningful volume.

Before relying on the existing link, confirm that `32206770` is the complete
number intended for international WhatsApp use. The code currently puts that
eight-digit value directly in the `wa.me` path. If it is a Honduras number, the
expected international form is normally `50432206770` (digits only); this must
be verified by opening the actual link on a phone registered to the business.
The current request can be opened successfully by WhatsApp's web endpoint, but
that redirect alone cannot prove that the target number is the intended,
registered account.

## What the current implementation does

`src/components/sneaker/quote-form.tsx` collects a mandatory shoe size and, on
submit, opens:

```text
https://wa.me/${QUOTE_PHONE}?text=${encodeURIComponent(message)}
```

The prefilled message contains the sneaker model, size, and current product URL.
`src/constants/quote-phone.tsx` currently sets `QUOTE_PHONE` to `32206770`.

This is a client-side click-to-chat handoff. The application does **not** send a
WhatsApp message, create a lead in the database, use a provider, or use Meta's
Business Platform. Therefore it has no WhatsApp Platform message charge. The
buyer must review and send the prefilled text in WhatsApp, and the team must
reply there manually.

### Does it work fine?

Mostly, yes:

- The form prevents an empty size and safely URL-encodes the Spanish text and
  product URL.
- Opening the URL directly from the submit event is compatible with normal popup
  blockers because it is user initiated.
- It creates no lead history or quote status in Lucky Shoes, so abandoned or
  unanswered conversations cannot be measured from the app.
- The number is the one operational risk. Validate the complete international
  number on real mobile and desktop WhatsApp before launch; a redirect to the
  WhatsApp send page is not account validation.

## Options

| Option | What changes | WhatsApp cost | Best when |
| --- | --- | --- | --- |
| Keep click-to-chat + WhatsApp Business app | Keep the site link; configure a business profile, greeting, quick replies, labels, catalog, and QR code in the app | No Business Platform charge; WhatsApp lists short links and QR codes as free entry points | Manual quoting, low-to-moderate volume |
| Improve the quote handoff | Same as above, plus a QR code in-store/on packaging and product/catalog links | Same as above | The priority is fewer questions and faster manual replies |
| Meta WhatsApp Business Platform (Cloud API) | Add a server webhook, official Meta app/number setup, an inbox or custom admin lead queue, and templates for outbound messages | Per delivered Platform message; rate depends on recipient market and category. Service messages and utility replies in the service window are currently free; business-initiated templates can be chargeable | Tracking, automation, multiple agents, order/status notifications |
| Platform through a Meta partner | Same Platform capabilities via a partner's inbox/CRM instead of a custom build | Meta fees plus the partner's own commercial fee, which varies by vendor | A team needs an inbox/CRM quickly and accepts recurring SaaS cost |

Meta describes the Business app for businesses that manage customer chats
personally, and the Platform for programmatic communication at scale. Its app
features include a catalog, greeting, away messages, quick replies, labels,
short links, QR codes, and cart/catalog sharing. These directly support the
current quote workflow without an integration.

The Platform only becomes compelling when the website needs to receive WhatsApp
events or send messages itself. Its official pricing is variable rather than a
single fixed price: Meta charges the Platform for delivered messages by recipient
market and message category (marketing, utility, authentication, or service),
and publishes the current rate card. Rates and policies can change, so use the
live rate card rather than copying a price into the product.

## Suggested next step

1. Verify the business number and change the constant to the confirmed full
   international, digits-only number if necessary.
2. Set up the WhatsApp Business app profile, catalog and quick replies such as
   `/precio`, `/disponible`, `/envio`, and `/pago`.
3. Keep the existing form. Consider adding an optional customer name and city to
   the prefilled message only if the sales team routinely needs them.
4. Revisit Cloud API after a concrete requirement appears: saved quote leads,
   assignment/SLA reporting, automated inventory/order updates, or proactive
   follow-up with customer opt-in.

## Primary sources

- [WhatsApp Business App features](https://whatsappbusiness.com/products/business-app-features/) — official app features, including short links/QR codes as free entry points, catalog, greeting, quick replies, labels, and cart.
- [WhatsApp Business Platform features](https://whatsappbusiness.com/products/business-platform-features/) — official distinction between customer-initiated conversations and business-initiated template messages, and API capabilities.
- [WhatsApp Business Platform pricing](https://whatsappbusiness.com/products/platform-pricing/) — official live pricing model, message categories, free service/utility response rules, 72-hour free window from Click-to-WhatsApp ads/Facebook Page CTA, and rate-card link.
- [Meta announcement: QR codes and catalogs](https://about.fb.com/news/2020/07/connect-with-businesses-on-whatsapp/) — official confirmation that QR codes can open a chat with an optional pre-populated message and are available for the Business app and API.
- [ITU national numbering plans](https://www.itu.int/oth/T0202.aspx?lang=en&parent=T0202) — Honduras is assigned country calling code `+504`.

## Local evidence inspected

- `src/components/sneaker/quote-form.tsx`
- `src/constants/quote-phone.tsx`
- `package.json` (no WhatsApp API/provider SDK is installed)
