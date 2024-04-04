import { useContext, useState } from "react";
import SearchBar from "./Searchbar";
import ProductDetails from "./ProductDetails";
import { APIContext } from "./BackendAPI"; // Replace 'YourContextProviderFile' with the actual file name

const Firstpage = () => {
  const { products } = useContext(APIContext); // Accessing products from the context provider
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>
              <strong onClick={() => handleClick(product)}>{product.title}</strong>
            </h2>
            <h3>BILD</h3>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div>
          <h2>Product Details</h2>
          <ProductDetails product={selectedProduct} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default Firstpage;
