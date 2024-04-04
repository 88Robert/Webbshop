import { useContext } from "react";
import { APIContext } from "./BackendAPI";
import { Container, Button, Row, Col } from "react-bootstrap";

const Shop = () => {
  const { cart, setCart, products, setProducts, addOrder } =
    useContext(APIContext);
  console.log("Context value", { cart, products });

  const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item.id === productId);
    if (!removedItem) return;

    const removedQuantity = cart.filter((item) => item.id === productId).length;

    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          stock: product.stock + removedQuantity,
        };
      }
      return product;
    });
    console.log("Updated products:", updatedProducts);

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    console.log("localStorage:", localStorage.getItem("products"));
  };

  const handlePurchase = () => {
    addOrder();
  };
  return (
    <Container>
      <Row className="justify-content-center">
        {" "}
        <Col xs={12} md={3}>
          {" "}
          <br />
          <br />
          <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <span>{item.title}</span>
                    <p>Price: {item.price}</p>
                    <p>Color: {item.selectedColor}</p>
                    <p>Size: {item.selectedSize}</p>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                    <br />
                    <br />
                    <Button variant="success" onClick={handlePurchase}>
                      Purchase
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
