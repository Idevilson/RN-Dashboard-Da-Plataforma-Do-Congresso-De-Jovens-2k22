import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

`;

export const Content = styled.View`
    align-items: center;
    padding: 20px;
    flex-direction: row;
`;

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #000;
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    margin-left: 15px;
`;

export const ScrollContainer = styled.FlatList`
 display: flex;
`;
