import type { HttpContext } from '@adonisjs/core/http'
import CartItem from '#models/cart_item';
import Product from '#models/product';

export default class CartItemsController {

  async store({ request, response }: HttpContext) {
    const cartId = request.input('id');
    const productId = request.input('product_id')
    try {
      const product = await Product.findBy('id', productId);
      const cartItem = await CartItem.findBy('product_id', productId);
      if (product == null) {
        return response.status(404).send('Produto não encontrado!');
      }
      if (cartItem == null) {
        const newCartItem = new CartItem;
        newCartItem.productId = productId;
        newCartItem.cartId = cartId;
        newCartItem.index = (await CartItem.all()).length == 0 ? 1 : (await CartItem.all()).length + 1;

        newCartItem.price = product.price;
        newCartItem.quantity = 1;

        return response.ok(await newCartItem.save());
      } else {
        cartItem.quantity++
        cartItem.price = product.price * cartItem.quantity;

        return response.ok(await cartItem.save());
      };
    } catch (error) {
      return response.status(500).send('Erro ao adicionar item ao carrinho: ' + error.message)
    }
  }

  async update({ params, request, response }: HttpContext) {
    const cartId = params.id
    const produtoId = request.input("product_id")
    const quantity = request.input("quantity")

    try {
      const cartItem = await CartItem.query().where("product_id", produtoId).andWhere("cart_id", cartId).first();
      const product = await Product.findBy('id', produtoId);
      if (cartItem == null) {
        return response.status(404).send("Não existe carrinho com esse produto");
      }
      if (product == null) {
        return response.status(404).send("Produto não encontrado");
      }
      cartItem.quantity = parseInt(quantity);
      cartItem.price = product.price * cartItem.quantity;

      return response.ok(await cartItem.save());
    } catch (error) {
      return response.status(500).send('Erro ao adicionar item ao carrinho: ' + error.message)
    }
  }

  async destroy({ params, response }: HttpContext) {
    const productId = params.id;
    try {
      const cartItem = await CartItem.findBy('product_id', productId)
      if (cartItem != null) {
        return response.ok(await cartItem.delete()); //vai retornar vazio
      }
      return response.status(404).send('Carrinho com o produto informado não foi encontrado');
    } catch (error) {
      return response.status(500).send(`Erro: ${error.message}`)
    }
  }

}
