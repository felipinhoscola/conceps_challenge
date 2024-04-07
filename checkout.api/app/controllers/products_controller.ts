import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'

interface IProductEstoqueData {
  produto: {
    id: number;
    estoque: number;
  }
}

export default class ProductsController {
  //Get lista produto
  async list({ }: HttpContext) {
    return await Product.all();
  }


  async consultaEstoque({ request, response }: HttpContext) {
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

  // //Post Consulta
  // async consultaEstoque({ request, response }: HttpContext) {
  //   try {
  //     const dataRequest = request.body() as IProductEstoqueData[];
  //     const disponibilidade = dataRequest.map(async item => {
  //       const product = await Product.findBy('id', item.produto.id);
  //       if (product != null) {
  //         const isDisponivel = item.produto.estoque <= product.estoque ? true : false;
  //         return { id: item.produto.id, isDisponivel };
  //       }
  //       return response.status(404).send(`Produto ${item.produto.id} não encontrado`);
  //     });
  //     return await Promise.all(disponibilidade)
  //   } catch (error) {
  //     return response.status(500).send(`Erro: ${error.message}`);
  //   }
  // }

  /*Criando produtos pelo json
  async store({ request, response }: HttpContext) {
    try {
      const product: Product = await Product.create(request.all());
      return product
    } catch (error) {
      response.status(400).send(error.message);
    }
  }*/
}