'use client'
import { Container, Card, CardHeader, CardBody, CardFooter, Heading, StackDivider, Stack, Box, Text, Divider, ButtonGroup, Button, Image, Flex, Spacer, Wrap, WrapItem, Center, useToast, Skeleton, Spinner } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import Products from '@/components/products'


export default function Home() {
  const toast = useToast();
  const { isLoading, data, error } = useQuery({
    queryKey: ['productList'], queryFn: () => {
      return api.get('/products')
        .then((response) => response.data)
    },
  });

  const addProduct = useMutation({
    mutationFn: (productId) => {
      return api.post(`/cartItems`, { "id": 1, "product_id": productId })
        .then((response) => response.data)
    },
    onSuccess: () => {
      toast({
        title: `Produto adicionado ao carrinho`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

  })

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )

  }

  if (error) {
    return (<Flex justifyContent="center" alignItems="center" height="100vh">
      <Text fontSize='3xl' textColor=''>Erro: {error.message}</Text>
    </Flex>)
  }
  return (
    <>
      <Container maxW='container.lg' pt='10'>
        <Wrap spacing='30px' justify={{ md: 'flex-start', base: 'center' }}>
          {/* fazer a div caso não tenha produto */}
          {data?.map((item: any) => (
            <Products item={item} addProduct={addProduct} key={item.id} ></Products>
          ))}

        </Wrap>
        <Box pt='5'>
          <Link href='/carrinho'>
            <Button colorScheme='blue' w='100%'>Ver Carrinho</Button>
          </Link>
        </Box>
      </Container>

    </>
  );
}
