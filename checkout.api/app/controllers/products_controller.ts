import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'

//interface
interface IProductEstoqueData {
  produto: {
    id: number;
    estoque: number;
  }
}
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
      const dataRequest = request.body() as IProductEstoqueData | IProductEstoqueData[];
      let disponibilidade;
      if (Array.isArray(dataRequest)) {
        disponibilidade = dataRequest.map(async item => {
          const product = await Product.findBy('id', item.produto.id);
          if (product != null) {
            const isDisponivel = item.produto.estoque <= product.estoque ? true : false;
            return { id: item.produto.id, isDisponivel };
          }
          return response.status(404).send(`Produto ${item.produto.id} não encontrado`);
        });
      } else {
        const product = await Product.findBy('id', dataRequest.produto.id);
        if (product != null) {
          const isDisponivel = dataRequest.produto.estoque <= product.estoque ? true : false;
          disponibilidade = [{ id: dataRequest.produto.id, isDisponivel }];
        } else {
          return response.status(404).send(`Produto ${dataRequest.produto.id} não encontrado`);
        }
      }
      return await Promise.all(disponibilidade)
    } catch (error) {
      return response.status(500).send(`Erro: ${error.message}`);
    }
  }
}