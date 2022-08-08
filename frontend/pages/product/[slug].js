import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyles,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProductDetails() {
  const { query } = useRouter();
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();
  //Reset Quantity
  useEffect(() => {
    setQty(1);
  }, []);

  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { title, price, description, image } = data.products.data[0].attributes;

  //Create a toast
  const notify = () => {
    toast.success(`${title} added to cart`, { duration: 1500 });
  };

  return (
    <DetailsStyles>
      <img
        loading="lazy"
        src={image.data.attributes.formats.medium.url}
        alt={title}
      />
      <ProductInfo>
        <section>
          {" "}
          <h3>{title}</h3>
          <h3>${price}</h3>
        </section>

        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyles>
  );
}
