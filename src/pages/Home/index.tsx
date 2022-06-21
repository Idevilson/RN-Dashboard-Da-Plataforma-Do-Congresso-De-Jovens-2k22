import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { validate } from 'gerador-validador-cpf';

import { 
  Box,
  useDisclose,
  useToast,
  Text,
  Select,
  CheckIcon,
  Spinner
} from "native-base";

import { 
  Container, 
  Content,
  Title,
  TitleTotal, 
  TotalContainer,
  TotalPaidContainer,
  TitleTotalPaid,
  TotalNotPaidContainer,
  TitleTotalNotPaid,
  ScrollContainer
} from './styles';

import { SearchResultModal } from '../../components/modal';
import { SearchBar } from '../../components/searchBar';

export function Home(){
    const [selected, setSelected] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [dataModal, setDataModal] = useState<any>([]);

    const [subscriptionContent, setSubscriptionsContent] = useState<FirebaseFirestoreTypes.DocumentData>([]);
    const [subscriptionPaidData, setSubscriptionPaidData] = useState<FirebaseFirestoreTypes.DocumentData>([]);
    const [subscriptionNotPaidData, setSubscriptionNotPaidData] = useState<FirebaseFirestoreTypes.DocumentData>([]);

    const [subscriptionTotal, setSubscriptionTotal] = useState(0);
    const [totalSubscriptionNotPaid, setTotalSubcriptionNotPaid] = useState(0);
    const [totalSubscriptionPaid, setTotalSubscriptionPaid] = useState(0);

    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(true);

    const { onOpen, onClose, isOpen } = useDisclose();
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const toast = useToast();
    const netInfo = useNetInfo();

     
    function handleSearchSubscription(){  
      const result = validate(inputValue);
      
      if(result === false){
        toast.show({
          placement: "top",
          render: () => {
            return <Box bg="red.500" px="1" py="2" rounded="sm" mb={5}>
                    <Text
                      fontSize="2xl"
                      color="white"
                    >
                      Informe um CPF válido.
                    </Text>
                  </Box>;
          }
        });

        return;
      }
      
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
            console.log(dataModal);
            firestore()
            .collection('inscritos2k22')
            .where(selected, '==', inputValue)
            .get()
            .then(querySnapshot => {
              console.log('Total users: ', querySnapshot.size);
              var data;

              querySnapshot.forEach(documentSnapshot => {
                data = documentSnapshot.data();
                setDataModal(data);
              });
              
              if(typeof data === "undefined"){
                Alert.alert(
                  "Aviso!",
                  "INSCRIÇÃO NÃO ENCONTRADA :(",
                  [
                    {
                      text: "FECHAR"
                    }
                  ]
                )
                console.log("É undefined")
              }else{
                onOpen();
              }          
          }).catch(error => {
            console.log(error);
          })
      }
    }


    async function LoadSubscriptionsFromFirestore() {
      setLoading(true);

      await firestore()
      .collection('inscritos2k22')
      .get()
      .then(
        querySnapshot => {
          setSubscriptionTotal(querySnapshot.size);
          const data = [];

          querySnapshot.forEach(documentSnapshop => {
            data.push(documentSnapshop.data());
          })

          setSubscriptionsContent(data);
        }
      ).catch(error => console.log(error));

      await firestore()
      .collection('inscritos2k22')
      .where('pago', '==', true)
      .get()
      .then(querySnapshot => {
          const data = [];

          setTotalSubscriptionPaid(querySnapshot.size);

          querySnapshot.forEach(documenSnapshop => {
            data.push(documenSnapshop.data());
          });

          setSubscriptionPaidData(data);
      });

      await firestore()
      .collection('inscritos2k22')
      .where('pago', '==', false)
      .get()
      .then(querySnapshot => {
          const data = [];
          setTotalSubcriptionNotPaid(querySnapshot.size);

          querySnapshot.forEach(documenSnapshop => {
            console.log("teste",documenSnapshop.data());
          });

          setSubscriptionNotPaidData(data);
      });

      setLoading(false);
    }

    useEffect(() => {
      setDataModal([]);
      setInputValue("");
      LoadSubscriptionsFromFirestore();
    }, [isFocused]);

    useEffect(() => {
      console.log(netInfo.isConnected);
    }, [netInfo.isConnected]);
    
    return(
        <Container>
          <Content>
            <Title>
                DASHBOARD
            </Title>
  
                <SearchBar 
                    value={inputValue}
                    callDatabase={handleSearchSubscription}
                    onChangeText={(text) => (setInputValue(text))}
                />

                <Select   
                  selectedValue={selected}
                  minWidth="340" 
                  accessibilityLabel="Escolha uma opção" 
                  placeholder="Escolha uma opção" 
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                  }} mt={1} 
                  onValueChange={itemValue => setSelected(itemValue)}
                  >
                      <Select.Item label="Pesquisar pelo CPF" value="cpf" />
                      <Select.Item label="Pesquisar pelo NOME" value="nome" />
                      <Select.Item label="Pesquisar pelo Código de inscrição" value="subscriptionCode" />
                </Select>

                <SearchResultModal
                  data={dataModal} 
                  isOpen={isOpen}
                  onOpen={() => onOpen()}
                  onClose={() => onClose()}
                /> 

          </Content>
          
          <ScrollContainer>
              <Box
                alignItems="center"
              >
                <TitleTotal>
                  Total de inscrições
                </TitleTotal>
                <TotalContainer onPress={() => navigation.navigate('AllSubscriptions', {data: subscriptionContent})}>
                  <Text fontSize="6xl" color="white">
                      {loading === true ? <Spinner size="lg" color="white"/> :subscriptionTotal}
                  </Text>
                </TotalContainer>
              </Box>

              <Box
                alignItems="center"
              >
                <TitleTotalPaid>
                  Total de inscrições pagas
                </TitleTotalPaid>
                <TotalPaidContainer onPress={() => navigation.navigate('AllSubscriptionsPaid', {data: subscriptionPaidData})}>
                    <Text fontSize="6xl" color="white">
                        {loading === true ? <Spinner size="lg" color="white"/> : totalSubscriptionPaid}
                    </Text>
                </TotalPaidContainer>
              </Box>

              <Box
                alignItems="center"
              >
                <TitleTotalNotPaid>
                  Total de inscrições não pagas
                </TitleTotalNotPaid>
                <TotalNotPaidContainer onPress={() => navigation.navigate('AllSubscriptionsNotPaid', {data: subscriptionNotPaidData})}>
                    <Text fontSize="6xl" color="white">
                        {loading === true ? <Spinner size="lg" color="white"/> : totalSubscriptionNotPaid}
                    </Text>
                </TotalNotPaidContainer>
              </Box>
          </ScrollContainer>
        </Container>
    )
}