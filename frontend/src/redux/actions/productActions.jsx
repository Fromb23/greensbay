import productAxios from "../../api/productAxios";

export const fetchProducts = async () => {
  const response = await productAxios.get("/fetch-products");
  console.log("Fetched products", response.data);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await productAxios.get("/fetch-categories");
  console.log("Fetch Categories in actions:", response.data);
  return response.data;
};


export const createProduct = async (productData) => {
  const response = await productAxios.post("/create-product", productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await productAxios.delete(`/remove-product${id}`);
};