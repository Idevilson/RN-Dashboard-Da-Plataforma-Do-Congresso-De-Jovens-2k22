import React, { useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { SearchBar } from './components/searchBar';
import { SearchResultModal } from './components/modal';

import { 
  CheckIcon, 
  Select,
  Button,
  useDisclose
} from "native-base";

import { 
  Container, 
  Title,
} from './styles';


const data = {
    Timestamp: new Date(),
    campo: "Campo 157",
    cidade: "Belterra",
    cpf: "12312312312",
    createdAt: new Date(),
    idade: 22,
    nome: "Firebase Mobile",
    pago: false,
    sexo: "m"
}

function test(){
   firestore()
  .collection('inscritos2k22')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
}



export function Dashboard(){
    const [option, setOption] = useState("");
    const { onOpen, isOpen, onClose } = useDisclose();

    
    return(
        <Container>
            <Title>
                DASHBOARD
            </Title>
  
                <SearchBar 
                    callDatabase={test}
                />
                <Select 
                  selectedValue={option} 
                  minWidth="300" 
                  accessibilityLabel="Escolha uma opção" 
                  placeholder="Escolha uma opção" 
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                  }} mt={1} onValueChange={itemValue => setOption(itemValue)}>
                      <Select.Item label="CPF" value="cpf" />
                      <Select.Item label="NOME" value="nome" />
                      <Select.Item label="Código de inscrição" value="subscriptionCode" />
                </Select>

                <Button 
                   onPress={() => onOpen()}
                >
                  Abrir modal
                </Button>

              <SearchResultModal 
                isOpen={isOpen}
                onOpen={() => onOpen()}
                onClose={() => onClose()}
              />
        </Container>
    )
}