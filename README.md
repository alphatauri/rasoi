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
      created_at,
      updated_at
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
      created_at,
      updated_at,
      status,
    }
    ```
  - creating an order triggers an email notification
  - strip checkout on client
