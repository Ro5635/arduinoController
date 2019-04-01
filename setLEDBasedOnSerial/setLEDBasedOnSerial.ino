/*
* Arduino Control by Serial
*
* The control sequence detection logic is currently being replaced with a state machine
* implemenmntation that happens as the charactors are recived. This should allow for the
* reduction in the use of String operations which should make this more performant...
*
* @author Robert January 2019
*/



int currentSerialState = 0;

String inputString = "";
bool stringComplete = false;

void setup() {

  Serial.begin(115200);
  Serial.println("BOARD STARTED");


  inputString.reserve(200);

}


void loop() {
  // When a string has been received and processed clear it out
  if (stringComplete) {

    // clear the string:
   inputString = "";
   stringComplete = false;
 }
}

/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
*/
void serialEvent() {
  while (Serial.available()) {

    switch (currentSerialState) {
      case 0:

        // get the new byte:
        char inChar = (char)Serial.read();

        // if (inChar == '<') {
        //   // Control Secuence Start Char Detected
        //   currentSerialState = 1;
        // }

        // add it to the inputString:
        inputString += inChar;

        if (inChar == '\n') {
          stringComplete = true;
        }

      break;

      case 1:

        // Start charactor found



      break;

    }


  }

  if (stringComplete) {
    // Check to see if it is a control sequence
    if (inputString[0] == '#') {
      // it is a control sequence, interpret it

      int mode;
      mode = inputString.substring(1, 3).toInt();

      int countOfValuesPassed;
      countOfValuesPassed = inputString.substring(4, 5).toInt();

      // Create an array to hold all of the passed values
      int passedValues[countOfValuesPassed];

      // #mode#arrayLen#values[]
      // #12#1#15#121#155#
      int pos = 6;
      int currentValueIndex = 0;
      int stringLength = inputString.length();

      int startOfNextInt = 6;

      while(pos < stringLength) {

        if(inputString[pos] == '#') {
          // found closing #
          int nextValue;
          nextValue = inputString.substring(startOfNextInt, pos).toInt();

          // Place new value into array
          passedValues[currentValueIndex++] = nextValue;

          // Update the start of the next Int, this will be one position after the current '#'
          startOfNextInt = pos + 1;
        }

        pos++;
      }

      // Serial.println("Printing passedValues[] Array:");
      // int i;
      // for (i = 0; i < countOfValuesPassed ; i++) {
      //   Serial.print("Printing index:");
      //   Serial.print(i);
      //   Serial.print(" value: ");
      //   Serial.println(passedValues[i]);
      // }

      handleControlSequence(mode, passedValues, countOfValuesPassed);

    }
  }
}

void handleControlSequence(int mode, int values[], int valuesLength){

  switch (mode) {

    case 10:
    setPinModeInput(values, valuesLength);
    break;

    case 11:
    setPinModeOutput(values, valuesLength);
    break;

    case 12:
    setDigitalPinState(values[0], values[1]);
    break;

    case 13:
    setAnalogPinState(values[0], values[1]);
    break;

    case 14:
    int value = analogReadPin(values[0]);

    Serial.print("#{\"analogRead\": {\"pin\": ");
    Serial.print(values[0]);
    Serial.print(", \"value\": ");
    Serial.print(value);
    Serial.println(", \"rc\": 5635}}#");
    break;


    default:
    Serial.println("Unable to decode control mode");
    break;
  }

  // Send task complete
  Serial.println("@");  // Tmp response code

}


void setAnalogPinState(int pinNo, int value){
    analogWrite(pinNo, value);

}

void setDigitalPinState(int pinNo, int high){
  if(high > 0) {
    digitalWrite(pinNo, HIGH);

  }else {
    digitalWrite(pinNo, LOW);
  }
}

void setPinModeInput(int pins[], int pinsLength) {
  int i;

  for (i = 0; i < pinsLength ; i++) {
    pinMode(pins[i], INPUT);

  }


}

int analogReadPin(int pinNo){
  return analogRead(pinNo);
}


void setPinModeOutput(int pins[], int pinsLength){
  int i;

  for (i = 0; i < pinsLength ; i++) {
    pinMode(pins[i], OUTPUT);

  }


}
