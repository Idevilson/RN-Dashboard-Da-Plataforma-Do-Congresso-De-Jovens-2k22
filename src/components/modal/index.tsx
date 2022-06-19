import React from 'react';

import { 
    Modal, 
    Button, 
    Center,
    FlatList
} from 'native-base';

import { SubscriptionCard } from '../subscriptionCard';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DataType{
    Timestamp: string,
    campo: string,
    cidade: string,
    cpf: string,
    createdAt: string,
    idade: number,
    nome: string,
    pago: boolean,
    sexo: string,
    subscriptionCode: string
}
interface SearchResultModalProps{
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    data: DataType[];
}

export function SearchResultModal({ isOpen, onClose, data }: SearchResultModalProps){
   
    
    return (
        <Center>
            <Modal 
                isOpen={isOpen}       
                onClose={() => onClose()}
            >
                <Modal.Content
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Modal.CloseButton />
                    <Modal.Header fontSize="4xl" fontWeight="bold">
                        Delete Customer
                    </Modal.Header>
                    <Modal.Body>
                   
                    <SafeAreaView style={{flex: 1}}>
                        <FlatList
                            style={{ 
                                width: "100%" ,
                                height: "100%"
                            }}
                            showsHorizontalScrollIndicator
                            data={data}
                            keyExtractor={item => item.subscriptionCode}
                            renderItem={({item}) => 
                                <SubscriptionCard 
                                    Timestamp={item.Timestamp}
                                    campo={item.campo}
                                    cidade={item.cidade}
                                    cpf={item.cpf}
                                    createdAt={item.createdAt}
                                    idade={item.idade}
                                    nome={item.nome}
                                    pago={item.pago}
                                    sexo={item.sexo}
                                    subscriptionCode={item.subscriptionCode}
                                />          
                            }
                        />
                    </SafeAreaView>     
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="unstyled" mr="1" onPress={() => onClose()}>
                        Cancel
                        </Button>
                        <Button colorScheme="error" onPress={() => onClose()}>
                        Delete
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}

