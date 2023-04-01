import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ order }) => {
  const rows = order.products.map((p, i) => (
    <View style={styles.row} key={i}>
      <Text style={styles.description}>{p.product.title}</Text>
      <Text style={styles.qty}>{p.count}</Text>
      <Text style={styles.rate}>{p.product.price}</Text>
      <Text style={styles.amount}>{(p.count * p.product.price).toFixed(2)}</Text>    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
