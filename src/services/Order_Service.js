import { privateAxios } from "./Axios_Service";

//Get all orders

export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
	let result = await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
	return result.data;
};

export const updateOrder = async (order, orderId) => {
	let result = await privateAxios.put(`/orders/${orderId}`, order);
	return result.data;
};

//Create order

export const createOrder = async (orderDetails) => {
	let res = await privateAxios.post(`/orders`, orderDetails);
	return res.data;
};

//Get order of User
export const getOrderOfUser = async (userId) => {
	let res = await privateAxios.get(`/orders/users/${userId}`);
	return res.data;
};
