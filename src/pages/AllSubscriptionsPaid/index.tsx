import React from 'react';

import { 
    Container,
    Content,
    Title,
    ScrollContainer
} from './styles';
import { SubscriptionCardNoSwipe } from '../../components/subscriptionCardNoSwipe';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';

export function AllSubscriptionsPaid({ route }){
    const {data} = route.params;
    
    const navigation = useNavigation();
    console.log(data);

    return(
        <Container>
          <Content>
            <Button 
                style={{ 
                    backgroundColor: '#fff',
                    marginRight: 4
                }}
                onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
            </Button>
            <Title>
                TODAS AS INSCRIÇÕES PAGAS
            </Title>         
          </Content>
          
          <ScrollContainer 
                data={data}
                keyExtractor={data.cpf}
                renderItem={({item}: any) => 
                    <SubscriptionCardNoSwipe 
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
        </Container>
    )
}