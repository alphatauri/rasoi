# Rasoi

[Headless ecommerce](https://en.wikipedia.org/wiki/Headless_commerce) built
using nextjs and mongodb functions

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
      product,
      status,
      ordered_on
    }
    ```
  - creating an order triggers an email notification
  - strip checkout on client
