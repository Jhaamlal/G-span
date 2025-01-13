import { Request, Response } from "express"
import { ProductInterface } from "../../../Interfaces"

const productsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = 10
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    const allProducts: ProductInterface[] = await response.json()

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = allProducts.slice(startIndex, endIndex)

    res.json({
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(allProducts.length / limit),
      totalProducts: allProducts.length,
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" })
  }
}
export { productsController }
