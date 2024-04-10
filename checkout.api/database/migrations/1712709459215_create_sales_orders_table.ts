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
      table.decimal('product_volume', 8, 2).notNullable()
      table.decimal('product_price', 10, 2)
      table.string('product_unit')
      table.integer('product_total_quantity')
      table.decimal('product_total_price', 10, 2)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}