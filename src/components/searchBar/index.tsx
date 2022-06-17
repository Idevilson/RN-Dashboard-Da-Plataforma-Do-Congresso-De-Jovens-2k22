import React from 'react' 
import { Foundation } from '@expo/vector-icons'; 

import { 
    Input,
    Button
} from 'native-base';

import { 
    Container
} from './styles'

interface searchBarProps{
    callDatabase: () => void;
}
export function SearchBar({ callDatabase }: searchBarProps){

    return(
        <Container>
            <Input placeholder="PESQUISAR" w="260px" maxWidth="300px" />
            <Button 
                onPress={callDatabase}
                style={{
                    width: 40
                }}
            >
                <Foundation 
                    name="page-search"
                    size={20}
                    color="#000"
                />
            </Button>
        </Container>
    )
}