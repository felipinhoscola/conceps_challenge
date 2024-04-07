import Cart from '#models/cart';
import CartItem from '#models/cart_item';
import PedidoVenda from '#models/pedido_venda';
import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';
export default class PedidoVendasController {

    async finalizaPedido({ request, response }: HttpContext) {
        const cartId = request.param('cart_id');
        try {
            const data: any = await db.from('carts')
                .leftJoin('cart_items', 'carts.id', '=', 'cart_items.cart_id')
                .leftJoin('products', 'cart_items.product_id', '=', 'products.id');

            data.map(async item => {
                const pedidoVenda = new PedidoVenda();

                pedidoVenda.cartId = item.cart_id;
                pedidoVenda.productId = item.product_id;
                pedidoVenda.produto_desc = item.descricao;
                pedidoVenda.produto_marca = item.marca;
                pedidoVenda.produto_peso = item.peso;
                pedidoVenda.produto_preco = (item.preco / item.quantidade)
                pedidoVenda.produto_unidade = item.unidade;
                pedidoVenda.produto_qtd_total = item.quantidade;
                pedidoVenda.produto_preco_total = item.preco;

                await pedidoVenda.save();

                //nao retirarei do estoque para não ter que ficar inserindo estoque nos produtos
            });
            //deleta itens do carrinho
            await db.from('cart_items').where('cart_id', cartId).delete();
            return response.status(200).send('Pedido de Venda Gerado')
        } catch (error) {
            return response.status(404).send(`Erro: ${error.message}`)
        }
    }
}