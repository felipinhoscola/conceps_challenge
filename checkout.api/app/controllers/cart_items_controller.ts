import type { HttpContext } from '@adonisjs/core/http'
import CartItem from '../models/cart_item.js';
import Product from '../models/product.js';

export default class CartItemsController {
  /**
   * Display a list of resource
   */
  async list({ }: HttpContext) {
    return await CartItem.all();
  }

  //Como so vai ter um carrinho,
  async addItem({ request, response }: HttpContext) {
    const productId = request.param('product_id');
    const cartId = 1;//Nesse caso so tem um carrinho
    try {
      const product = await Product.findBy('id', productId);
      const cartItem = await CartItem.findBy('product_id', productId);
      if (product == null) {
        return response.status(404).send('Produto não encontrado!');
      }
      if (cartItem == null) {
        const newcartItem = new CartItem;
        newcartItem.productId = productId;
        newcartItem.cartId = cartId;
        newcartItem.index = (await CartItem.all()).length == 0 ? 1 : (await CartItem.all()).length + 1;//adiciona no final da lista de produtos

        newcartItem.preco = product.preco;
        newcartItem.quantidade = 1;
        await newcartItem.save();
        return newcartItem;
      } else {
        cartItem.quantidade++
        cartItem.preco = product.preco * cartItem.quantidade;
        return await cartItem.save();
      };
    } catch (error) {
      return response.status(500).send('Erro ao adicionar item ao carrinho: ' + error.message)
    }
  }

  async updateQuantidade({ request, response }: HttpContext) {
    const quantidade = request.param('quantidade') //ja transforma em string
    const produtoID = request.param('product_id');

    try {
      const cartItem = await CartItem.findBy('product_id', produtoID);
      if (cartItem == null) {
        return response.status(400).send("Id do carrinho item não encontrado");
      }
      const product = await Product.findBy('id', cartItem.productId);
      if (product == null) {
        return response.status(400).send("Produto não encontrado");
      }
      if (quantidade <= 0) {
        cartItem.delete()
        return (response.status(200).send('Produto removido do carrinho'))
      }
      cartItem.quantidade = parseInt(quantidade);
      cartItem.preco = product!.preco * cartItem.quantidade;
      await cartItem.save();
      return cartItem
    } catch (error) {
      return response.status(500).send('Erro ao adicionar item ao carrinho: ' + error.message)
    }

  }

  async removeItem({ request, response }: HttpContext) {
    const product_id = request.param('product_id');

    try {
      const cartItem = await CartItem.findBy('product_id', product_id)
      if (cartItem != null) {
        await cartItem.delete()
        return response.status(200).send('Produto removido do carrinho')
      }
      return response.status(400).send(`Carrinho com item ${product_id}, não foi encontrado!`)
    } catch (error) {
      return response.status(404).send(`Erro: ${error.message}`)
    }
  }

}
