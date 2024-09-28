import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Monitoring API. Use the /monitor endpoint to send data.');
});

app.post('/monitor', (req, res) => {
    const data = req.body;

    const rcmd = data.rcmd || 0;
    const silica = data.silica || 0;
    const co_ppm = data.co_ppm || 0;
    const ch4_lel = data.ch4_lel || 0;

    let safetyMessage = "";
    let preventiveMeasures = "";

    let alertTriggered = false;

    // RCMD check
    if (rcmd > 1.5) {
        safetyMessage += (
            "CRITICAL HEALTH ALERT: RCMD levels are above the safety thresholds. Immediate action is required to limit exposure.\n" +
            "Risk of Coal Workers' Pneumoconiosis (CWP): Prolonged exposure to high levels of respirable coal mine dust (RCMD) " +
            "can lead to CWP, commonly known as black lung disease.\n"
        );
        preventiveMeasures += (
            "Preventive Measures:\n" +
            "1. Proper Ventilation: Ensure proper ventilation to reduce dust concentration.\n" +
            "2. Water Sprays: Use water sprays to suppress dust at the source.\n" +
            "3. Personal Protective Equipment: Provide workers with proper PPE to limit exposure.\n"
        );
        alertTriggered = true;
    }

    // Silica check
    if (silica > 0.05) {
        safetyMessage += (
            "CRITICAL HEALTH ALERT: Silica dust levels are above the safety threshold. Immediate action is required to limit exposure.\n" +
            "Risk of Silicosis: Silicosis is a lung disease caused by inhaling silica dust. Chronic exposure can lead to severe respiratory issues.\n"
        );
        preventiveMeasures += (
            "Preventive Measures:\n" +
            "1. Proper Ventilation: Ensure proper ventilation to disperse silica dust.\n" +
            "2. Water Sprays: Use water sprays to reduce airborne dust.\n" +
            "3. Personal Protective Equipment: Provide workers with proper PPE to limit exposure.\n"
        );
        alertTriggered = true;
    }

    // CO check
    if (co_ppm > 100) {
        safetyMessage += (
            "CRITICAL FIRE ALERT: CO levels are dangerously high. Immediate action is required.\n" +
            "Use of Fire Suppression Systems is recommended in critical areas.\n"
        );
        preventiveMeasures += (
            "Preventive Measures:\n" +
            "1. Use of Fire Suppression Systems: Automatic fire suppression systems in critical areas SHOULD BE FIRED IMMEDIATELY.\n" +
            "2. Immediate Ventilation: Proper ventilation to clear out dangerous CO levels.\n" +
            "3. Immediate Evacuation of workers is mandatory.\n"
        );
        alertTriggered = true;
    } else if (co_ppm > 50 && co_ppm <= 100) {
        safetyMessage += "CRITICAL HEALTH WARNING: CO levels are elevated. No human should enter the area due to the fatal risk.\n";
        preventiveMeasures += (
            "Preventive Measures for Elevated CO:\n" +
            "1. Increase Ventilation: Ventilation systems should be used to clear CO from the air.\n" +
            "2. Evacuate Personnel: Ensure that no workers are exposed to these levels of CO.\n"
        );
        alertTriggered = true;
    } else if (co_ppm > 35 && co_ppm <= 50) {
        safetyMessage += "ALERT: CO levels can cause headaches, dizziness, and nausea. Immediate ventilation required.\n";
        preventiveMeasures += (
            "Preventive Measures for Moderate CO Levels:\n" +
            "1. Use Ventilation Systems: Ensure good ventilation to reduce CO levels.\n" +
            "2. Limit Exposure: Restrict the time workers spend in areas with elevated CO levels.\n"
        );
        alertTriggered = true;
    }

    // Methane check
    if (ch4_lel > 12) {
        safetyMessage += "CRITICAL EXPLOSION ALERT: Methane levels are dangerously high. Immediate evacuation required.\n";
        preventiveMeasures += (
            "Preventive Measures for Methane:\n" +
            "1. Immediate Evacuation: Evacuate all personnel from the area immediately.\n" +
            "2. Ensure Proper Ventilation: Methane buildup should be dispersed with proper ventilation systems.\n" +
            "3. Regular Monitoring: Use gas detectors to continuously monitor methane levels.\n"
        );
        alertTriggered = true;
    } else if (ch4_lel >= 10 && ch4_lel <= 12) {
        safetyMessage += "ALERT: Methane levels are slightly abnormal. Monitor closely and ensure proper ventilation.\n";
        preventiveMeasures += (
            "Preventive Measures for Abnormal Methane Levels:\n" +
            "1. Increase Ventilation: Ensure proper ventilation to disperse accumulated methane.\n" +
            "2. Monitor Closely: Keep a close watch on methane levels to avoid further buildup.\n"
        );
        alertTriggered = true;
    }

    if (!alertTriggered) {
        safetyMessage = "All safety parameters are within normal limits. No risk of fire or respiratory problems for workers. Operations can continue as usual.";
    }

    res.json({
        safety_message: safetyMessage,
        preventive_measures: preventiveMeasures
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
