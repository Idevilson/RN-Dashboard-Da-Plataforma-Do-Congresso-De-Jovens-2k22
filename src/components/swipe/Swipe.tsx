import React, { Component, PropsWithChildren } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Alert,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons';


async function subscriptionConfirmPayment(cpf: string, onClose){
  let documentId = "";

  await firestore()
    .collection('inscritos2k22')
    .where('cpf', '==', cpf)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        documentId = documentSnapshot.id;
      });
  });

  await firestore()
    .collection('inscritos2k22')
    .doc(documentId)
    .update({
      pago: true,
    })
    .then(() => {
      Alert.alert(
        "PAGAMENTO APROVADO!",
        "VOCÊ SERÁ REDIRECIONADO PARA A TELA INICIAL.",
        [
          {
            text: "CONFIRMAR",
            onPress: () => onClose(),
            style: "cancel"
          },
        ]
      );
      console.log('Pagamento confirmado');
    }).catch((error) => 
      console.log(error)
    )
};

async function subscriptionDelete(cpf: string, onClose){
  let documentId = "";

  await firestore()
    .collection('inscritos2k22')
    .where('cpf', '==', cpf)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        documentId = documentSnapshot.id;
      });
  });

  await firestore()
    .collection('inscritos2k22')
    .doc(documentId)
    .delete()
    .then(() => {
      Alert.alert(
        "INSCRIÇÃO DELETADA!",
        "VOCÊ SERÁ REDIRECIONADO PARA A TELA INICIAL.",
        [
          {
            text: "CONFIRMAR",
            onPress: () => onClose(),
            style: "cancel"
          },
        ]
      );
      console.log('inscrição deletada');
    }).catch((error) => 
      console.log(error)
    )
};

export default class AppleStyleSwipeableRow extends Component<{ cpf: string, onClose }, PropsWithChildren<unknown>>{

  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      Alert.alert(
        "APROVAR PAGAMENTO",
        "AO CLICAR EM CONFIRMAR O PAGAMENTO SERÁ CONFIRMADO",
        [
          {
            text: "CANCELAR",
            onPress: () => console.log("Exclusão cancelada")
          },
          {
            text: "CONFIRMAR",
            onPress: () => this.ConfirmPayment(),
            style: "cancel"
          },
        ]
      );
    };

    return (
      <RectButton style={styles.leftAction} onPress={pressHandler}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Aprovar pagamento 
          <AntDesign name="check" size={50} color="black" />
        </Animated.Text>
      </RectButton>
    );
  };

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      Alert.alert(
        "EXCLUIR INSCRIÇÃO",
        "AO CLICAR EM CONFIRMAR A INSCRIÇÃO SERÁ APAGADA",
        [
          {
            text: "CANCELAR",
            onPress: () => console.log("Exclusão cancelada")
          },
          {
            text: "CONFIRMAR",
            onPress: () => this.DeleteSubscription(),
            style: "cancel"
          },
        ]
      );
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}<AntDesign name="delete" size={50} color="black" /></Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction('Excluir', '#dd2c00', 64, progress)}
    </View>
  );
  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private ConfirmPayment = () => {
    subscriptionConfirmPayment(this.props.cpf, this.props.onClose);
  };  
  private DeleteSubscription = () => {
    subscriptionDelete(this.props.cpf, this.props.onClose);
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#03f87e',
    justifyContent: 'center',
  },
  actionText: {
    color: 'black',
    fontSize: 40,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});