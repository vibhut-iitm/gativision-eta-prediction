# GatiVision — AI-Powered Railway ETA Prediction

GatiVision is a railway ETA prediction system designed to provide more useful and dynamic train arrival estimates.

Instead of relying only on the scheduled arrival time and current delay, GatiVision uses train-running information and historical running patterns to estimate the expected delay at a selected station.

The project combines a modern web application with a machine-learning service to make train ETA information easier to understand and more useful for passengers and railway operations.

---

## Problem Statement

Train arrival times can change because of several factors such as:

* Current running delays
* Congestion on railway routes
* Unscheduled stoppages
* Speed restrictions
* Delays at previous stations
* Operational bottlenecks
* Variations in travel time between stations

A simple calculation based on the current delay may therefore not always provide a useful estimate of the final arrival time.

GatiVision aims to provide a data-driven ETA by considering current running conditions and historical delay patterns.

---

## Our Solution

GatiVision predicts the expected delay of a train at a selected station using a machine-learning regression model.

The system follows this basic process:

```text
Train Running Data
        ↓
Current Train Status
        ↓
Historical Running Patterns
        ↓
Machine Learning Model
        ↓
Predicted Delay
        ↓
Predicted ETA
```

The predicted delay is combined with the scheduled arrival time to calculate the expected arrival time.

### Example

```text
Scheduled Arrival : 18:00
Predicted Delay   : +17 minutes
Predicted ETA     : 18:17
```

---

## Key Features

* Train search
* Train and route information
* Current delay information
* Station selection
* Scheduled arrival time
* ML-based delay prediction
* Predicted train ETA
* Historical running information
* Simple and user-friendly dashboard
* REST APIs for application and prediction services
* MongoDB-based data storage

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib

### ML Model

The project uses a regression-based machine-learning approach to predict train delay in minutes.

The model can use features such as:

* Current delay
* Previous station delay
* Distance remaining
* Average route delay
* Average segment travel time
* Scheduled travel time
* Journey progress

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite      │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Backend        │
                    └───────┬───────┬─────┘
                            │       │
                            │       ▼
                            │  ┌──────────────┐
                            │  │   MongoDB    │
                            │  │   Database   │
                            │  └──────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │   Python ML Service │
                    │   Scikit-learn      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Predicted Train ETA │
                    └─────────────────────┘
```

---

## Project Structure

```text
gativision-eta-prediction/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── server.js
│
├── ml-service/
│   ├── data/
│   ├── model/
│   ├── train.py
│   ├── predict.py
│   ├── app.py
│   └── requirements.txt
│
├── README.md
├── .gitignore
└── package.json
```

---

## How GatiVision Predicts ETA

The prediction pipeline consists of the following steps:

### 1. Collect Train Information

The system receives train-running information such as the current delay, route position and scheduled timings.

### 2. Prepare Features

Relevant information is converted into numerical features that can be processed by the machine-learning model.

### 3. Predict Delay

The trained regression model estimates the expected delay at the selected station.

### 4. Calculate ETA

The predicted delay is added to the scheduled arrival time.

```text
Predicted ETA =
Scheduled Arrival Time + Predicted Delay
```

### 5. Display Result

The user can see both the scheduled arrival and the predicted ETA on the dashboard.

---

## API Structure

The backend is designed around REST APIs.

Example endpoints:

```text
GET  /api/trains
GET  /api/trains/:trainNumber
GET  /api/trains/:trainNumber/status
GET  /api/trains/:trainNumber/stations

POST /api/predict

GET  /api/predictions/:trainNumber
```

The exact endpoints may evolve during development.

---

## Machine Learning

GatiVision treats ETA prediction as a regression problem.

The model learns the relationship between train-running conditions and observed delays.

Possible input features include:

| Feature                | Description                               |
| ---------------------- | ----------------------------------------- |
| Current Delay          | Current delay of the train                |
| Previous Station Delay | Delay recorded at the previous station    |
| Distance Remaining     | Remaining route distance                  |
| Average Route Delay    | Historical average delay                  |
| Segment Travel Time    | Typical travel time for the route segment |
| Scheduled Travel Time  | Planned travel duration                   |
| Journey Progress       | Percentage of journey completed           |

The output is the predicted delay in minutes.

Model performance will be evaluated using appropriate regression metrics such as **MAE** and **RMSE** on test data.

---

## Data

The model requires train-running and historical delay information for training and evaluation.

If demonstration or synthetic data is used during development, it will be clearly identified as such and will not be presented as live railway data.

The project architecture is designed so that a suitable real-world railway data source can be integrated later.

---

## Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3
* MongoDB or MongoDB Atlas
* Git

### Clone the Repository

```bash
git clone https://github.com/vibhut-iitm/gativision-eta-prediction.git

cd gativision-eta-prediction
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

### ML Service

Open another terminal:

```bash
cd ml-service

python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the ML service:

```bash
python app.py
```

---

## Environment Variables

Create the required `.env` files locally.

Example backend configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ML_SERVICE_URL=http://localhost:8000
```

Do not commit passwords, API keys, database credentials or other secrets to GitHub.

---

## Development Workflow

The project is being developed in separate stages:

```text
Project Setup
     ↓
Database Setup
     ↓
Backend APIs
     ↓
Train Data
     ↓
ML Dataset Preparation
     ↓
Model Training
     ↓
ML Prediction API
     ↓
Backend + ML Integration
     ↓
React Dashboard
     ↓
Testing
     ↓
Deployment
```

---

## Future Scope

Possible future improvements include:

* Integration with reliable live railway data sources
* Multi-station ETA prediction
* Route-level delay visualization
* Historical delay charts
* Improved machine-learning models
* Weather and operational data integration
* Prediction history
* Data-quality indicators
* More advanced route and congestion analysis

---

## Impact

More useful ETA information can help passengers plan their journeys with better awareness of expected arrival times.

The same type of prediction system can also support operational planning by providing data-driven estimates for downstream activities such as platform planning, crew coordination, cleaning and feeder transport.

---

## Limitations

The quality of ETA predictions depends on the availability and quality of train-running and historical data.

The system should not be considered an official railway information source unless it is connected to and authorized to use an appropriate official data source.

Predictions are estimates and may differ from actual train arrival times.

---

## Team

**Team Souls**

Hackathon Team ID: **KT-2038**

---

## Project

**GatiVision — AI-Powered Railway ETA Prediction**

Built as a software hackathon project with a focus on practical railway ETA prediction using web technologies and machine learning.

---

## License

This project is developed for hackathon and educational purposes.
