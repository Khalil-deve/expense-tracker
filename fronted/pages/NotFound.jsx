import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>

      <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
        OOPS! PAGE NOT FOUND
      </h3>

      <div className="text-red-600 text-7xl md:text-9xl font-bold mb-4">
        404
      </div>

      <h2 className="text-md md:text-lg text-gray-600 max-w-xl">
        WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
      </h2>

      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}
