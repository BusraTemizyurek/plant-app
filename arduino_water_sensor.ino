#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

// ====== PIN LAYOUT ======
#define PIN_SENSOR_POWER D1
#define PIN_SENSOR_DATA  A0

// ====== CONFIG ======
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
const char* ENDPOINT      = "https://plant-app-one-gamma.vercel.app/api/events";

// Calibrate these from Serial raw values (dry/wet)
const int DRY_VALUE = 12;    // raw reading for dry soil
const int WET_VALUE = 600;   // raw reading for wet soil

// How long to sleep between reports (microseconds). e.g. 5 minutes:
const uint64_t SLEEP_US = 5ULL * 60ULL * 1000000ULL;

// ====== HELPERS ======
int readAveragedA0(uint8_t samples = 8, uint16_t gapMs = 5) {
  long sum = 0;
  for (uint8_t i = 0; i < samples; i++) {
    sum += analogRead(PIN_SENSOR_DATA);
    delay(gapMs);
  }
  return (int)(sum / samples);
}

bool connectWiFi(uint32_t timeoutMs = 20000) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  uint32_t start = millis();
  while (WiFi.status() != WL_CONNECTED && (millis() - start) < timeoutMs) {
    delay(250);
  }
  return WiFi.status() == WL_CONNECTED;
}

bool postMoisture(int percent) {
  std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
  client->setInsecure(); // quick start; use cert pinning for production

  HTTPClient https;

  if (!https.begin(*client, ENDPOINT)) {
    return false;
  }

  String json = String("{\"moisture\":") + percent + "}";
  int code = https.POST(json);
  
  https.end();
  return (code > 0 && code < 300);
}

void goToSleep() {
  Serial.println("Sleeping…");
  ESP.deepSleep(SLEEP_US); // requires D0->RST
  delay(100); // just in case
}

void setup() {
  Serial.begin(115200);
  delay(100);
  pinMode(PIN_SENSOR_POWER, OUTPUT);
  digitalWrite(PIN_SENSOR_POWER, HIGH);

  // 1) Read sensor
  int raw = readAveragedA0();
  int percent = map(raw, DRY_VALUE, WET_VALUE, 0, 100);
  percent = constrain(percent, 0, 100);
  Serial.printf("Raw=%d  Moisture=%d%%\n", raw, percent);

  // 2) WiFi + POST (best effort)
  if (connectWiFi()) {
    Serial.print("IP: "); 
    Serial.println(WiFi.localIP());
    bool ok = postMoisture(percent);
    Serial.println(ok ? "POST success" : "POST failed");
  } else {
    Serial.println("WiFi connect failed; skipping POST");
  }

  // 3) Sleep
  goToSleep();
}

void loop() {
  // not used; device sleeps at end of setup()
}
