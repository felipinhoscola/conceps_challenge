import { WrapItem, Center, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Card } from "@chakra-ui/react";



export default function Products({ item, addProduct }: any) {

    console.log()
    return (
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
                            {item.estoque > 0 ? (<Button onClick={() => { addProduct.mutate(item.id) }}
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
    );
}