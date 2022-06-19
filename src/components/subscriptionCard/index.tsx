import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    Box,
    Divider,
    Stack,
    Heading,
    Text
 } from 'native-base';

import AppleStyleSwipeableRow from '../swipe/Swipe';

 interface subscriptionCardProps{
    Timestamp: string,
    campo: string,
    cidade: string,
    cpf: string,
    createdAt: {},
    idade: number,
    nome: string,
    pago: boolean,
    sexo: string,
    subscriptionCode: string
 }

 

 export function SubscriptionCard({
    Timestamp,
    campo,
    cidade,
    cpf,
    idade,
    nome,
    pago,
    sexo,
    subscriptionCode
 }: subscriptionCardProps){


    return(
        <GestureHandlerRootView style={{ marginBottom: 20 }}>
            <AppleStyleSwipeableRow>
                <Box alignItems="center">
                    <Box 
                        maxW="80" 
                        rounded="lg" 
                        overflow="hidden" 
                        borderColor="coolGray.200" 
                        borderWidth="1" 
                        _light={{
                            backgroundColor: "gray.50"
                        }}
                        >
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                            <Heading size="md" ml="-1">
                                Nome: {nome}
                            </Heading>
                            <Divider my="2" />
                            <Text 
                                    fontSize="xs"
                                    color={'black'}
                                    fontWeight="500" 
                                    ml="-0.5" 
                                    mt="-1"
                                    >
                                Criado em: {String(Timestamp)}
                            </Text>
                            <Divider my="2" />
                            <Text 
                                    fontSize="xs"
                                    color={'black'}
                                    fontWeight="500" 
                                    ml="-0.5" 
                                    mt="-1"
                                    >
                                Cidade: {cidade}
                            </Text>
                            <Divider my="2" />
                            <Text 
                                    fontSize="xs"
                                    color={'black'}
                                    fontWeight="500" 
                                    ml="-0.5" 
                                    mt="-1"
                                    >
                                Campo: {campo}
                            </Text>
                            <Divider my="2" />
                            <Text 
                                    fontSize="xs"
                                    color={'black'}
                                    fontWeight="500" 
                                    ml="-0.5" 
                                    mt="-1"
                                    >
                                CPF: {cpf}
                            </Text>
                            <Divider my="2" />
                                <Stack 
                                    space={2}
                                    direction="row"
                                    >
                                    <Text 
                                        fontSize="xs"
                                        color={'black'}
                                        fontWeight="500" 
                                        ml="-0.5" 
                                        mt="-1"
                                        >
                                        Sexo: {sexo}
                                    </Text>
                                    <Divider 
                                        orientation="vertical"
                                        />
                                    <Text 
                                        fontSize="xs"
                                        color={'black'}
                                        fontWeight="500" 
                                        ml="-0.5" 
                                        mt="-1"
                                        >
                                        Idade: {idade}
                                    </Text>
                                    <Divider 
                                        orientation="vertical"
                                        />
                                    <Text 
                                        fontSize="xs"
                                        color={'black'}
                                        fontWeight="500" 
                                        ml="-0.5" 
                                        mt="-1"
                                        >
                                        PAGO: {String(pago)}
                                    </Text>
                                </Stack>
                                <Divider />
                                <Text 
                                    fontSize="xs"
                                    color={'black'}
                                    fontWeight="500" 
                                    ml="-0.5" 
                                    mt="-1"
                                    >
                                    Código de Inscrição: {subscriptionCode}
                                </Text>
                            </Stack>      
                        </Stack>
                    </Box>
                </Box>
            </AppleStyleSwipeableRow>
        </GestureHandlerRootView>
    )
};