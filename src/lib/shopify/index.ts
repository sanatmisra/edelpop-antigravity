const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('Error executing Shopify query');
  }
}

// -------------------------------------------------------------
// Queries and Fragments
// -------------------------------------------------------------

const productFragment = `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    seo {
      description
      title
    }
    tags
    updatedAt
  }
`;

const getProductsQuery = `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

// -------------------------------------------------------------
// Helper Methods
// -------------------------------------------------------------

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Promise<any[]> {
  try {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      tags: ['products'],
      variables: {
        query,
        reverse,
        sortKey
      }
    });

    return res.body?.data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCheckoutUrl(cartId: string): Promise<string> {
   return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${cartId}`;
}

const getProductByHandleQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export async function getProduct(handle: string): Promise<any> {
  try {
    const res = await shopifyFetch<any>({
      query: getProductByHandleQuery,
      tags: ['products'],
      variables: {
        handle
      }
    });

    return res.body?.data?.product || null;
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    return null;
  }
}

const cartCreateMutation = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCart(lines: { merchandiseId: string; quantity: number }[]): Promise<string | null> {
  try {
    const res = await shopifyFetch<any>({
      query: cartCreateMutation,
      variables: {
        input: {
          lines
        }
      },
      cache: 'no-store'
    });

    const cart = res.body?.data?.cartCreate?.cart;
    if (!cart) {
      console.error('Failed to create cart:', res.body?.data?.cartCreate?.userErrors);
      return null;
    }

    return cart.checkoutUrl;
  } catch (error) {
    console.error('Error in createCart:', error);
    return null;
  }
}

