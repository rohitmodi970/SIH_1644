from flask import Flask, send_file, jsonify, request
import pandas as pd
import matplotlib.pyplot as plt
import random
import numpy as np

app = Flask(__name__)

data = {
    'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'CO2': [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
    'CH4': [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24]
}

df = pd.DataFrame(data)
df['Total GHGs'] = df['CO2'] + df['CH4']*12 + (df['CO2'] + df['CH4']*12)*random.uniform(0.005, 0.009)
df['other_GHGs'] = df['Total GHGs'] - (df['CO2'] + df['CH4']*15)

def save_line_plot():
    plt.style.use('seaborn-v0_8-dark')
    plt.figure(figsize=(10, 6))
    plt.plot(df['month'], df['CO2'], marker='o', label='CO2 Emissions (kilo tonnes)', color='royalblue', linewidth=2, markersize=8)
    plt.plot(df['month'], df['CH4']*12, marker='o', label='CH4 Emissions (kilo tonnes)', color='orange', linewidth=2, markersize=8)
    plt.plot(df['month'], df['Total GHGs'], marker='o', label='Total GHGs (kilo tonnes)', color='green', linewidth=2, markersize=8)
    plt.title('Monthly Greenhouse Gas Emissions', fontsize=16, fontweight='bold')
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Emissions (in kilotonne)', fontsize=12)
    plt.xticks(rotation=45)
    plt.legend(fontsize=12)
    plt.grid(alpha=0.5)
    plt.tight_layout()
    plt.savefig('line_plot.png')
    plt.close()

def save_pie_chart():
    plt.style.use('dark_background')
    total_CO2 = df['CO2'].sum()
    total_CH4 = df['CH4'].sum()
    gases = ['CO2', 'CH4', 'other GHGs']
    emissions = [total_CO2, total_CH4, df['other_GHGs'].sum()]
    plt.figure(figsize=(8, 8))
    colors = ['#4e79a7', '#f28e2b', '#e15759']
    plt.pie(emissions, labels=gases, autopct='%1.1f%%', startangle=140, colors=colors)
    plt.title('Total Greenhouse Gas Emissions', fontsize=16, fontweight='bold')
    plt.axis('equal')
    plt.tight_layout()
    plt.savefig('pie_chart.png')
    plt.close()

@app.route('/line_plot')
def line_plot():
    save_line_plot()
    return send_file('line_plot.png', mimetype='image/png')

@app.route('/pie_chart')
def pie_chart():
    save_pie_chart()
    return send_file('pie_chart.png', mimetype='image/png')


@app.route('/saved_chart')
def saved_chart():
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    emissions = [500, 450, 480, 520, 600, 550, 580, 490, 470, 510, 530, 560] 
    savings = [120, 130, 110, 140, 150, 160, 170, 140, 130, 150, 140, 160]   
    credits = [s / 1000 for s in savings]                                     

    emissions_kg = np.array(emissions) * 1000
    savings_kg = np.array(savings) * 1000
    credits_kg = np.array(credits) * 1000

    # Create a figure and axes for a pretty plot
    fig, ax1 = plt.subplots(figsize=(12, 6))

    # Plot for emissions (bar chart)
    ax1.bar(months, emissions_kg, color='lightcoral', label='CO2 Emissions (kg)', alpha=0.7)
    ax1.set_xlabel('Months')
    ax1.set_ylabel('CO2 Emissions (kg)')
    ax1.set_title('Carbon Emissions, Savings, and Credits over the Year')
    ax1.legend(loc='upper left')

    ax2 = ax1.twinx()
    ax2.plot(months, savings_kg, color='seagreen', marker='o', label='CO2 Saved (kg)', linewidth=2)
    ax2.plot(months, credits_kg, color='royalblue', marker='s', label='Carbon Credits Earned (kg)', linewidth=2)
    ax2.set_ylabel('CO2 Saved (kg) & Carbon Credits (kg)')
    ax2.legend(loc='upper right')

    # Improve visual appeal
    plt.grid(True)
    plt.tight_layout()

    plt.savefig('saved_chart.png')
    plt.close()
    return send_file('saved_chart.png', mimetype='image/png')


import os


# Path to save images
SAVE_DIR = './images'
os.makedirs(SAVE_DIR, exist_ok=True)  # Create directory if it doesn't exist

# Function to plot and save each chart
def plot_and_save(months, levels, safe_level, title, ylabel, file_name):
    plt.figure(figsize=(10, 6))

    # Color bars based on safe threshold
    bar_colors = np.where(np.array(levels) > safe_level, 'red', 'green')

    # Plot bars
    plt.bar(months, levels, color=bar_colors)

    # Plot safe level line
    plt.axhline(y=safe_level, color='black', linestyle='--', label=f'Safe Level: {safe_level}')

    # Labeling and title
    plt.title(title)
    plt.xlabel('Month')
    plt.ylabel(ylabel)
    plt.legend()

    # Save plot as PNG
    file_path = os.path.join(SAVE_DIR, file_name)
    plt.savefig(file_path)
    plt.close()  # Close the figure after saving

    return file_path


@app.route('/generate_plots', methods=['POST'])
def generate_plots():
    data = request.json
    
    months = data.get('months', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
    co_levels = data.get('co_levels', [40, 60, 35, 80, 55, 45, 30, 70, 50, 65, 38, 42])
    ch4_levels = data.get('ch4_levels', [8, 11, 10, 9, 12, 13, 10, 11, 9, 10, 13, 12])
    rcmd_levels = data.get('rcmd_levels', [1.0, 1.4, 1.2, 1.6, 1.7, 1.3, 1.5, 1.1, 1.3, 1.4, 1.6, 1.2])
    silica_levels = data.get('silica_levels', [0.03, 0.04, 0.05, 0.06, 0.045, 0.055, 0.048, 0.038, 0.042, 0.052, 0.056, 0.049])
 
    co_safe = 50  # ppm
    ch4_safe = 10  # % LEL
    rcmd_safe = 1.5  # mg/m³
    silica_safe = 0.05  # %

    co_file = plot_and_save(months, co_levels, co_safe, "CO Levels Over the Year", "CO Levels (ppm)", "co_levels.png")
    ch4_file = plot_and_save(months, ch4_levels, ch4_safe, "CH₄ Levels Over the Year", "CH₄ Levels (% LEL)", "ch4_levels.png")
    rcmd_file = plot_and_save(months, rcmd_levels, rcmd_safe, "RCMD Levels Over the Year", "RCMD Levels (mg/m³)", "rcmd_levels.png")
    silica_file = plot_and_save(months, silica_levels, silica_safe, "Silica Levels Over the Year", "Silica Levels (%)", "silica_levels.png")

    return jsonify({
        'message': 'Plots generated and saved successfully!',
        'files': {
            'co_levels': co_file,
            'ch4_levels': ch4_file,
            'rcmd_levels': rcmd_file,
            'silica_levels': silica_file
        }
    })



if __name__ == '__main__':
    app.run(debug=True)
