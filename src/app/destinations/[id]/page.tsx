import React from "react"

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params
  const res = await fetch(`http://localhost:8000/destination/${id}`)
  const data = await res.json()
  console.log(data)
  return <div>DestinationDetailsPage</div>
}

export default DestinationDetailsPage
