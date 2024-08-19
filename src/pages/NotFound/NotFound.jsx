import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h3 className="text-3xl text-gray-600 font-semibold">
        Something went wrong
      </h3>
      <p className="text-gray-500 text-lg">
        Sorry we were unable to find that page
      </p>
      <NavLink
        className="rounded-full py-3 px-4 text-white bg-primary text-sm"
        to="/dashboard"
      >
        Back to Dashboard
      </NavLink>
    </div>
  );
};

export default NotFound;