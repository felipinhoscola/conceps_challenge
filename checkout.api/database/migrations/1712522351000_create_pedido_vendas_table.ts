import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedido_vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned().references('id').inTable('carts')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('produto_desc')
      table.string('produto_marca')
      table.string('produto_peso')
      table.integer('produto_preco')
      table.string('produto_unidade')
      table.integer('produto_qtd_total')
      table.string('produto_preco_total')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}