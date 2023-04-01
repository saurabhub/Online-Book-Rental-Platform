import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ order }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {Number.parseFloat(order.cartTotal).toFixed(2)}
        </Text>
      </View>

      {order.totalAfterDiscount && (
        <View style={styles.row}>
          <Text style={styles.description}>TOTAL AFTER DISCOUNT</Text>
          <Text style={styles.total}>
            {Number.parseFloat(order.paymentIntent.amount / 100).toFixed(2)}
          </Text>
        </View>
      )}
    </>
  );
};

export default InvoiceTableFooter;
