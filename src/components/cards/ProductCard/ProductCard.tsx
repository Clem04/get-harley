"use client"
import React from 'react';
import Image from "next/image"
import { ProductCardProps } from "~/types/product"

export default function ProductCard({ product, buttonLabel, handleClick }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-auto">
        <Image
          src={product.image}
          alt={product.name}
          priority
          width={600}
          height={600}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>

      <div className="mt-4 w-full">
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold text-center rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10"
          onClick={() => handleClick(product)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}