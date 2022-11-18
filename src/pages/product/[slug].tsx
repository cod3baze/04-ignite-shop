import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from "../../styles/pages/product";

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          vitae, nemo delectus enim beatae nesciunt illo animi aut ipsam odio
          amet quia ut ex ea obcaecati mollitia, sed impedit magni?
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
