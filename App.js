import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [minMax, setMinMax] = useState([0, 100]);
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState(0);
  const [attempts, setAttempts] = useState(maxAttempts);
  const [userGuess, setUserGuess] = useState(0);

  function verifyUserGuess() {
    if (attempts === 0) {
      alert("Você não tem mais tentativas");
      return;
    }

    if (userGuess == randomNumber) {
      alert("Você acertou");
      setModalIsVisible(true);
    } else if (userGuess > randomNumber) {
      alert("Seu palpite é maior");
      setAttempts(attempts - 1);
    } else {
      alert("Seu palpite é menor");
      setAttempts(attempts - 1);
    }
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const inputs = [
    {
      value: minMax[0],
      onChangeText: (text) => setMinMax([text, minMax[1]]),
      placeholder: "Mínimo",
    },
    {
      value: minMax[1],
      onChangeText: (text) => setMinMax([minMax[0], text]),
      placeholder: "Máximo",
    },
    {
      value: maxAttempts,
      onChangeText: (text) => setMaxAttempts(text),
      placeholder: "Tentativas",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal visible={modalIsVisible} animationType="slide">
        {
          <View style={styles.container}>
            <Text>Escolha o intervalo</Text>
            {inputs.map((input, index) => (
              <TextInput key={index} {...input} />
            ))}
            <Button
              title="Jogar"
              onPress={() => {
                setModalIsVisible(false);
                setRandomNumber(
                  generateRandomNumber(parseInt(minMax[0]), parseInt(minMax[1]))
                );
                setAttempts(maxAttempts);
              }}
            />
          </View>
        }
      </Modal>

      <View>
        <TextInput
          placeholder="Seu palpite"
          onChangeText={(text) => setUserGuess(text)}
        />
        <Text>Tentativas restantes: {attempts}</Text>
        <Button
          title="Enviar"
          onPress={() => {
            verifyUserGuess();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
