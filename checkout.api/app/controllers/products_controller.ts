import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) {
    return await Product.all();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const dataRequest: any = request.body();
      let availability;
      availability = dataRequest.map(async (item: any) => {
        const product = await Product.findBy('id', item.product.id);
        if (product != null) {
          const isAvailable = product.stock >= item.product.stock ? true : false
          return { id: item.product.id, isDisponivel: isAvailable };
        }
        return response.status(404).send(`Produto ${item.product.id} não encontrado`);
      });
      return await Promise.all(availability)
    } catch (error) {
      return response.status(500).send(`Erro: ${error.message}`);
    }
  }
}