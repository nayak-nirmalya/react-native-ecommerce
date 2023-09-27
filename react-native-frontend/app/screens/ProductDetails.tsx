import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

import { ProductDetailsPageProps } from "@/navigation/ProductsStack";
import { Product, fetchProductDetails } from "@/api/api";

export const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const productDetails = await fetchProductDetails(id);
      setProduct(productDetails);
    } catch (error) {
      console.error("Error Fetching Product Details:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <Image
          style={styles.productImage}
          source={{ uri: product.product_image }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  productName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  productCategory: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
  productDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  productPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    borderColor: "#1FE687",
    borderWidth: 2,
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
