import { Link, Routes, Route, useNavigate, Navigate, useLocation, BrowserRouter } from "react-router-dom";
import { AuthConsumer, AuthProvider } from "./hooks";

const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;

const RequireAuth = ({ children }) => {
	const { authed } = AuthConsumer();
	const location = useLocation();

	return (authed === true) ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

const Login = () => {
	const navigate = useNavigate();
	const { login } = AuthConsumer();
	const { state } = useLocation();

	const handleLogin = () => {
		login().then(() => {
			navigate(state?.path || "/dashboard");
		});
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={handleLogin}>Log in</button>
		</div>
	);
};

const Nav = () => {
	const { authed, logout } = AuthConsumer();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/pricing">Pricing</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/settings">Settings</Link>
				</li>
			</ul>
			{authed && <button onClick={handleLogout}>Logout</button>}
		</nav>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<Nav />
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/pricing"
							element={<Pricing />}
						/>
						<Route
							path="/dashboard"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
						/>
						<Route
							path="/settings"
							element={
								<RequireAuth>
									<Settings />
								</RequireAuth>
							}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}