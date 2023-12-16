import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";

import OrderCard from "./OrderCard";
import { Order } from "../../types";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  canViewStatus: boolean;
}

const OrderList: React.FC<Props> = ({ canViewStatus }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  const cancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${config.API_URL}/patients/orders/${orderId}`);
      // Update the local state of orders
      setOrders((orders) => orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  const successfulOrders = orders.filter((order) => order.orderStatus === "successful");
  const unsuccessfulOrders = orders.filter((order) => order.orderStatus !== "successful");

  return (
    <>
      {successfulOrders.length > 0 && (
        <>
          <Box ml={5}>
            <Typography variant="h4" gutterBottom component="div" color="primary">
              Current Orders
            </Typography>
          </Box>

          {successfulOrders.map((order, index) => (
            <OrderCard key={index} order={order} canViewStatus={canViewStatus} onCancel={cancelOrder} />
          ))}
        </>
      )}

      {unsuccessfulOrders.length > 0 && (
        <>
          <Box ml={5}>
            <Typography variant="h4" gutterBottom component="div" color="primary">
              Past Orders
            </Typography>
          </Box>

          {unsuccessfulOrders.map((order, index) => (
            <OrderCard key={index} order={order} canViewStatus={canViewStatus} onCancel={cancelOrder} />
          ))}
        </>
      )}
    </>
  );
};

export default OrderList;
