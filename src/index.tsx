import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { SearchResultModal } from './components/modal';

import { 
  Box,
  useDisclose,
  useToast,
  Text,
  Select,
  CheckIcon
} from "native-base";

import { Container, Title } from './styles';
import { SearchBar } from './components/searchBar';

export function Dashboard(){
    const [selected, setSelected] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [dataModal, setDataModal] = useState([]);
    const { onOpen, onClose, isOpen } = useDisclose();
    const toast = useToast();

    function handleSearchSubscription(){
      if(inputValue === ""){
        toast.show({
          placement: "top",
          render: () => {
            return <Box bg="red.500" px="1" py="2" rounded="sm" mb={5}>
                    <Text
                      fontSize="2xl"
                      color="white"
                    >
                      Preencha o campo pesquisar
                    </Text>
                  </Box>;
          }
        });
      }else if(selected === ""){
        toast.show({
          placement: "top",
          render: () => {
            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                   <Text
                      fontSize="2xl"
                      color="white"
                    >
                      Selecione uma opcao para pesquisar
                    </Text>
                  </Box>;
          }
        });
      }else{
            firestore()
            .collection('inscritos2k22')
            .where(selected, '==', "70202091228")
            .get()
            .then(querySnapshot => {
              console.log('Total users: ', querySnapshot.size);
              const data = [];

              querySnapshot.forEach(documentSnapshot => {
                data.push(documentSnapshot.data());
              });
              
              setDataModal(data);
              console.log(data);
              onOpen();
                  
          })
      }
   }

    return(
        <Container>
            <Title>
                DASHBOARD
            </Title>
  
                <SearchBar 
                    callDatabase={handleSearchSubscription}
                    onChangeText={(text) => (setInputValue(text))}
                />
                <Select   
                  selectedValue={selected}
                  minWidth="300" 
                  accessibilityLabel="Escolha uma opção" 
                  placeholder="Escolha uma opção" 
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                  }} mt={1} 
                  onValueChange={itemValue => setSelected(itemValue)}
                  >
                      <Select.Item label="CPF" value="cpf" />
                      <Select.Item label="NOME" value="nome" />
                      <Select.Item label="Código de inscrição" value="subscriptionCode" />
                </Select>

                <SearchResultModal
                  data={dataModal} 
                  isOpen={isOpen}
                  onOpen={() => onOpen()}
                  onClose={() => onClose()}
                /> 
        </Container>
    )
}