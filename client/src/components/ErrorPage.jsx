import React from 'react'
import { Link } from 'react-router'

function ErrorPage() {
  return (
    <div>
       <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-600 ">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p  style={{marginTop:"15px"}}  className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div style={{marginTop:"15px"}} className="mt-10 flex items-center justify-center gap-x-5">
            <Link 
            style={{padding:"10px"}}
              to="/"
              className="rounded-md bg-indigo-600 text-xl font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go back home
            </Link>
            <Link to="#" className="text-xl font-semibold text-gray-900 underline">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ErrorPage
