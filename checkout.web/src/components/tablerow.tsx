import { Td, Tr, Image, Text, Flex, Box, Button, Input } from "@chakra-ui/react";


export default function TableRow({ data, removeItem, updateItem }) {
    let preco = Number(data.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <Tr>
            <Td>
                <Flex>
                    <Box display={{ base: 'none', sm: 'block' }}>
                        <Image src="https://picsum.photos/200/300.jpg"
                            boxSize='100px'
                            objectFit='cover'>
                        </Image>
                    </Box>
                    <Flex m='1' flexDir='column' justifyContent='center'>
                        <Text fontSize='lg' fontWeight='bold'>{data.produto.descricao}</Text>
                        <Text>{data.produto.marca}</Text>
                    </Flex>
                </Flex>

            </Td>
            <Td>
                <Box>
                    <Button variant='solid' colorScheme='green' size='xs' onClick={() => { updateItem(data, 'decrease') }} >-</Button>
                    <Input htmlSize={1} textAlign='center' width='auto' readOnly rounded='lg' mx='1' size='sm' value={data.quantidade} />
                    <Button variant='solid' colorScheme='green' size='xs' onClick={() => { updateItem(data, 'increase') }} >+</Button>
                </Box></Td>
            <Td>{preco}</Td>
            <Td><Button variant='solid' colorScheme='red' size='xs' onClick={() => { removeItem.mutate(data.produto.id) }}>X</Button></Td>
        </Tr >
    );
}

