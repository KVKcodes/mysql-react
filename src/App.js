import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Stock Count</th>
          <th>Purchase Order IDs</th>
          <th>Sales Order IDs</th>
          <th>Total Purchase Value</th>
          <th>Total Sales Value</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.stock_count}</td>
            <td>{item.purchase_order_ids}</td>
            <td>{item.sales_order_ids}</td>
            <td>{item.total_purchase_value}</td>
            <td>{item.total_sales_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
