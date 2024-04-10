import { WrapItem, Center, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Card, Box, Image } from "@chakra-ui/react";



export default function Products({ item, addProduct }: any) {
    let price = Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return (
        <WrapItem key={item.id}>
            <Center>
                <Card maxW='sm' w='300px'>
                    <CardBody display='flex' gap='6' alignItems='flex-center'>
                        <Box display={{ base: 'none', sm: 'block' }} >
                            <Image src="https://picsum.photos/200/300.jpg"
                                boxSize='100px'
                                objectFit='cover'
                                rounded='lg'>
                            </Image>
                        </Box>
                        <Stack spacing='3'>
                            <Heading size='md'>{item.description}</Heading>
                            <Text>
                                Marca: {item.brand}
                            </Text>
                            <Text color='blue.600' fontSize='2xl'>
                                {price}
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter display='flex' justifyContent='center'>
                        <Box>
                            {item.stock > 0 ? (<Button onClick={() => { addProduct.mutate(item.id) }}
                                variant='solid' colorScheme='green' key={item.id}>
                                Adicionar ao Carrinho
                            </Button>) : (
                                <Button disabled variant='outline' colorScheme='red' key={item.id}>Fora de Estoque</Button>
                            )}

                        </Box>
                    </CardFooter>
                </Card>
            </Center>
        </WrapItem>
    );
}