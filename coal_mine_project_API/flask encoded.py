import joblib
from flask import Flask, request, jsonify, abort
import pandas as pd

app = Flask(__name__)

pipeline_ch4 = joblib.load(r'D:\ai and  machine learning\pipeline_ch4_model.pkl')
pipeline_co2 = joblib.load(r'D:\ai and  machine learning\pipeline_co2_model.pkl')

REGIONS = {
'madhya pradesh': {
'coalfields': ['Singrauli Coalfield', 'Sohagpur Coalfield', 'Umaria Coalfield'],
'forests': ['Singrauli Forest', 'Sohagpur Forest', 'Umaria Forest'],
'total_co2_absorbed': {
'Singrauli Coalfield': 200000,
'Sohagpur Coalfield': 150000,
'Umaria Coalfield': 150000
}
},
'chhattisgarh': {
'coalfields': ['Korba Coalfield', 'Raigarh Coalfield', 'Hasdeo-Arand Coalfield'],
'forests': ['Korba Forest', 'Raigarh Forest', 'Hasdeo-Arand Forest'],
'total_co2_absorbed': {
'Korba Coalfield': 180000,
'Raigarh Coalfield': 140000,
'Hasdeo-Arand Coalfield': 130000
}
},
'jharkhand': {
'coalfields': ['Jharia Coalfield', 'Giridih Coalfield', 'Ramgarh Coalfield'],
'forests': ['Jharia Forest', 'Giridih Forest', 'Ramgarh Forest'],
'total_co2_absorbed': {
'Jharia Coalfield': 160000,
'Giridih Coalfield': 120000,
'Ramgarh Coalfield': 120000
}
},
'odisha': {
'coalfields': ['Talcher Coalfield', 'Ib Valley Coalfield', 'Brahmaputra Coalfield'],
'forests': ['Talcher Forest', 'Ib Valley Forest', 'Brahmaputra Forest'],
'total_co2_absorbed': {
'Talcher Coalfield': 170000,
'Ib Valley Coalfield': 130000,
'Brahmaputra Coalfield': 120000
}
},
'west bengal': {
'coalfields': ['Raniganj Coalfield', 'Mugma Coalfield', 'Asansol Coalfield'],
'forests': ['Raniganj Forest', 'Mugma Forest', 'Asansol Forest'],
'total_co2_absorbed': {
'Raniganj Coalfield': 190000,
'Mugma Coalfield': 150000,
'Asansol Coalfield': 140000
}
},
'maharashtra': {
'coalfields': ['Wardha Valley Coalfield', 'Nagpur Coalfield', 'Chandrapur Coalfield'],
'forests': ['Wardha Valley Forest', 'Nagpur Forest', 'Chandrapur Forest'],
'total_co2_absorbed': {
'Wardha Valley Coalfield': 180000,
'Nagpur Coalfield': 140000,
'Chandrapur Coalfield': 150000
}
},
'telangana': {
'coalfields': ['Singareni Coalfield', 'Godavari Valley Coalfield', 'Ramagundam Coalfield'],
'forests': ['Singareni Forest', 'Godavari Valley Forest', 'Ramagundam Forest'],
'total_co2_absorbed': {
'Singareni Coalfield': 190000,
'Godavari Valley Coalfield': 150000,
'Ramagundam Coalfield': 120000
}
},
'assam': {
'coalfields': ['Margherita Coalfield', 'Tikak Coalfield', 'Namchik-Namphuk Coalfield'],
'forests': ['Margherita Forest', 'Tikak Forest', 'Namchik-Namphuk Forest'],
'total_co2_absorbed': {
'Margherita Coalfield': 160000,
'Tikak Coalfield': 130000,
'Namchik-Namphuk Coalfield':150000
}
}
}

