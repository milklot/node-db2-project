// DO YOUR MAGIC
exports.up = async (knex) => {
	await knex.schema.createTable("cars", (table) => {
		table.increments("id")
		table.text("vin").notNull().unique()
		table.text("make").notNull()
		table.text("model").notNull()
		table.integer("mileage").notNull()
		table.text("title").defaultTo("clean")
		table.text("transmission")
	})
}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists("cars")
}