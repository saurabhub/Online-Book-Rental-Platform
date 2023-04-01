import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./invoiceComponents/InvoiceTitle";
import OrderInfo from "./invoiceComponents/OrderInfo";
import InvoiceItemsTable from "./invoiceComponents/InvoiceItemsTable";
import InvoiceThankYouMsg from "./invoiceComponents/InvoiceThankYouMessage";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Invoice = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <InvoiceTitle title="Kitaab Ghar" />
      <OrderInfo order={order}/>
      {/* <BillTo invoice={invoice}/> */}
      <InvoiceItemsTable order={order} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default Invoice;
