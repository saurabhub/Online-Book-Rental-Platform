import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableComponents/InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableComponents/InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableComponents/InvoiceTableFooter';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({order}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow order={order} />
        {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
        <InvoiceTableFooter order={order} />
    </View>
  );
  
  export default InvoiceItemsTable