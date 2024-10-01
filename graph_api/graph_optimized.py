from flask import Flask
import pandas as pd
import matplotlib.pyplot as plt
import random
import numpy as np
import os

app = Flask(__name__)

# Data for GHG emissions
data = {
    'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'CO2': [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
    'CH4': [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24]
}

df = pd.DataFrame(data)
df['Total GHGs'] = df['CO2'] + df['CH4']*12 + (df['CO2'] + df['CH4']*12)*random.uniform(0.005, 0.009)
df['other_GHGs'] = df['Total GHGs'] - (df['CO2'] + df['CH4']*12)

# Path to save images
SAVE_DIR = './graph_api/images'
os.makedirs(SAVE_DIR, exist_ok=True)  # Create directory if it doesn't exist

# Function to save line plot
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
    plt.savefig(os.path.join(SAVE_DIR, 'line_plot.png'))
    plt.close()

# Function to save pie chart
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
    plt.savefig(os.path.join(SAVE_DIR, 'pie_chart.png'))
    plt.close()

# Function to plot and save the saved chart
def save_saved_chart():
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    emissions = [500, 450, 480, 520, 600, 550, 580, 490, 470, 510, 530, 560] 
    savings = [120, 130, 110, 140, 150, 160, 170, 140, 130, 150, 140, 160]   

    emissions_kg = np.array(emissions) * 1000
    savings_kg = np.array(savings) * 1000

    # Plot 1: Emissions and Savings on the same graph
    fig, ax1 = plt.subplots(figsize=(12, 6))
    ax1.bar(months, emissions_kg, color='lightcoral', label='CO2 Emissions (kg)', alpha=0.7)
    ax1.plot(months, savings_kg, color='seagreen', marker='o', label='CO2 Saved (kg)', linewidth=2)
    ax1.set_xlabel('Months')
    ax1.set_ylabel('CO2 Emissions (kg) & CO2 Saved (kg)')
    ax1.set_title('Carbon Emissions and Savings over the Year')
    ax1.legend(loc='upper left')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(os.path.join(SAVE_DIR, 'saved_chart_combined.png'))
    plt.close()

    # Plot 2: Emissions and Savings on separate graphs
    fig, ax = plt.subplots(2, 1, figsize=(12, 12))
    
    ax[0].bar(months, emissions_kg, color='lightcoral', label='CO2 Emissions (kg)', alpha=0.7)
    ax[0].set_xlabel('Months')
    ax[0].set_ylabel('CO2 Emissions (kg)')
    ax[0].set_title('Carbon Emissions over the Year')
    ax[0].legend(loc='upper left')
    ax[0].grid(True)
    
    ax[1].plot(months, savings_kg, color='seagreen', marker='o', label='CO2 Saved (kg)', linewidth=2)
    ax[1].set_xlabel('Months')
    ax[1].set_ylabel('CO2 Saved (kg)')
    ax[1].set_title('Carbon Savings over the Year')
    ax[1].legend(loc='upper left')
    ax[1].grid(True)
    
    plt.tight_layout()
    plt.savefig(os.path.join(SAVE_DIR, 'saved_chart_separate.png'))
    plt.close()

# Function to plot and save carbon credits earned over the year as a bar chart
def save_carbon_credits_chart():
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    credits = [50, 45, 48, 52, 60, 55, 58, 49, 47, 51, 53, 56]  # Example data for carbon credits

    plt.figure(figsize=(12, 6))
    plt.bar(months, credits, color='purple', alpha=0.7, label='Carbon Credits Earned')
    plt.title('Carbon Credits Earned Over the Year', fontsize=16, fontweight='bold')
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Carbon Credits', fontsize=12)
    plt.xticks(rotation=45)
    plt.legend(fontsize=12)
    plt.grid(alpha=0.5)
    plt.tight_layout()
    plt.savefig(os.path.join(SAVE_DIR, 'carbon_credits_chart.png'))
    plt.close()

# Function to plot and save each safety level chart
def plot_and_save(months, levels, safe_level, title, ylabel, file_name):
    plt.figure(figsize=(10, 6))
    bar_colors = np.where(np.array(levels) > safe_level, 'red', 'green')
    plt.bar(months, levels, color=bar_colors)
    plt.axhline(y=safe_level, color='black', linestyle='--', label=f'Safe Level: {safe_level}')
    plt.title(title)
    plt.xlabel('Month')
    plt.ylabel(ylabel)
    plt.legend()
    file_path = os.path.join(SAVE_DIR, file_name)
    plt.savefig(file_path)
    plt.close()  # Close the figure after saving
    return file_path

# Main function to generate all plots
def main():
    # Generate and save the line and pie charts
    save_line_plot()
    save_pie_chart()
    save_saved_chart()
    save_carbon_credits_chart()
    
    # Generate and save safety level charts
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    co_levels = [40, 60, 35, 80, 55, 45, 30, 70, 50, 65, 38, 42]
    ch4_levels = [8, 11, 10, 9, 12, 13, 10, 11, 9, 10, 13, 12]
    rcmd_levels = [1.0, 1.4, 1.2, 1.6, 1.7, 1.3, 1.5, 1.1, 1.3, 1.4, 1.6, 1.2]
    silica_levels = [0.03, 0.04, 0.05, 0.06, 0.045, 0.055, 0.048, 0.038, 0.042, 0.052, 0.056, 0.049]
    
    co_safe = 50  # ppm
    ch4_safe = 10  # % LEL
    rcmd_safe = 1.5  # mg/m³
    silica_safe = 0.05  # %

    plot_and_save(months, co_levels, co_safe, "CO Levels Over the Year", "CO Levels (ppm)", "co_levels.png")
    plot_and_save(months, ch4_levels, ch4_safe, "CH₄ Levels Over the Year", "CH₄ Levels (% LEL)", "ch4_levels.png")
    plot_and_save(months, rcmd_levels, rcmd_safe, "RCMD Levels Over the Year", "RCMD Levels (mg/m³)", "rcmd_levels.png")
    plot_and_save(months, silica_levels, silica_safe, "Silica Levels Over the Year", "Silica Levels (%)", "silica_levels.png")

# Entry point
if __name__ == '__main__':
    main()
