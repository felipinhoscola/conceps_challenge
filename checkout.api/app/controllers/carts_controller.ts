import CartItem from '#models/cart_item';
import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  /**
   * Display a list of resource
   */
  async show({ params, response }: HttpContext) {
    const cartId = params.id
    try {
      const resCart = await CartItem.query().from('cart_items').where('cart_id', cartId).orderBy('index', 'asc');
      if (resCart.length == 0) {
        return response.status(204)
      }

      const promises = resCart.map(async cartItem => {
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
        return response.status(404).send(`Produto anexado ao carrinho item ${cartItem.id}, não foi encontrado`)
      });
      return await Promise.all(promises);

    } catch (error) {
      return response.status(500).send(`Erro: ${error.message}`);
    }
  }


}