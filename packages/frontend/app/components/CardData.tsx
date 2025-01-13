import React from "react"
import { ProductInterface } from "../../../Interfaces"

interface CardDataProps {
  products: ProductInterface[]
}

const CardData: React.FC<CardDataProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
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
      ))}
    </>
  )
}

export default CardData
