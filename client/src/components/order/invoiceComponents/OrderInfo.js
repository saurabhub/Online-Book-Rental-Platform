import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  orderIdContainer: {
    flexDirection: "row",
    marginTop: 36,
    // justifyContent: "flex-end",
  },
  orderDateContainer: {
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

const OrderInfo = ({ order }) => (
  <Fragment>
    <View style={styles.orderIdContainer}>
      <Text style={styles.label}>Order Id:</Text>
      <Text style={styles.invoiceDate}>{order.paymentIntent.id}</Text>
    </View>
    <View style={styles.orderDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>
        {order.paymentIntent.payment_method_types[0] == "cash"
          ? new Date(order.paymentIntent.created).toLocaleString("en-IN")
          : new Date(order.paymentIntent.created * 1000).toLocaleString(
              "en-IN"
            )}
      </Text>
    </View>
    <View style={styles.orderDateContainer}>
      <Text style={styles.label}>Total Paid: </Text>
      <Text>{(order.paymentIntent.amount / 100).toLocaleString()}</Text>
    </View>
  </Fragment>
);

export default OrderInfo;
