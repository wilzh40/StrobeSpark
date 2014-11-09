
int state = 0;
int i = 1;
int myArray[] = {9,3,2,4,3,2,7,8,9,11};
void setup()
{
	pinMode(D7, OUTPUT);
}

void loop()
{
	digitalWrite(D7, (state) ? HIGH : LOW);
	state = !state;
	i++;	
	int x = myArray[i];
	delay(x*500);
}
