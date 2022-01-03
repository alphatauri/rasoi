# Rasoi

A small [headless](https://en.wikipedia.org/wiki/Headless_commerce) online
store built using nextjs, mongodb, and stripe. The home page is a [generated
product
listing](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
that is rebuilt every time there is a change in products collection.

## Uses

- [mongo data api](https://docs.atlas.mongodb.com/api/data-api/) to interact with the mongodb database.
- [mongo realm triggers](https://docs.mongodb.com/realm/triggers/trigger-types/) to trigger nextjs redeploy hook.
- [stripe checkout](https://stripe.com/docs/payments/checkout) for payments.

## DB

- products collection

  ```
  {
    _id,
    name,
    description,
    images,
    price,
  }
  ```

  - creating a products triggers nextjs build SSG
  - view products
  - order them
  - (optional) cart feature
  - (optional) cart checkout

- orders collection
  ```
  {
    _id,
    sessionId,
    email,
    amount,
    items
  }
  ```
  - creating an order triggers an email notification
  - stripe checkout on client
