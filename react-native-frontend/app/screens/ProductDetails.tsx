import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ProductDetailsPageProps } from "@/navigation/ProductsStack";
import { Product, fetchProductDetails } from "@/api/api";
import { useCartStore } from "@/state/cartStore";

export const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState(0);

  const { products, addProduct, reduceProduct } = useCartStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct,
  }));

  const fetchProduct = async () => {
    try {
      const productDetails = await fetchProductDetails(id);
      setProduct(productDetails);
    } catch (error) {
      console.error("Error Fetching Product Details:", error);
    }
  };

  const updateProductQuantity = () => {
    const result = products.filter((product) => product.id === id);

    if (result.length > 0) {
      setCount(result[0].quantity);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    updateProductQuantity();
  }, [products]);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image
            style={styles.productImage}
            source={{ uri: product.product_image }}
          />
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productCategory}>{product.product_category}</Text>
          <Text style={styles.productDescription}>
            {product.product_description}
          </Text>
          <Text style={styles.productPrice}>
            Price: ${product.product_price}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => reduceProduct(product)}
            >
              <Ionicons name="remove" size={24} color={"#1FE687"} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addProduct(product)}
            >
              <Ionicons name="add" size={24} />
            </TouchableOpacity>
          </View>
        </>
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
