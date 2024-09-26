'use client' // Error boundaries must be Client Components

import {useEffect} from 'react'

export default function Error({error, reset}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // здесь выводятся и клиентские ошибки и также и серверные
  // from Server Components show a generic message with an identifier.

  // error.digest - ид - хеш для поиска ошибки в логах сервера

  return (
    <div>
      <h2>Something went wrong!</h2>

      <p>{error.message}</p>
      <pre>{error.stack}</pre>

      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
