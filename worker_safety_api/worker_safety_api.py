from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/monitor', methods=['POST'])
def monitor():
    data = request.json

    rcmd = data.get('rcmd', 0)
    silica = data.get('silica', 0)
    co_ppm = data.get('co_ppm', 0)
    ch4_lel = data.get('ch4_lel', 0)

    alerts = []
    alert_color = "green" 

    if rcmd > 1.5: 
        alerts.append({
            'safety_message': (
                "<strong>CRITICAL HEALTH ALERT FOR RCMD LEVELS:</strong> RCMD levels are above the safety thresholds. Immediate action is required to limit exposure.<br>"
                "<strong>Risk of Coal Workers' Pneumoconiosis (CWP):</strong> Prolonged exposure to high levels of respirable coal mine dust (RCMD) "
                "can lead to CWP, commonly known as black lung disease.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measure:</strong><br>"
                "1. Proper Ventilation: Ensure proper ventilation to reduce dust concentration.<br>"
                "2. Water Sprays: Use water sprays to suppress dust at the source.<br>"
                "3. Personal Protective Equipment: Provide workers with proper PPE to limit exposure.<br>"
            ),
            'alert_color': "red"
        })
        alert_color = "red"

    if silica > 0.05:
        alerts.append({
            'safety_message': (
                "<strong>CRITICAL HEALTH ALERT FOR SILICA:</strong> Silica dust levels are above the safety threshold. Immediate action is required to limit exposure.<br>"
                "<strong>Risk of Silicosis:</strong> Silicosis is a lung disease caused by inhaling silica dust. Chronic exposure can lead to severe respiratory issues.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures:</strong><br>"
                "1. Proper Ventilation: Ensure proper ventilation to disperse silica dust.<br>"
                "2. Water Sprays: Use water sprays to reduce airborne dust.<br>"
                "3. Personal Protective Equipment: Provide workers with proper PPE to limit exposure.<br>"
            ),
            'alert_color': "red"
        })
        alert_color = "red"

    if co_ppm > 100:
        alerts.append({
            'safety_message': (
                "<strong>CRITICAL FIRE ALERT:</strong> CO levels are dangerously high. Immediate action is required.<br>"
                "Use of Fire Suppression Systems is recommended in critical areas.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures:</strong><br>"
                "1. Use OF Fire Suppression Systems: Automatic fire suppression systems in critical areas SHOULD BE FIRED IMMEDIATELY.<br>"
                "2. Immediate Ventilation: Proper ventilation to clear out dangerous CO levels.<br>"
                "3. Immediate Evacuation of workers mandatory<br>"
            ),
            'alert_color': "red"
        })
        alert_color = "red"
    elif 50 < co_ppm <= 100:
        alerts.append({
            'safety_message': (
                "<strong>CRITICAL HEALTH WARNING FOR CO LEVELS:</strong> CO levels are elevated. No human should enter the area due to the fatal risk.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures for Elevated CO:</strong><br>"
                "1. Increase Ventilation: Ventilation systems should be used to clear CO from the air.<br>"
                "2. Evacuate Personnel: Ensure that no workers are exposed to these levels of CO.<br>"
            ),
            'alert_color': "red"
        })
        alert_color = "red"
    elif 35 < co_ppm <= 50:
        alerts.append({
            'safety_message': (
                "<strong>ALERT FOR CO:</strong> CO levels are between. Can cause headaches, dizziness, and nausea. "
                "Immediate ventilation required.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures for Moderate CO Levels:</strong><br>"
                "1. Use Ventilation Systems: Ensure good ventilation to reduce CO levels.<br>"
                "2. Limit Exposure: Restrict the time workers spend in areas with elevated CO levels.<br>"
            ),
            'alert_color': "yellow"
        })
        alert_color = "yellow"

    if ch4_lel > 12:
        alerts.append({
            'safety_message': (
                "<strong>CRITICAL EXPLOSION ALERT FOR METHANE:</strong> Methane levels are dangerously high. Immediate evacuation required.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures for Methane:</strong><br>"
                "1. Immediate Evacuation: Evacuate all personnel from the area immediately.<br>"
                "2. Ensure Proper Ventilation: Methane buildup should be dispersed with proper ventilation systems.<br>"
                "3. Regular Monitoring: Use gas detectors to continuously monitor methane levels.<br>"
            ),
            'alert_color': "red"
        })
        alert_color = "red"
    elif 10 <= ch4_lel <= 12:
        alerts.append({
            'safety_message': (
                "<strong>ALERT:</strong> Methane levels are slightly abnormal. Monitor closely and ensure proper ventilation.<br>"
            ),
            'preventive_measures': (
                "<strong>Preventive Measures for Abnormal Methane Levels:</strong><br>"
                "1. Increase Ventilation: Ensure proper ventilation to disperse accumulated methane.<br>"
                "2. Monitor Closely: Keep a close watch on methane levels to avoid further buildup.<br>"
            ),
            'alert_color': "yellow"
        })
        alert_color = "yellow"

    if not alerts:
        alerts.append({
            'safety_message': "All safety parameters are within normal limits. No risk of fire or respiratory problems for workers. Operations can continue as usual.",
            'preventive_measures': "All good!",
            'alert_color': "green"
        })

    return jsonify({
        'alerts': alerts,
        'overall_alert_color': alert_color
    })

if __name__ == '__main__':
    app.run(debug=True)
