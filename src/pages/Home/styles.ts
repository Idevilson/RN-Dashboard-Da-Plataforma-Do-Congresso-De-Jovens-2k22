import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

`;

export const Content = styled.View`
    align-items: center;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #000;
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
`;

export const ChooseButton = styled.View`
    background-color: blue;

    width: 300px;
    height: 30px;
`;

export const TotalContainer = styled.TouchableOpacity`  
    width: 100px;
    height: 100px;

    background-color: #123291;
    border-radius: 3px;
    margin-bottom: 20px;

    align-items: center;
    justify-content: center;
`;

export const TitleTotal = styled.Text`
    font-size: 20px;
    color: #000;
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    text-align: center;
`;

export const TitleTotalPaid = styled.Text`
    font-size: 20px;
    color: #000;

    margin-top: 15px;
    margin-bottom: 15px;

    text-transform: uppercase;
    text-align: center;
`;

export const TotalPaidContainer = styled.TouchableOpacity`  
    width: 100px;
    height: 100px;

    background-color: green;
    border-radius: 3px;
    margin-bottom: 20px;

    align-items: center;
    justify-content: center;
`;

export const ScrollContainer = styled.ScrollView`
 display: flex;
`;

export const TitleTotalNotPaid = styled.Text`
    font-size: 20px;
    color: #000;
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    text-align: center;
`;

export const TotalNotPaidContainer = styled.TouchableOpacity`  
    width: 100px;
    height: 100px;

    background-color: red;

    margin-bottom: 20px;
    border-radius: 3px;

    align-items: center;
    justify-content: center;
`;