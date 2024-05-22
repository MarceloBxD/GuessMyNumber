import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
      setModalIsVisible(true);
      return;
    }

    if (parseInt(userGuess) === randomNumber) {
      alert("Você acertou");
      setModalIsVisible(true);
    } else if (parseInt(userGuess) > randomNumber) {
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
      value: minMax[0].toString(),
      onChangeText: (text) => setMinMax([text, parseInt(minMax[1])]),
      placeholder: "Mínimo",
    },
    {
      value: minMax[1].toString(),
      onChangeText: (text) => setMinMax([parseInt(minMax[0]), text]),
      placeholder: "Máximo",
    },
    {
      value: maxAttempts.toString(),
      onChangeText: (text) => setMaxAttempts(text),
      placeholder: "Tentativas",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal visible={modalIsVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Escolha o intervalo</Text>
          {inputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              {...input}
              keyboardType="numeric"
            />
          ))}
          <Button
            title="Jogar"
            onPress={() => {
              setModalIsVisible(false);
              setRandomNumber(generateRandomNumber(minMax[0], minMax[1]));
              setAttempts(maxAttempts);
            }}
          />
        </View>
      </Modal>

      {!modalIsVisible && (
        <View style={styles.gameContainer}>
          <TextInput
            style={styles.input}
            placeholder="Seu palpite"
            onChangeText={(text) => setUserGuess(text)}
            keyboardType="numeric"
          />
          <Text style={styles.attemptsText}>
            Tentativas restantes: {attempts}
          </Text>
          <Text style={styles.answer}>
            {attempts === 0 && `O número era ${randomNumber}`}
          </Text>
          <Button title="Enviar" onPress={() => verifyUserGuess()} />
        </View>
      )}
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#4A6FA5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: "#4A6FA5",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  attemptsText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  answer: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
});
