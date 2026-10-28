/**
 * PillPal AI — ESP32 Service Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is the ONLY place that communicates with the ESP32 hardware.
 * When you connect real hardware, update ESP32_BASE_URL and the endpoint
 * paths below. The rest of the UI will work without any further changes.
 *
 * Typical ESP32 / Arduino REST endpoint:
 *   POST http://<device-ip>/dispense   { "slot": 1 }
 *   GET  http://<device-ip>/status
 *
 * To switch from SIMULATION → REAL HARDWARE:
 *   1. Set  BASE_URL  to your device's IP (e.g. "http://192.168.1.42")
 *   2. Set  SIMULATION_MODE = false
 *   3. Adjust endpoint paths & payload shape if your firmware differs.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ESP32Config = {
  BASE_URL: "http://192.168.1.42", // ← replace with real device IP
  DISPENSE_ENDPOINT: "/dispense",
  STATUS_ENDPOINT: "/status",
  TIMEOUT_MS: 8000,
  SIMULATION_MODE: true, // ← set false when real hardware is connected
};

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ESP32Config.TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function simulateDispense(slot) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error("Simulated hardware timeout"));
      } else {
        resolve({ success: true, slot, dispensedAt: new Date().toISOString() });
      }
    }, 2200);
  });
}

async function simulateConnectionCheck() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ online: true }), 400);
  });
}

export async function dispenseMedicine(slot = 1) {
  if (ESP32Config.SIMULATION_MODE) {
    return simulateDispense(slot);
  }
  const url = `${ESP32Config.BASE_URL}${ESP32Config.DISPENSE_ENDPOINT}`;
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slot }),
  });
  if (!response.ok) {
    throw new Error(`ESP32 returned HTTP ${response.status}`);
  }
  return response.json();
}

export async function checkConnectionStatus() {
  if (ESP32Config.SIMULATION_MODE) {
    return simulateConnectionCheck();
  }
  try {
    const url = `${ESP32Config.BASE_URL}${ESP32Config.STATUS_ENDPOINT}`;
    const response = await fetchWithTimeout(url, { method: "GET" });
    return { online: response.ok };
  } catch {
    return { online: false };
  }
}
