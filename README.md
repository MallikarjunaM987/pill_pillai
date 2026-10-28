# PillPal AI — Smart Medicine Dispensing & Reminder System

> **IoT Smart Medication Assistant & Caregiver Dashboard for Elderly Healthcare**

PillPal AI is an intelligent medication management and automated dispensing prototype designed for elderly patients taking multiple daily medications. It bridges physical hardware (ESP32 microcontroller with servo-driven dispensing compartments) and a modern, elder-friendly responsive web dashboard for real-time monitoring and caregiver supervision.

---

## 🌟 Key Features

- **Real-Time ESP32 Connection Monitoring**: Automatic heartbeat polling (`GET /status`) every 30 seconds to track Wi-Fi and hardware availability.
- **Physical Dispense Integration**: Dispenses medication via `POST /dispense` to trigger a servo motor on GPIO 13, opening the compartment for 3 seconds before automatically closing.
- **Multi-Access & Repeat Cycles**: Built-in support for multiple test openings and repeat cycles (`1x`, `2x`, `3x`, `4x`, `5x`) with automated cooldown intervals between successive servo movements.
- **Elder-Friendly Mode**: High-contrast, large-font accessibility toggle tailored specifically for senior citizens.
- **Today's Medication Schedule**: Visual timeline tracking Morning, Afternoon, and Night doses with taken/pending status indicators.
- **Interactive Multi-Compartment Cabinet**: 3-compartment visualizer indicating slot status, tablet name, and hardware GPIO mapping.
- **Live Activity Log & Caregiver Metrics**: Automatic logging of all dispensing events with timestamps, dosage, and outcome verification.
- **Safety & Missed Dose Alerts**: Clinical reference summaries for prescribed medications and automated reminders if a scheduled dose is missed.

---

## 🛠️ Hardware & Technical Specifications

| Parameter | Specification |
| :--- | :--- |
| **Microcontroller** | ESP32-WROOM-32 |
| **Actuator** | Micro Servo (SG90 / MG90S) |
| **Control Pin** | GPIO 13 |
| **Network Protocol** | HTTP REST API / JSON |
| **Default IP** | `http://10.123.129.33` |
| **Endpoints** | `GET /status`, `POST /dispense` |
| **Frontend Stack** | HTML5, Vanilla CSS3, Modern JavaScript (ES6+ / IIFE) |

---

## 🚀 Getting Started

### Prerequisites
- Python 3 or Node.js (for serving locally)
- Modern web browser (Chrome, Edge, Firefox, Safari)
- ESP32 connected to the same local Wi-Fi network

### Running the Dashboard Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MallikarjunaM987/pill_pillai.git
   cd pill_pillai
   ```

2. **Start a local HTTP server:**
   *Using Python:*
   ```bash
   python -m http.server 8080
   ```
   *Or using Node.js:*
   ```bash
   npx serve . -l 8080
   ```

3. **Open the Dashboard:**
   Visit [`http://localhost:8080`](http://localhost:8080) in your web browser.

---

## 📂 Project Structure

```
├── index.html          # Complete self-contained single-page dashboard application
├── esp32.service.js    # ESP32 REST API service layer reference implementation
└── README.md           # Project documentation and setup guide
```

---

## ⚠️ Medical & Safety Disclaimer

*Dispensing confirmation indicates physical movement of the mechanical compartment by the ESP32 servo motor and does not guarantee physiological ingestion by the patient. PillPal AI is an educational IoT prototype designed for college project review and research purposes.*
