import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>404</title>
    </Helmet>
      <h1 className='text-center text-2xl bold '>Not Found</h1>
    </>
  )
}
