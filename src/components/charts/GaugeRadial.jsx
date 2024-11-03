import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GaugeRadial = ({ labels, series, labelColor, sensorType }) => {
    let min, max, colors, thresholds;

    // Configurar los límites, umbrales y colores según el sensor
    switch(sensorType) {
        case 'ph':
            min = 0;
            max = 14;
            thresholds = [
                { limit: 4, color: '#ffff00' }, // Amarillo para 0-4 (ácido)
                { limit: 8, color: '#00ff00' }, // Verde para 5-7 (neutro)
                { limit: 14, color: '#ff0000' } // Rojo para 8-14 (básico)
            ];
            break;

        case 'temperature':
            min = -10;  // Ejemplo: temperaturas entre -10°C y 50°C
            max = 50;
            thresholds = [
                { limit: 0, color: '#0000ff' }, // Azul para temperaturas bajas
                { limit: 30, color: '#00ff00' }, // Verde para temperatura media
                { limit: 50, color: '#ff0000' } // Rojo para temperaturas altas
            ];
            break;

        case 'oxygen':
            min = 0;   // Ejemplo: oxígeno disuelto entre 0% y 100%
            max = 30;
            thresholds = [
                { limit: 3, color: '#ff0000' }, // Rojo para bajo oxígeno
                { limit: 20, color: '#00ff00' }, // Verde para nivel medio
                { limit: 28, color: '#0000ff' } // Azul para alto oxígeno
            ];
            break;

        default:
            // Valores por defecto
            min = 0;
            max = 100;
            thresholds = [
                { limit: 50, color: '#ffff00' },
                { limit: 75, color: '#00ff00' },
                { limit: 100, color: '#ff0000' }
            ];
    }

    // Función para seleccionar el color según el valor actual
    const getColorForValue = (value) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i].limit) {
                return thresholds[i].color;
            }
        }
        return thresholds[thresholds.length - 1].color; // Color máximo si sobrepasa el umbral
    };

    // Normalizar el valor en porcentaje para ApexCharts
    const normalizedValue = Math.min(Math.max(series, min), max);
    const percentage = ((normalizedValue - min) / (max - min)) * 100;

    const chartOptions = {
        chart: {
            type: 'radialBar',
            offsetY: -10,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '100%',
                    margin: -10,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        fontSize: '20px',
                        color: labelColor,
                        offsetY:85
                    },
                    value: {
                        offsetY: 15,
                        fontSize: '22px',
                        color: labelColor,
                        formatter: function () {
                            return normalizedValue.toFixed(2); // Muestra el valor con dos decimales
                        }
                    }
                }
            }
        },
        fill: {
            type: 'solid', // Usamos 'solid' para colores sólidos sin gradiente
            colors: [getColorForValue(normalizedValue)], // Cambia el color según el valor
        },
        stroke: {
            dashArray: 0,
        },
        labels: [labels]
    };

    const chartSeries = [percentage]; // Muestra el valor normalizado (0-100) para ApexCharts

    return (
        <div id="chart">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="radialBar"
                height={350}
            />
        </div>
    );
};

export default GaugeRadial;
