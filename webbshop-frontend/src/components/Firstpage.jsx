import { useContext, useState } from "react";
import SearchBar from "./Searchbar";
import ProductDetails from "./ProductDetails";
import { APIContext } from "./BackendAPI";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Firstpage.css";

const Firstpage = () => {
  const { products } = useContext(APIContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <div>
            <br />
            <SearchBar />
          </div>
        </Col>
      </Row>
      <Row>
        <h1>Products</h1>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <div
              onClick={() => handleClick(product)}
              style={{ cursor: "pointer" }}
            >
              <h2>
                <strong>{product.title}</strong>
              </h2>
              <h3>BILD</h3>
              <p>Price: {product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
      {selectedProduct && (
        <Row>
          <Col>
            <div>
              <h2>Product Details</h2>
              <ProductDetails product={selectedProduct} onClose={handleClose} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Firstpage;
