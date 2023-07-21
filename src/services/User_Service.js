import { privateAxios, publicAxios } from "./Axios_Service";

//Register User
export const registerUser = async (userdata) => {
	const response = await publicAxios.post(`/users`, userdata);
	return response.data;
};

//Login User

export const loginUser = async (loginData) => {
	const response = await publicAxios.post(`/auth/login`, loginData);
	return response.data;
};

export const getUser = async (userId) => {
	return await publicAxios.get(`/users/${userId}`).then((response) => response.data);
};

//Update user
export const updateUser = async (user) => {
	return await privateAxios.put(`/users/${user.userId}`, user).then((response) => response.data);
};

//Update profile picture

export const updateUserProfilePicture = async (file, userId) => {
	if (file == null) {
		return;
	}
	const data = new FormData();
	data.append("userImage", file);
	return privateAxios.post(`/users/image/${userId}`, data).then((response) => response.data);
};

//Get all users

export const getAllUsers = async (pageNumber, pageSize, sortBy, sortDir) => {
	let result = await privateAxios.get(
		`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
	);
	return result.data;
};

//Set email to USer

export const sendEmailToUser = async (userEmail) => {
	let result = await privateAxios.post(`/users/sendOtp/${userEmail}`);
	return result.data;
};
