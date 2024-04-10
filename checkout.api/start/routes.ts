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
import SalesOrdersController from '#controllers/sales_orders_controller'

router.resource('products', ProductsController)
router.resource('cart', CartsController)
router.resource('cartItems', CartItemsController)
router.resource('salesOrder', SalesOrdersController)


