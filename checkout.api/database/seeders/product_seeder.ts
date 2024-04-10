import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        id: 4,
        description: "DMA",
        unit: "L",
        volume: 1.00,
        brand: "CORTEVA",
        weight: "1.03KG",
        price: 64.95,
        stock: 0,
      },
      {
        id: 3,
        description: "CURZATE",
        unit: "GL",
        volume: 5.00,
        brand: "CORTEVA",
        weight: "5.01KG",
        price: 15.79,
        stock: 2,
      },
      {
        id: 2,
        description: "VIR CONTROL",
        unit: "KG",
        volume: 5.00,
        brand: "SIMBIOSE",
        weight: "5.01KG",
        price: 49.95,
        stock: 10,
      },
      {
        id: 1,
        description: "ALION",
        unit: "L",
        volume: 1.00,
        brand: "BAYER",
        weight: "1.1KG",
        price: 5.90,
        stock: 5,
      }
    ])
  }
}