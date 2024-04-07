import CartItem from '#models/cart_item';
import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  /**
   * Display a list of resource
   */
  async list({ request, response }: HttpContext) {
    try {
      const cartId = request.param('cartId');

      const dataCart = await CartItem.findManyBy('cart_id', cartId)
      if (dataCart.length == 0) {
        return response.status(204).send([]);
      }

      const promises = dataCart.map(async cartItem => {
        const productData = await Product.findBy('id', cartItem.productId)
        if (productData != null) {
          return {
            produto: {
              id: productData.id,
              descricao: productData.descricao,
              unidade: productData.unidade,
              marca: productData.marca,
              peso: productData.peso,
            },
            index: cartItem.index,
            quantidade: cartItem.quantidade,
            preco: cartItem.preco
          };
        }
        return response.status(404).send('Carrinho Vazio'); //Caso retorne 204 o carrinho esta vazio
      });
      const result = await Promise.all(promises);
      //ordena por index, pois não achei como ordernar pelo findby, esta mostrando como erro, porem esta funcionando
      return result.sort((a, b) => a.index - b.index);

    } catch (error) {
      return response.status(500).send(`Erro: ${error.message}`);
    }
  }

}