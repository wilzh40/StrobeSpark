int state = 0;
int i = 1;
int myArray[] = {1,2,3,4,5,6}; 
int BPM = 2;

void setup() {
    Spark.publish("getBPM", NULL, 600, PUBLIC);
    Spark.function("getBPM", setBPM);

    pinMode(D7, OUTPUT);

}

void loop() {
    if (BPM>50) {
        digitalWrite(D7, (state) ? HIGH : LOW);
        state = !state;
        i++;
        int x = myArray[i];
        //Converting BPM to beats
        delay(60000/BPM);
    }
}
int setBPM(String command)
{
    BPM = command.toInt();
}
