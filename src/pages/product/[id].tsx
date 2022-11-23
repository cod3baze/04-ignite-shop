import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Stripe from "stripe";
import Head from "next/head";
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
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);

  const { isFallback } = useRouter(); // case FALLBACK is TRUE

  async function handlerBuyProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (e) {
      // Conectar com uma ferramenta de observabilidade (Sentry | Datadog)
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao Checkout!");
    }
  }

  if (isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop 04</title>
      </Head>

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

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handlerBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
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
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
