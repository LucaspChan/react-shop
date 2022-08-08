import { ProductStyles } from "../styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  const { title, price, image, slug } = product.attributes;
  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <picture>
          <img
            loading="lazy"
            src={image.data.attributes.formats.small.url}
            alt={title}
          />
        </picture>
      </Link>
      <h2>{title}</h2>
      <h3>${price}</h3>
    </ProductStyles>
  );
}
