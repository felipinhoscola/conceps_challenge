import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        id: 4,
        descricao: "DMA",
        unidade: "L",
        volume: 1.00,
        marca: "CORTEVA",
        peso: "1.03KG",
        preco: 64.95,
        estoque: 0,
      },
      {
        id: 3,
        descricao: "CURZATE",
        unidade: "GL",
        volume: 5.00,
        marca: "CORTEVA",
        peso: "5.01KG",
        preco: 15.79,
        estoque: 2,
      },
      {
        id: 2,
        descricao: "VIR CONTROL",
        unidade: "KG",
        volume: 5.00,
        marca: "SIMBIOSE",
        peso: "5.01KG",
        preco: 49.95,
        estoque: 10,
      },
      {
        id: 1,
        descricao: "ALION",
        unidade: "L",
        volume: 1.00,
        marca: "BAYER",
        peso: "1.1KG",
        preco: 5.90,
        estoque: 5,
      }
    ])
  }
}