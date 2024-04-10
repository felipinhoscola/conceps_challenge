import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description').notNullable()
      table.string('unit').notNullable()
      table.decimal('volume', 8, 2).notNullable()
      table.string('brand').notNullable()
      table.string('weight').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('stock').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}