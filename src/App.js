import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Services from "./pages/Services";
import Dashboard from "./pages/users/Dashboard";
import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import CustomNavbar from "./components/CustomNavbar";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/users/Home";
import UserProvider from "./context/User_Provider";
import Order from "./pages/users/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import ViewCategory from "./pages/admin/ViewCategory";
import ViewProduct from "./pages/admin/ViewProduct";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminUser from "./pages/admin/AdminUser";
import StorePage from "./pages/users/StorePage";
import ProductView from "./pages/users/ProductView";
import CategoryStorePage from "./pages/users/CategoryStorePage";
import CartProvider from "./context/CartProvider";

function App() {
	return (
		<UserProvider>
			<CartProvider>
				<BrowserRouter>
					<ToastContainer />
					<CustomNavbar />
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/about" element={<About />} />
						<Route path="/services" element={<Services />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/store" element={<StorePage />} />
						<Route path="/store/products/:productId" element={<ProductView />} />
						<Route path="/store/:categoryId/:categoryTitle" element={<CategoryStorePage />} />

						<Route path="/users" element={<Dashboard />}>
							<Route path="profile/:userId" element={<Profile />} />
							<Route path="about" element={<AboutUser />} />
							<Route path="home" element={<Home />} />
							<Route path="orders" element={<Order />} />
						</Route>

						<Route path="/admin" element={<AdminDashboard />}>
							<Route path="home" element={<AdminHome />} />
							<Route path="addProduct" element={<AddProduct />} />
							<Route path="products" element={<ViewProduct />} />
							<Route path="addCategory" element={<AddCategory />} />
							<Route path="category" element={<ViewCategory />} />
							<Route path="orders" element={<AdminOrder />} />
							<Route path="users" element={<AdminUser />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</UserProvider>
	);
}

export default App;
