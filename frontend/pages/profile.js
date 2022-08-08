import { useRouter } from "next/router";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  orders.map((orderr) => {
    console.log(orderr);
  });
  return (
    user && (
      <div>
        <OrderInfo>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <Button>
            <button onClick={() => route.push("/api/auth/logout")}>
              Logout
            </button>
          </Button>
        </OrderInfo>

        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <h1>Order number : {order.id}</h1>
              <h2>Amount : {formatMoney(order.amount)}</h2>
              <div>
                <h1>Receipt Email : {user.email}</h1>
              </div>
            </Order>
          ))}
        </div>
      </div>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;

  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    padding: 2rem 0rem;
    color: var(--secondary);
  }
`;

const OrderInfo = styled.section`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  button {
    background-color: #222;
    border-radius: 4px;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    margin: 0;
    max-width: none;
    min-height: 44px;
    min-width: 10px;
    outline: none;
    overflow: hidden;
    padding: 9px 20px 8px;
    position: relative;
    text-align: center;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100px;
  }
`;
