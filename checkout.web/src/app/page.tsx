'use client'
import { Container, Card, CardHeader, CardBody, CardFooter, Heading, StackDivider, Stack, Box, Text, Divider, ButtonGroup, Button, Image, Flex, Spacer, Wrap, WrapItem, Center, useToast, Skeleton, Spinner } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'


export default function Home() {
  const toast = useToast();
  const { isLoading, data, error } = useQuery({
    queryKey: ['produto'], queryFn: () => {
      return api.get('/products/list')
        .then((response) => response.data)
    },
  });

  const mutation = useMutation({
    mutationFn: (productId) => {
      return api.post(`/cartitem/addItem/${productId}`)
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
    return <span>Error: {error.message}</span>
  }
  return (
    <>
      <Container maxW='container.lg' pt='10'>
        <Wrap spacing='30px' justify={{ md: 'flex-start', base: 'center' }}>
          {/* fazer a div caso não tenha produto */}
          {data?.map((item: any) => (
            <WrapItem key={item.id}>
              <Center>
                <Card maxW='sm' w='300px'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{item.descricao}</Heading>
                      <Text>
                        Marca: {item.marca}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        R${item.preco}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      {item.estoque > 0 ? (<Button onClick={() => { mutation.mutate(item.id) }}
                        variant='solid' colorScheme='green' key={item.id}>
                        Adicionar ao Carrinho
                      </Button>) : (
                        <Button disabled variant='outline' colorScheme='red' key={item.id}>Fora de Estoque</Button>
                      )}

                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Center>
            </WrapItem>
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
