import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
  CartModal: undefined;
};

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

export type ProductsPageProps = NativeStackScreenProps<
  ProductsStackParamList,
  "Products"
>;
export type ProductDetailsPageProps = NativeStackScreenProps<
  ProductsStackParamList,
  "ProductDetails"
>;
export type StackNavigation = NavigationProp<ProductsStackParamList>;

const ProductsStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1FE687",
        },
        headerTintColor: "#141414",
        headerRight: () => <CartButton />,
      }}
    >
      <ProductsStack.Screen
        name="Products"
        component={Products}
        options={{ headerTitle: "Neon Shop" }}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerTitle: "" }}
      />
      <ProductsStack.Screen
        name="CartModal"
        component={CartModal}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </ProductsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
