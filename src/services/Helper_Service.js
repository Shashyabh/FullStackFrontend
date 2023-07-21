// export const BASE_URL=`http://localhost:7070`;

export const BASE_URL = `shashyabhray.up.railway.app`;
export const getProductImageUrl = (productId) => {
	return `${BASE_URL}/products/image/${productId}`;
};

export const formateDate = (time) => {
	// var options={
	//     weekday:"long",
	//     year:"numeric",
	//     month:"long",
	//     day:"numeric"
	// }
	// return new Date(time).toLocaleDateString("hi-IN",Option);
	// return new Date(time).toLocaleDateString("en-US",options);

	if (!time) {
		return null;
	}
	const date = new Date(time);
	return date.toLocaleString();
};

export const getUserImageUrl = (userId) => {
	return `${BASE_URL}/users/image/${userId}`;
};
