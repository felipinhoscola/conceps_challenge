import { Card, CardBody, Stack, Heading, Flex, Text, Divider, CardFooter, Button, Box } from "@chakra-ui/react";

export default function Summary({ total, genSalesOrder }: any) {
    return (<Box width={{ md: "30%", sm: '100%' }}>
        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Resumo da compra</Heading>
                    <Flex justify='space-between'>
                        <Text>
                            Sub-Total
                        </Text>
                        <Text>
                            {total}
                        </Text>
                    </Flex>
                    <Flex justify='space-between'>
                        <Text>
                            Frete
                        </Text>
                        <Text>
                            Gratuito
                        </Text>
                    </Flex>
                    <Divider />
                    <Flex justify='space-between' mb='3'>
                        <Text>
                            Total
                        </Text>
                        <Text>
                            {total}
                        </Text>
                    </Flex>
                </Stack>
                <Divider />
                <Box mt='3'>
                    <Button variant='solid' colorScheme='green' w='100%' onClick={() => { genSalesOrder.mutate() }} >
                        Finalizar Compra
                    </Button>
                </Box>
            </CardBody>
        </Card>
    </Box>);
}