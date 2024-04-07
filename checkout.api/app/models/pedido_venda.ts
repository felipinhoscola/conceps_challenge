import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cart from '#models/cart'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class PedidoVenda extends BaseModel {
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
  declare produto_desc: string;

  @column()
  declare produto_marca: string

  @column()
  declare produto_peso: string

  @column()
  declare produto_preco: number

  @column()
  declare produto_unidade: string

  @column()
  declare produto_qtd_total: number

  @column()
  declare produto_preco_total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}