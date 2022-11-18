import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";

import { stripe } from "../../lib/stripe";

import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter(); // case FALLBACK is TRUE

  if (isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          width={520}
          height={420}
          src={product.imageUrl}
          alt="Product image"
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MnHkl3sUgiSsLq" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price?.unit_amount! / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
