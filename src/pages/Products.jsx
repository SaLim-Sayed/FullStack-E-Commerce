import ProductCard from "../components/products/ProductCard";

import { Grid } from "@chakra-ui/react";
import axios from "axios";
import { URL } from "../store/type";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/products/ProductSkeleton";
const Products = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${URL}/api/products?populate=thumbnail,category&sort=createdAt:DESC`
    );
    return data;
  };

  const { data, isLoading } = useQuery("products", () => getProductList());

  if (isLoading)
    return (
      <Grid
        margin={30}
        justifyItems={"center"}
        templateColumns={"repeat(auto-fill, minmax(300px,1fr))"}
        gap={6}
      >
        {Array.from({ length: 8}).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    );
   
  return (
    <Grid
      margin={30}
      justifyItems={"center"}
      templateColumns={"repeat(auto-fill, minmax(300px,1fr))"}
      gap={6}
    >
      {data.data.map((product) => (
        <ProductCard key={product.id} id={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default Products;

// const [products, setProducts] = useState([]);
// useEffect(
//   () => {
//     (() => {
//       axios
//         .get(
//           "http://localhost:1337/api/products?populate=thumbnail,category&sort=createdAt:DESC"
//         )
//         .then((res) => {
//           setProducts(res.data.data);
//         })
//         .catch((err) => console.log(err));
//     })();
//   },
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   []
// );
