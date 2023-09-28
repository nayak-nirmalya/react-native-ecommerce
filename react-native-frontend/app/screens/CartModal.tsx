import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";

import { StackNavigation } from "@/navigation/ProductsStack";
import { Order, createOrder } from "@/api/api";
import { useCartStore } from "@/state/cartStore";

export const CartModal = () => {
  const { products, total, reduceProduct, addProduct, clearCart } =
    useCartStore((state) => ({
      products: state.products,
      total: state.total,
      reduceProduct: state.reduceProduct,
      addProduct: state.addProduct,
      clearCart: state.clearCart,
    }));
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const onSubmitOrder = async () => {
    setSubmitting(true);
    Keyboard.dismiss();
    try {
      const response = await createOrder({
        email,
        products: products.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
        })),
      });
      setOrder(response);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Text>CartModal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1FE687",
  },
  cartItemContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemQuantity: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#1FE687",
    padding: 5,
    width: 30,
    color: "#fff",
    textAlign: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  inactive: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#1FE687",
    fontSize: 16,
    fontWeight: "bold",
  },
});
