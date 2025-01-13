"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { ProductInterface } from "../../../Interfaces"

export default function ProductsPage() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if ((session as any)?.accessToken) {
      fetchProducts()
    }
  }, [session, currentPage])

  const fetchProducts = async () => {
    setShowLoader(true)
    try {
      const response = await fetch(
        `http://localhost:8080/api/products?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
          cache: "force-cache",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
    setShowLoader(false)
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showLoader ? (
          <span className="loader">L &nbsp; ading</span>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-lg">${product.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
