export default function SignupForm() {
	return (
	  <div className="flex h-screen bg-gray-100">
		{/* Left Side - Picture */}
		<div className="hidden sm:block sm:w-1/2">
		  <img src="src/assets/leftside.jpg" alt="Signup" className="h-full object-cover shadow-lg" />
		</div>
  
		{/* Right Side - Form */}
		<div className="overflow-y-auto sm:w-1/2 p-5 bg-white shadow-lg">
		  <h2 className="text-3xl font-bold flex justify-center text-gray-800 mb-6">Create an Account</h2>
		  <form className="flex flex-col space-y-4 h-auto">
			<div className="flex flex-col sm:gap-4">
				<div className="flex sm:w-full sm:flex-row sm:w-1/2 gap-8 flex-1">
					<input type="text" placeholder="First Name" className="p-2 h-12 sm:w-1/2 my-4 border rounded" />
					<input type="text" placeholder="Last Name" className="p-2 sm:w-1/2 my-4 border rounded" />
				</div>
			<input type="number" placeholder="Age" className="h-12 my-4 p-3 sm:w-full border rounded" />
			<input type="tel" placeholder="Phone" className="my-4 p-3 border rounded" />
			<input type="text" placeholder="Subjects" className=" my-4 p-3 border rounded" />
			<input type="password" placeholder="Password" className="my-4 p-3 border rounded" />
			<input type="password" placeholder="Confirm Password" className="my-4 p-3 border rounded" />
			<button className="cursor-pointer hover:scale-105 flex justify-center items-center self-center w-1/2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"><span>Submit</span></button>
			</div>
		  </form>
		</div>
	  </div>
	);
  }
  