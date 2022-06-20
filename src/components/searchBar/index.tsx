import React from 'react' 
import { Foundation } from '@expo/vector-icons'; 
import { TextInputProps } from 'react-native';

import { 
    Input,
    Button
} from 'native-base';

import { 
    Container
} from './styles'

interface searchBarProps extends TextInputProps{
    callDatabase: () => void;
}
export function SearchBar({ callDatabase, onChangeText }: searchBarProps){

    return(
        <Container>
            <Input 
                placeholder="PESQUISAR" 
                width="300px" 
                maxWidth="300px" 
                onChangeText={onChangeText}
            />
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