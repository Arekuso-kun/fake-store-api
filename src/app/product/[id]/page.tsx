import { IProduct } from "@/app/_types/types";
import ProductPageComponent from "@/components/ProductPage";
import axios from "axios";

export async function generateStaticParams() {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products: IProduct[] = response.data;

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ProductPageComponent productId={params.id}></ProductPageComponent>
    </>
  );
};

export default ProductPage;
