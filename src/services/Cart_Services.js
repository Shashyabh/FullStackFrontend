import { privateAxios } from "./Axios_Service";

//Get Cart
export const getCart = async (userId) => {
	const res = await privateAxios.get(`/carts/${userId}`);
	return res.data;
};

//Add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
	const res = await privateAxios.post(`/carts/${userId}`, { productId, quantity });
	return res.data;
};

//Clear Cart
export const clearCart = async (userId) => {
	const res = await privateAxios.delete(`/carts/${userId}`);
	return res.data;
};

//Remove item form cart

export const removeItemFromCart = async (userId, itemId) => {
	const res = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
	return res.data;
};
