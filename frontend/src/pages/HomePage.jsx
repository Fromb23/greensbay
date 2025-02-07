import Header from "../components/Header";
import Footer from "../components/Footer";

const Homepage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow">
				<h1 className="text-red-500">Welcome to My Vite App</h1>
				<p>This is the homepage of your React Vite app.</p>
				</div>

			<Footer />
	  </div>
	);
  };
  
  export default Homepage;
  