import React from 'react';

import { 
    Modal, 
    Center,
    Text,
    ScrollView,
    Button
} from 'native-base';

import { SubscriptionCard } from '../subscriptionCard';
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
    data: DataType;
}

export function SearchResultModal({ isOpen, onClose, data }: SearchResultModalProps){
   
    console.log("renderizou");
    
    return (
        <Center>
            <Modal 
                isOpen={isOpen}       
                onClose={() => onClose()}
            >
                <Modal.Content
                    style={{
                        height: '70%',
                        width: '100%',
                    }}
                >
                    <Modal.Header alignItems="center">
                      <Text fontSize="2xl" fontWeight="bold">GERENCIAR INSCRIÇÃO</Text>
                    </Modal.Header>
                    <Modal.Body>
                   
                        <ScrollView
                            style={{ 
                                width: "100%" ,
                                height: "100%"
                            }}
                            showsHorizontalScrollIndicator
                        >
                            <SubscriptionCard 
                                    Timestamp={data.Timestamp}
                                    campo={data.campo}
                                    cidade={data.cidade}
                                    cpf={data.cpf}
                                    createdAt={data.createdAt}
                                    idade={data.idade}
                                    nome={data.nome}
                                    pago={data.pago}
                                    sexo={data.sexo}
                                    subscriptionCode={data.subscriptionCode}
                            />       
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button onPress={onClose}>
                                FECHAR
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}

