import React from "react"

const AllDestinationsPage = async () => {
  const res = await fetch(`http://localhost:8000/destinations`)
  const destinations = await res.json()
  console.log(destinations)
  return <div>AllDestinationsPage</div>
}

export default AllDestinationsPage
