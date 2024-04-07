import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cart from '#models/cart'

export default class CartSeeder extends BaseSeeder {
  async run() {
    await Cart.create({
      id: 1,
    })
  }
}