def get_total_co2_absorbed(coalfield, state):
    # Normalize input for matching
    coalfield = coalfield.lower()
    state = state.lower()

    if state in REGIONS:
        region_info = REGIONS[state]
        coalfields = [cf.lower() for cf in region_info['coalfields']]

        if coalfield in coalfields:
            # Return the CO2 absorbed for the specific coalfield
            return region_info['total_co2_absorbed'][region_info['coalfields'][coalfields.index(coalfield)]]
        else:
            return f"Coalfield '{coalfield}' not found in state '{state}'."
    else:
        return f'State {state} not found.'

# Define CO2 savings factors (kg CO2 saved per unit)
EMISSION_CONTROL_MEASURES = {
    'carbon_capture': {
        'description': 'Carbon Capture and Storage (CCS)',
        'unit': 'kg CO2',
        'factor': 2800  # kg CO2 saved per tonne of coal mined
    },
    'solar_panels': {
        'description': 'Solar Panel Installation',
        'unit': 'kg CO2',
        'factor': 1000  # kg CO2 saved per solar panel installed
    },
    'biofuels': {
        'description': 'Transition to Biofuels',
        'unit': 'kg CO2',
        'factor': 500  # kg CO2 saved per litre of biofuel used
    },
    'methane_capture': {
        'description': 'Methane Emission Capture',
        'unit': 'kg CO2',
        'factor': 25  # kg CO2 saved per kg of methane captured
    },
    'afforestation': {
        'description': 'Afforestation/Reforestation',
        'unit': 'kg CO2',
        'factor': 22  # kg CO2 absorbed per tree per year
    },
    'modernization': {
        'description': 'Modernization of Mining Equipment',
        'unit': 'kg CO2',
        'factor': 1500  # kg CO2 saved per modernization project
    },
    'energy_efficiency': {
        'description': 'Energy-Efficient Practices',
        'unit': 'kg CO2',
        'factor': 800  # kg CO2 saved per energy-efficient initiative
    },
    'electric_vehicles': {
        'description': 'Switching to Electric Vehicles',
        'unit': 'kg CO2',
        'factor': 2000  # kg CO2 saved per electric vehicle replaced
    }
}


