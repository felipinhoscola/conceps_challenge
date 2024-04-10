import type { HttpContext } from '@adonisjs/core/http'
import SalesOrder from '#models/sales_order';
import db from '@adonisjs/lucid/services/db';
import Product from '#models/product';

export default class SalesOrdersController {

  async store({ request, response }: HttpContext) {
    const cartId = request.input('cart_id');
    try {
      const data = await db.from('carts')
        .where('carts.id', cartId)
        .leftJoin('cart_items', 'carts.id', '=', 'cart_items.cart_id')
        .leftJoin('products', 'cart_items.product_id', '=', 'products.id');

      data.map(async item => {
        const salesOrder = new SalesOrder();

        salesOrder.cartId = item.cart_id;
        salesOrder.productId = item.product_id;
        salesOrder.product_desc = item.description;
        salesOrder.product_brand = item.brand;
        salesOrder.product_weight = item.weight;
        salesOrder.product_price = (item.price / item.quantity)
        salesOrder.product_unit = item.unit;
        salesOrder.product_volume = item.volume;
        salesOrder.product_total_quantity = item.quantity;
        salesOrder.product_total_price = item.price;

        await salesOrder.save();
        const product = await Product.findBy('id', item.product_id);
        if (product) {
          product.stock -= salesOrder.product_total_quantity;
          await product.save();
        }
      });

      await db.from('cart_items').where('cart_id', cartId).delete();
      return response.ok({});
    } catch (error) {
      return response.status(404).send(`Erro: ${error.message}`)
    }
  }


}