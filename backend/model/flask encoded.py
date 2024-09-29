import joblib
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

pipeline_ch4 = joblib.load(
    r'D:\\github_coal_mine\\SIH_1644\\backend\\model\\pipeline_ch4_model.pkl')
pipeline_co2 = joblib.load(
    r'D:\\github_coal_mine\\SIH_1644\\backend\\model\\pipeline_co2_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    input_data = {
        'depth': [data['depth']],
        'degree': [data['degree']],
        'coal_mined': [data['coal_mined']],
        'coal_type': [data['coal_type']],
        'mine_type': [data['mine_type']],
        'diesel_usage': [data['diesel_usage']],
        'electricity_usage': [data['electricity_usage']],
        'coal_used_as_fuel': [data['coal_used_as_fuel']],
        'vehicle_count': [data['vehicle_count']]
    }

    input_df = pd.DataFrame(input_data)

    predicted_ch4 = pipeline_ch4.predict(input_df[['depth', 'degree', 'coal_mined', 'coal_type', 'mine_type']])
    predicted_co2 = pipeline_co2.predict(input_df[['diesel_usage', 'electricity_usage', 'coal_used_as_fuel', 'vehicle_count']])

    methane_to_co2_equivalence = predicted_ch4[0] * 12
    total_carbon_footprints = predicted_co2[0] + methane_to_co2_equivalence + 0.0005 * (predicted_co2[0] + predicted_ch4[0])

    trees_required = total_carbon_footprints / 22
    area_covered = trees_required * 0.1
    area_hectares = area_covered / 10000

    coal_amount = data['coal_mined']
    co2_from_coal = coal_amount * 2800
    steam_from_coal = coal_amount * 6.5

    elephant_weight_kg = 6000
    elephants_equivalent = total_carbon_footprints / elephant_weight_kg

    solar_panel_efficiency = 0.1
    coal_reduction_by_solar = coal_amount * solar_panel_efficiency
    panels_needed = coal_reduction_by_solar / 2
    panel_area = 1.6  
    total_panel_area = panels_needed * panel_area

    afforestation_links = [
        "https://www.google.com/maps?q=afforestation+area+1+India",
        "https://www.google.com/maps?q=afforestation+area+2+India",
        "https://www.google.com/maps?q=afforestation+area+3+India"
    ]

    coal_type = data['coal_type'].lower()
    modernization_co2_reduction = 0  # Initialize to zero
    if coal_type in ["bituminous", "anthracite", "sub-bituminous a", "sub-bituminous b"]:
        diesel_emission_factor = 2.68
        electricity_emission_factor = 0.86
        modernization_effect = coal_amount * 0.1
        modernization_co2_reduction = modernization_effect * 2800 * (diesel_emission_factor - electricity_emission_factor)
    else:
        modernization_co2_reduction = 0

    diesel_usage = data['diesel_usage']
    diesel_emission_factor = 2.68
    diesel_emission_reduction = diesel_usage * 0.125

    biofuel_emission_factor = 2.25
    ethanol_emission_factor = 2.0
    biofuel_usage = diesel_usage * 0.5  
    biofuel_co2_reduction = biofuel_usage * biofuel_emission_factor
    ethanol_co2_reduction = diesel_usage * 0.5 * ethanol_emission_factor

    recommendations = []
    if data['diesel_usage'] > 100:
        recommendations.append("Consider reducing diesel usage for transportation to lower emissions.")
    if data['electricity_usage'] > 1000:
        recommendations.append("Explore renewable energy sources to decrease electricity usage.")

    methane_emitted = predicted_ch4[0]
    methane_trapped = methane_emitted * 0.15
    methane_co2_equivalence = methane_trapped * 25

    carbon_capture_reduction = total_carbon_footprints * 0.10

    methane_recommendation = (
        f"Implementing a methane storage system to trap and use 15% of emitted methane could reduce carbon footprints by approximately "
        f"{methane_co2_equivalence:,.2f} kg."
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

    report = (
        f"The amount of CO2 predicted is <b> {predicted_co2[0]:,.2f} </b> </b> kg, "
        f"<br>"
        f"<br>"
        f"and the amount of CH4 predicted is <b> {predicted_ch4[0]:,.2f} </b> kg. "
        f"<br>"
        f"<br>"
        f"The total carbon footprints are <b> {total_carbon_footprints:,.2f} </b> kg. "
        f"<br>"
        f"<br>"
        f"To offset this, we would need approximately <b> {trees_required:,.2f} </b> trees, "
        f"<br>"
        f"<br>"
        f"covering an area of <b> {area_hectares:,.2f} </b>hectares. "
        f"<br>"
        f"<br>"
        f"The coal mined would produce <b> {co2_from_coal:,.2f} </b> kg of CO2 and "
        f"<br>"
        f"<br>"
        f"<b> {steam_from_coal:,.2f} </b> tons of steam."
    )

    impact = (
        f"<h2> <b>Impact of Emissions </b></h2>"
        f"<p>Imagine that the total carbon footprints produced by the mine are equivalent to the weight of about "
        f"<strong>{elephants_equivalent:,.2f}</strong> elephants. That's a lot of elephants!</p>"
        f"<br>"
        f"<br>"
        f"<p>These emissions are not just numbers; they have real-world consequences. For example, the CO2 emissions from coal mining can contribute to global warming, "
        f"leading to more frequent and severe weather events like hurricanes, droughts, and heatwaves.</p>"
        f"<br>"
        f"<br>"
        f"<p>Moreover, methane emissions from coal mines can trap heat in the atmosphere, contributing to the greenhouse effect. "
        f"Methane is a potent greenhouse gas, with a global warming potential 25 times greater than CO2 over a 100-year period.</p>"
        f"<br>"
        f"<br>"
        f"<p>It's crucial to consider the environmental impact of these emissions and explore ways to mitigate their effects. "
        f"By implementing sustainable practices and reducing emissions, we can help protect our planet and create a cleaner, greener future for all.</p>"
        f"<br>"
        f"<br>"
        f"<p>As we consider the implications, it's essential to recognize that the <strong>{total_carbon_footprints:,.2f} kg</strong> of CO2 emitted "
        f"contributes to global warming by trapping heat in our atmosphere. Every ton of CO2 we emit raises global temperatures, "
        f"creating a greenhouse effect that is like wrapping our planet in an increasingly thick blanket.</p>"
        f"<br>"
        f"<br>"
        f"<p>This warming leads to melting glaciers, rising sea levels, and extreme weather patterns. "
        f"We are not just looking at numbers; we are witnessing changes that can affect our way of life, "
        f"like hurricanes that become more powerful and droughts that turn fertile land into barren deserts.</p>"
        f"<br>"
        f"<br>"
        f"<h3> <b>The Bigger Picture </b></h3>"
        f"<p>These figures paint a stark picture of the environmental challenges we face. The sheer volume of carbon emissions illustrates a critical need for action. "
        f"If every coal mine operated similarly, the cumulative impact on our climate could be devastating, exacerbating global warming and threatening biodiversity.</p>"
        f"<br>"
        f"<br>"
        f"<h3> <b>Call to Action </b></h3>"
        f"<br>"
        f"<p>We need to take immediate steps to transition to cleaner energy sources, reduce our dependence on coal, and invest in reforestation and sustainability efforts. "
        f"Each tree planted can absorb approximately 22 kg of CO2 per year, helping to mitigate the effects of carbon emissions. "
        f"Lets work together to protect our planet for future generations!</p>"
    )

    possible_solutions = (
        f"<h2>Possible Solutions</h2>"
        f"<ol>"
        f"<li>Utilizing solar panels can significantly reduce coal usage. By reducing coal requirements by 10%, "
        f"it would take approximately <strong>{panels_needed:,.2f}</strong> solar panels, covering an area of <strong>{total_panel_area:,.2f}</strong> square meters.</li>"
        f"<br>"
        f"<li>Capture CO₂ Emissions: Invest in carbon capture and storage (CCS) technologies that capture CO₂ emissions from machinery and processes before they enter the atmosphere, "
        f"potentially offsetting about <strong>{carbon_capture_reduction:,.2f}</strong> kg of carbon footprints.</li>"
        f"<br>"
        f"<li>Here are some recommended areas for afforestation:</li>"
        f"<ul>" +
        "".join(
            f" <b><li> <a href='{link}'>{link}</a>  </li> </b> " for link in afforestation_links) + "</ul>"
        f"<br>"
        f"<li>Focusing on nuclear power plants and the potential extraction of energy from plutonium can tremendously decrease our dependency on coal. Could significantly reduce dependency on coal, promoting a cleaner energy future.</li>"
        f"<br>"
        f"<li>Given the good coal reserves, modernization of the mine to use inclined systems and conveyor belts can lead to better efficiency for coal mining.</li>"
        f"<br>"
        f"<li>Transitioning to biofuels can lead to a reduction of <strong>{biofuel_co2_reduction:,.2f}</strong> kg CO2 emissions if using biofuels, or "
        f"<strong>{ethanol_co2_reduction:,.2f}</strong> kg CO2 emissions if using ethanol as an alternative to diesel.</li>"
        f"<br>"
        f"<li>{methane_recommendation}</li>"
        f"</ol>"
        f"<h3>Future Impact</h3>"
        f"<p>If 50% of these proposed solutions are followed, the potential reduction in carbon footprints would be approximately "
        f"<strong>{potential_reduction:,.2f}</strong> kg, which is equivalent to the weight of about <strong>{potential_elephants_equivalent:,.2f}</strong> elephants.</p>"
    )


    other_gases_emissions = 0.0005*(predicted_co2[0] + predicted_ch4[0])
    trees_needed = (total_carbon_footprints / 22)
    trees_area_in_hectares = (trees_needed * 0.1) / 10000

    recommended_tree_plantation_areas = [
        "https://maps.app.goo.gl/8j7SboCrF5rpCBc86",
        "https://maps.app.goo.gl/tMRNUMc7TroTTX3o7",
        "https://www.google.com/maps?q=afforestation+area+3+India"
    ]
    
    return jsonify({
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

if __name__ == '__main__':
    app.run(debug=True)
