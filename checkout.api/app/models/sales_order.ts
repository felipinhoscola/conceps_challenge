import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cart from '#models/cart'

export default class SalesOrder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cartId: number
  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  @column()
  declare productId: number;
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare product_desc: string;

  @column()
  declare product_brand: string

  @column()
  declare product_weight: string

  @column()
  declare product_price: number

  @column()
  declare product_unit: string

  @column()
  declare product_total_quantity: number

  @column()
  declare product_total_price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}