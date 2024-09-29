from flask import Flask, send_file
import pandas as pd
import matplotlib.pyplot as plt
import random

app = Flask(__name__)

data = {
    'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'CO2': [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
    'CH4': [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24]
}

df = pd.DataFrame(data)
df['Total GHGs'] = df['CO2'] + df['CH4']*12 + (df['CO2'] + df['CH4']*12)*random.uniform(0.005, 0.009)
df['other_GHGs'] = df['Total GHGs'] - (df['CO2'] + df['CH4']*12)

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

if __name__ == '__main__':
    app.run(debug=True)
