'use client'
import { Container, Flex, Box, Wrap, WrapItem, Link, Card, Stack, CardBody, Heading, Text, Input, CardFooter, Button, Divider, ButtonGroup, Spacer, useToast, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner } from "@chakra-ui/react";
import { UseQueryResult, useQuery, useMutation } from '@tanstack/react-query'
import { useState } from "react";
import TableRow from "./tablerow";
import Summary from "./summary";
import { api } from "@/services/api";

export default function Home() {
  const [disponibilidade, setDisponibilidade] = useState([]);
  const toast = useToast();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['list'], queryFn: () => {
      return api.get('/cart/list/1')
        .then((response) => response.data)
    },
  });
  const removeItem = useMutation({
    mutationFn: (produtoId) => {
      return api.delete(`/cartItem/removeItem/${produtoId}`)
        .then((response) => response.data)
        .catch(error => {
          console.error(error);
        })
        .finally(refetch)
    },
  })
  const updateItem = async (item, action) => {
    let newQuantidade = item.quantidade;
    let produtoId = item.produto.id;
    if (action === 'decrease') {
      if (newQuantidade === 1) {
        return
      }
      newQuantidade--;
    }
    if (action === 'increase') {
      newQuantidade++;
    }

    const reponse = await verificaEstoque.mutateAsync({ id: produtoId, estoque: newQuantidade });

    if (reponse[0].isDisponivel) {
      uptadeItemMutate.mutate({ produtoId, newQuantidade });
    } else {
      toast({
        title: `Quantidade máxima de estoque atingida`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  const verificaEstoque = useMutation({
    mutationFn: (produto) => {
      return api.post(`/products/consultaEstoque`, {
        produto
      }).then((response) => response.data)
    }
  })
  const uptadeItemMutate = useMutation({
    mutationFn: ({ produtoId, newQuantidade }) => {
      return api.put(`/cartitem/updateQuantidade/${produtoId}/${newQuantidade}`)
        .then((response) => response.data)
        .catch((error) => console.log(error))
        .finally(refetch)
    }
  })

  const gerarPedidoVenda = useMutation({
    mutationFn: () => {
      return api.post(`/cartitem/finalizaPedido/${1}`)
        .then((response) => response.data)
        .catch((error) => console.log(error))
        .finally(refetch)
    },
    onSuccess: () => {
      toast({
        title: `Pedido de venda Gerado`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  })

  const getTotal = () => {
    let sum = 0;

    if (data) {
      for (let item of data) {
        sum += Number(item.preco);
      }
      return sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

  }
  const priceTotal = getTotal();

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (error) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <Container maxW='container.lg' pt='10'>
        <Heading textAlign='center' pb='3'>Seu Carrinho</Heading>
        <Flex justify='center' flexDir={{ base: 'column', sm: 'row' }}>
          <TableContainer width='100%' mt='10' mr={{ base: '0', sm: '5' }} mb={{ base: '6' }}>
            <Table variant='simple'>
              <Thead>
                <Tr width='100%'>
                  <Th>Produto</Th>
                  <Th>Quantia</Th>
                  <Th>Valor</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.length === 0 ? (
                  <Tr>
                    <Td textAlign='center' fontWeight='bold' colSpan={4}>Carrinho Vazio...</Td>
                  </Tr>
                ) : (
                  (data || []).map((item: any) => (
                    <TableRow key={item.produto.id} data={item} removeItem={removeItem} updateItem={updateItem} />
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Summary total={priceTotal} gerarPedidoVenda={gerarPedidoVenda}></Summary>
        </Flex>
        <Box pt='5'>
          <Link href='/'>
            <Button colorScheme='blue' w='100%'>Voltar</Button>
          </Link>
        </Box>
      </Container>
    </>

  );
}