# Flatten the EMISSION_CONTROL_MEASURES for easier iteration
FLATTENED_EMISSION_CONTROLS = {}
for key, details in EMISSION_CONTROL_MEASURES.items():
    FLATTENED_EMISSION_CONTROLS[key] = details


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # yehi auto fill kr de ya toh 
    default_values = {
        'depth': 250,
        'degree': 1,
        'coal_mined': 20000,
        'coal_type': 'Anthracite',
        'mine_type': 'underground',
        'diesel_usage': 100,
        'electricity_usage': 1000,
        'coal_used_as_fuel': 0,
        'vehicle_count': 10,
        'coalfield': 'Singrauli Coalfield',
        'state': 'Madhya Pradesh'
    }

    input_data = {
        'depth': [data.get('depth', default_values['depth'])],
        'degree': [data.get('degree', default_values['degree'])],
        'coal_mined': [data.get('coal_mined', default_values['coal_mined'])],
        'coal_type': [data.get('coal_type', default_values['coal_type'])],
        'mine_type': [data.get('mine_type', default_values['mine_type'])],
        'diesel_usage': [data.get('diesel_usage', default_values['diesel_usage'])],
        'electricity_usage': [data.get('electricity_usage', default_values['electricity_usage'])],
        'coal_used_as_fuel': [data.get('coal_used_as_fuel', default_values['coal_used_as_fuel'])],
        'vehicle_count': [data.get('vehicle_count', default_values['vehicle_count'])],
        'coalfield': [data.get('coalfield', default_values['coalfield']).lower()],
        'state': [data.get('state', default_values['state']).lower()]
    }
    if input_data['mine_type'][0] == 'mixed':
        input_data['mine_type'] = ['underground']
    input_df = pd.DataFrame(input_data)
    

    predicted_ch4 = pipeline_ch4.predict(input_df[['depth', 'degree', 'coal_mined', 'coal_type', 'mine_type']])
    predicted_co2 = pipeline_co2.predict(input_df[['diesel_usage', 'electricity_usage', 'coal_used_as_fuel', 'vehicle_count']])

    methane_to_co2_equivalence = predicted_ch4[0] * 12
    total_carbon_footprints = predicted_co2[0] + methane_to_co2_equivalence

    region_co2_absorbed = get_total_co2_absorbed(input_data['coalfield'][0], input_data['state'][0])
    if(total_carbon_footprints >= region_co2_absorbed):
        emmision_alert = "Critical ALERT!! - The total carbon footprints exceed the region's CO2 absorption capacity. Consider implementing emission control measures to reduce emissions. ASAP."
        excess_emissions = total_carbon_footprints - region_co2_absorbed
        trees_needed_after_absorption = excess_emissions / 22
        area_covered_after_absorption = trees_needed_after_absorption / 9882
    else:
        excess_emissions = 0
        trees_needed_after_absorption = 0
        area_covered_after_absorption = 0
        emmision_alert = "The total carbon footprints are within the region's CO2 absorption capacity."

    trees_required = total_carbon_footprints / 20
    area_covered = trees_required / 9882

    coal_amount = input_data['coal_mined'][0]
    co2_from_coal = coal_amount * 2800
    steam_from_coal = coal_amount * 6.5

    elephant_weight_kg = 6000
    elephants_equivalent = total_carbon_footprints / elephant_weight_kg

    solar_panel_efficiency = 0.1
    coal_reduction_by_solar = coal_amount * solar_panel_efficiency
    panels_needed = coal_reduction_by_solar / 2
    panel_area = 1.6  
    total_panel_area = panels_needed * panel_area
    recommendations = []
    if input_data['diesel_usage'][0] > 1000:
        recommendations.append("Consider reducing diesel usage for transportation to lower emissions.")
    if input_data['electricity_usage'][0] > 16000:
        recommendations.append("Explore renewable energy sources to decrease electricity usage.")

    afforestation_links = [
        "https://maps.app.goo.gl/tMRNUMc7TroTTX3o7",
        "https://maps.app.goo.gl/8j7SboCrF5rpCBc86",
        "https://www.google.com/maps?q=afforestation+area+3+India"
    ]

    coal_type = input_data['coal_type'][0].lower()
    modernization_co2_reduction = 0  
    if coal_type in ["bituminous", "anthracite", "sub-bituminous a", "sub-bituminous b"]:
        diesel_emission_factor = 2.68
        electricity_emission_factor = 0.86
        modernization_effect = coal_amount * 0.1
        modernization_co2_reduction = modernization_effect * 2800 * (diesel_emission_factor - electricity_emission_factor)
    else:
        modernization_co2_reduction = 0

    diesel_usage = input_data['diesel_usage'][0]
    diesel_emission_factor = 2.68
    diesel_emission_reduction = diesel_usage * 0.125

    biofuel_emission_factor = 2.25
    ethanol_emission_factor = 2.0
    biofuel_usage = diesel_usage * 0.5  
    biofuel_co2_reduction = biofuel_usage * biofuel_emission_factor
    ethanol_co2_reduction = diesel_usage * 0.5 * ethanol_emission_factor

    recommendations = []
    if diesel_usage > 1000:
        recommendations.append("Consider reducing diesel usage for transportation to lower emissions.")
    if input_data['electricity_usage'][0] > 15000:
        recommendations.append("Explore renewable energy sources to decrease electricity usage.")
    if coal_type in ["bituminous", "anthracite", "sub-bituminous a", "sub-bituminous b"]:
        recommendations.append("Modernize the mine with inclined systems and conveyor belts for better efficiency as the coal type is promising.")
    if methane_to_co2_equivalence > 1000 and input_data['degree'][0] >= 2:
        recommendations.append("Implement a methane storage system to trap and use emitted methane.")
    if input_data['state'][0].lower() == 'madhya pradesh':
        recommendations.append(
            "To reduce carbon footprint in Madhya Pradesh:<ol>" +
            "<li>Utilize vast solar potential in desert regions.</li>" +
            "<li>Promote sustainable forestry practices in dense forests.</li>" +
            "<li>Develop hydroelectric power from Narmada and Tapti rivers.</li></ol>"
        )

    if input_data['state'][0].lower() == 'chhattisgarh':
        recommendations.append(
            "To reduce carbon footprint in Chhattisgarh:<ol>" +
            "<li>Harness wind energy in plateau regions.</li>" +
            "<li>Implement efficient coal mining practices.</li>" +
            "<li>Develop eco-tourism in biodiversity-rich areas.</li></ol>"
        )

    if input_data['state'][0].lower() == 'jharkhand':
        recommendations.append(
            "To reduce carbon footprint in Jharkhand:<ol>" +
            "<li>Leverage coal mine methane capture.</li>" +
            "<li>Develop hydroelectric power from Damodar River.</li>" +
            "<li>Promote sustainable agriculture practices.</li></ol>"
        )

    if input_data['state'][0].lower() == 'Odisha':
        recommendations.append(
            "To reduce carbon footprint in Odisha:<ol>" +
            "<li>Harness offshore wind energy.</li>" +
            "<li>Develop hydroelectric power from Mahanadi River.</li>" +
            "<li>Protect and restore mangrove forests.</li></ol>"
        )

    if input_data['state'][0].lower() == 'west bengal':
        recommendations.append(
            "To reduce carbon footprint in West Bengal:<ol>" +
            "<li>Utilize solar potential in delta regions.</li>" +
            "<li>Promote sustainable fishing practices.</li>" +
            "<li>Develop eco-tourism in Sundarbans.</li></ol>"
        )

    if input_data['state'][0].lower() == 'maharashtra':
        recommendations.append(
            "To reduce carbon footprint in Maharashtra:<ol>" +
            "<li>Harness offshore wind energy.</li>" +
            "<li>Develop hydroelectric power from Western Ghats.</li>" +
            "<li>Promote sustainable agriculture practices.</li></ol>"
        )

    if input_data['state'][0].lower() == 'telangana':
        recommendations.append(
            "To reduce carbon footprint in Telangana:<ol>" +
            "<li>Utilize solar potential in dry regions.</li>" +
            "<li>Develop hydroelectric power from Godavari River.</li>" +
            "<li>Promote sustainable forestry practices.</li></ol>"
        )

    if input_data['state'][0].lower() == 'assam':
        recommendations.append(
            "To reduce carbon footprint in Assam:<ol>" +
            "<li>Harness hydroelectric power from Brahmaputra River.</li>" +
            "<li>Protect and restore wetlands.</li>" +
            "<li>Promote sustainable tea cultivation practices.</li></ol>")


    methane_emitted = predicted_ch4[0]
    methane_trapped = methane_emitted * 0.15
    methane_co2_equivalence = methane_trapped * 25

    carbon_capture_reduction = total_carbon_footprints * 0.10

    methane_recommendation = (
        f"Implementing a methane storage system to trap and use 15% of emitted methane could reduce carbon footprints by approximately "
        f"{0.15*(methane_co2_equivalence):,.2f} kg."
    )

    potential_reduction = (
        (solar_reduction := total_carbon_footprints * 0.10) +
        (capture_reduction := carbon_capture_reduction * 0.5) +
        (modernization_reduction := modernization_co2_reduction * 0.5) +
        (biofuel_reduction := (biofuel_co2_reduction + ethanol_co2_reduction) * 0.5)
    )
    
    potential_elephants_equivalent = potential_reduction / elephant_weight_kg
    prediction_co2 = round(predicted_co2[0], 2)
    prediction_ch4 = round(predicted_ch4[0], 2)

    impact = (
        f"<h2>Impact of Emissions</h2>"
        f"<p>Imagine {elephants_equivalent:,.2f} elephants worth of carbon footprint!</p>"
        f"<p>{total_carbon_footprints:,.2f} kg CO2 emitted contributes to global warming, severe weather events, and the greenhouse effect.</p>"
        f"<p>Methane is even more dangerous as it has a higher global warming potential compared to CO2. The emitted methane is equivalent to {methane_to_co2_equivalence:,.2f} kg CO2.</p>"
        f"<h3>Call to Action</h3>"
        f"<p>Let's protect our planet for future generations!</p>"
    )
        
    possible_solutions = (
        f"<h2>Possible Solutions</h2>"
        f"<ol>"
        f"<li>Utilize solar panels: Reduce coal usage by 10% with {panels_needed:,.2f} panels, covering {total_panel_area:,.2f} sqm.</li>"
        f"<li>Capture CO₂ Emissions: Invest in CCS, offsetting {carbon_capture_reduction:,.2f} kg carbon footprints.</li>"
        f"<li>Afforestation: Consider these areas: <ul>" + "".join(f"<li><a href='{link}'>{link}</a></li>" for link in afforestation_links) + "</ul></li>"
        f"<li>Transition to nuclear power, biofuels, or ethanol, reducing CO2 emissions by {biofuel_co2_reduction:,.2f} kg or {ethanol_co2_reduction:,.2f} kg.</li>"
        f"<li>{methane_recommendation}</li>"
        f"<li>India's energy future: Develop <strong>plutonium</strong> extraction technology for nuclear power plants, potentially reducing coal dependency. Current regulatory frameworks limit plutonium utilization, highlighting the need for policy updates and investments in this critical area.</li>"
        f"<li>Consider reducing diesel usage for transportation and exploring renewable energy sources to decrease electricity usage.</li>"
        f"<li>Modernize the mine with inclined systems and conveyor belts for better efficiency.</li>"
        f"</ol>"
        f"<h3>Future Impact</h3>"
        f"<p>Implementing 50% of these solutions could reduce carbon footprints by {potential_reduction:,.2f} kg which is very significant</p>"
        )


    other_gases_emissions = total_carbon_footprints - (predicted_co2[0] + predicted_ch4[0])
    trees_needed = (total_carbon_footprints / 22)
    trees_area_in_hectares = (trees_needed) / 9899

    recommended_tree_plantation_areas = [
        "https://maps.app.goo.gl/8j7SboCrF5rpCBc86",
        "https://maps.app.goo.gl/tMRNUMc7TroTTX3o7",
        "https://www.google.com/maps?q=afforestation+area+3+India"
    ]
    
    return jsonify({
        'region_co2_absorbed': region_co2_absorbed,
        'emmision_alert': emmision_alert,
        'excess_emissions': excess_emissions,
        'trees_needed_after_absorption': trees_needed_after_absorption,
        'area_covered_after_absorption': area_covered_after_absorption,
        'recommendations': recommendations,
        'prediction_co2': prediction_co2,
        'prediction_ch4': prediction_ch4,
        'impact': impact,
        'possible_solutions': possible_solutions,
        'trees_needed': trees_needed,
        'trees_area_in_hectares': trees_area_in_hectares,
        'recommended_tree_plantation_areas': recommended_tree_plantation_areas,
        'total_carbon_footprints': total_carbon_footprints,
        'other_gases_emissions': other_gases_emissions
    })


@app.route('/emission_control', methods=['POST'])
def emission_control():
    data = request.json

    if not data:
        data = {}
    
    emission_controls_input = data.get('emission_controls', {})

    solutions_saved = {}
    total_co2_saved = 0

    for control, details in EMISSION_CONTROL_MEASURES.items():
        quantity = emission_controls_input.get(control, {}).get('quantity', 0)
        if not isinstance(quantity, (int, float)) or quantity < 0:
            quantity = 0  # Fallback to zero for invalid quantities

        co2_saved = quantity * details['factor']
        solutions_saved[control] = {
            'description': details['description'],
            'co2_saved_kg': round(co2_saved, 2),
            'unit': details['unit']
        }
        total_co2_saved += co2_saved


    carbon_credits = total_co2_saved / 1000  

    response = {
        'total_co2_saved_kg': round(total_co2_saved, 2),
        'carbon_credits_earned': round(carbon_credits, 2),
        'solutions_saved': solutions_saved
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
