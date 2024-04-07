import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('descricao').notNullable()
      table.string('unidade').notNullable()
      table.decimal('volume', 8, 2).notNullable()
      table.string('marca').notNullable()
      table.string('peso').notNullable()
      table.decimal('preco', 10, 2).notNullable()
      table.integer('estoque').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}