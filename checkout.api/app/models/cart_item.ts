import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from '#models/product';
import Cart from '#models/cart';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cartId: number
  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  @column()
  declare index: number;

  @column()
  declare productId: number;
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare quantidade: number;

  @column()
  declare preco: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}