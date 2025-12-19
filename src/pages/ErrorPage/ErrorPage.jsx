// src/pages/ErrorPage/ErrorPage.jsx (404 Design)
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    // React Router DOM hook to catch routing errors
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-base-200">
            <h1 className="text-9xl font-extrabold text-error">
                404
            </h1>
            <h2 className="text-4xl font-bold mt-4 text-gray-800">
                Page Not Found
            </h2>
            <p className="mt-4 mb-8 text-lg text-gray-600">
                We couldn't find the page you're looking for.
                {/* Display specific error message for debugging */}
                <br />
                <span className="text-sm text-gray-500 italic">
                    {error.statusText || error.message}
                </span>
            </p>
            
            <Link to="/">
                <button className="btn btn-primary btn-lg">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;