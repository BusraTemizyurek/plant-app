#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

// ====== PIN LAYOUT ======
#define PIN_SENSOR_POWER D1     // OPTIONAL: only if you switch power with MOSFET
#define PIN_SENSOR_DATA  A0

// ====== CONFIG ======
const char* WIFI_SSID      = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD  = "YOUR_WIFI_PASSWORD";
const String API_KEY       = "YOUR_API_KEY";
const String ENDPOINT      = "YOUR_API_ENDPOINT";

// Calibrated values
const int DRY_VALUE = 712;   // dry (air)
const int WET_VALUE = 326;   // wet (water)

// Deep sleep interval (60 minutes)
const uint64_t SLEEP_US = 60ULL * 60ULL * 1000000ULL;  // requires D0 -> RST wiring

// ====== HELPERS ======
int readAveragedA0(uint8_t samples = 10, uint16_t gapMs = 5) {
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
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED && (millis() - start) < timeoutMs) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  return WiFi.status() == WL_CONNECTED;
}

bool postMoisture(int percent) {
  std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
  client->setInsecure(); // skip cert validation for simplicity

  HTTPClient https;
  if (!https.begin(*client, ENDPOINT)) {
    Serial.println("HTTP begin failed");
    return false;
  }

  const String body = String("{\"moisture\":") + percent + "}";
  https.addHeader("Content-Type", "application/json");
  https.addHeader("Authorization", "Bearer " + API_KEY);
  int code = https.POST(body);
  String resp = https.getString();

  Serial.printf("POST %s -> %d | %s | resp: %s\n",
                ENDPOINT.c_str(), code, body.c_str(), resp.c_str());

  https.end();
  return (code > 0 && code < 300);
}

void goToSleep() {
  Serial.println("💤 Going to sleep for 1 hour...");
  ESP.deepSleep(SLEEP_US);
  delay(100);
}

// ====== MAIN ======
void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.printf("\n🌿 Device ID: %s\n", DEVICE_ID);

  pinMode(PIN_SENSOR_POWER, OUTPUT);
  digitalWrite(PIN_SENSOR_POWER, HIGH); // safe default (OFF for P-MOSFET)

  // --- Turn sensor ON if you actually use MOSFET, otherwise ignore this line ---
  // digitalWrite(PIN_SENSOR_POWER, LOW);
  delay(250);

  // 1) Read sensor
  int raw = readAveragedA0();
  int percent = map(raw, DRY_VALUE, WET_VALUE, 0, 100);
  percent = constrain(percent, 0, 100);
  Serial.printf("Raw=%d  Moisture=%d%%\n", raw, percent);

  // 2) Wi-Fi + POST
  if (connectWiFi()) {
    Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
    bool ok = postMoisture(percent);
    Serial.println(ok ? "✅ POST success" : "❌ POST failed");
  } else {
    Serial.println("⚠️ Wi-Fi connect failed; skipping POST");
  }

  // digitalWrite(PIN_SENSOR_POWER, HIGH); // OFF if switching power

  // 3) Sleep
  goToSleep();
}

void loop() {
  // not used; device sleeps after setup()
}
