import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales_orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned().references('id').inTable('carts')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('product_desc')
      table.string('product_brand')
      table.string('product_weight')
      table.integer('product_price')
      table.string('product_unit')
      table.integer('product_total_quantity')
      table.integer('product_total_price')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}