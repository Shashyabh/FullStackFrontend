import { useEffect, useState } from "react";
import UserContext from "./User_Context";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isLoggedIn } from "./../auth/Helper.auth";
import { isAdminUser as adminUser } from "./../auth/Helper.auth";

const UserProvider = ({ children }) => {
	const [isLogin, setIsLogin] = useState(false);
	const [userData, setUserData] = useState(null);
	const [isAdminUser, setIsAdminUser] = useState(false);

	// userData={
	//     jwt:"",
	//     "data"
	// }

	useEffect(() => {
		setIsLogin(isLoggedIn());
		setUserData(getDataFromLocalStorage());
		setIsAdminUser(adminUser());
	}, []);

	//login

	const doLogin = (data) => {
		doLoginLocalStorage(data);
		setIsLogin(true);
		setIsAdminUser(adminUser());
		setUserData(getDataFromLocalStorage());
	};

	//logout
	const doLogout = () => {
		doLogoutFromLocalStorage();
		setIsLogin(false);
		setIsAdminUser(adminUser());
		setUserData(null);
	};

	return (
		<UserContext.Provider
			value={{
				userData: userData,
				//Can remove setUserData() and setIsLogin()
				// setUserData:setUserData,
				// setIsLogin:setIsLogin,
				isLogin: isLogin,
				login: doLogin,
				logout: doLogout,
				isAdminUser: isAdminUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
