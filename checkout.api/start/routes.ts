/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/products_controller'
import CartItemsController from '#controllers/cart_items_controller'
import CartsController from '#controllers/carts_controller'
import PedidoVendasController from '#controllers/pedido_vendas_controller'

router.get('api/products/list', [ProductsController, 'list'])
router.get('api/cart/list/:cartId', [CartsController, 'list'])


router.post('api/products/consultaEstoque', [ProductsController, 'consultaEstoque'])
//deveria receber o parametro do carrinho, mas como esse teste é so um usuario, fiz apenas carrinho id 1
router.post('api/cartitem/addItem/:product_id', [CartItemsController, 'addItem'])
router.post('api/cartitem/finalizaPedido/:cart_id', [PedidoVendasController, 'finalizaPedido'])

router.put('api/cartitem/updateQuantidade/:product_id/:quantidade', [CartItemsController, 'updateQuantidade'])

router.delete('api/cartItem/removeItem/:product_id', [CartItemsController, 'removeItem'])
