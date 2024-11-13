import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

// Función para convertir la fecha y hora de `created_at` y `createdTime_at` a un objeto Date
const parseDateTime = (dateString, timeString) => {
    const monthMapping = {
        'Enero': 0,
        'Febrero': 1,
        'Marzo': 2,
        'Abril': 3,
        'Mayo': 4,
        'Junio': 5,
        'Julio': 6,
        'Agosto': 7,
        'Septiembre': 8,
        'Octubre': 9,
        'Noviembre': 10,
        'Diciembre': 11,
    };

    if (monthMapping.hasOwnProperty(dateString) && timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return new Date(2024, monthMapping[dateString], 1, hours, minutes, seconds); // Año 2024 como ejemplo
    }

    console.warn("Formato de fecha o tiempo no reconocido:", dateString, timeString);
    return null;
};

const ApexChart = ({ lecturaDatas }) => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (lecturaDatas) {
            const transformedSeries = Object.keys(lecturaDatas).map((sensorId) => {
                const sensorName = lecturaDatas[sensorId][0]?.fkESeccionEquipoSensor?.fksensor_nombre || `Sensor ${sensorId}`;
                const sensorData = lecturaDatas[sensorId].map((item) => {
                    const date = parseDateTime(item.created_at, item.createdTime_at);
                    const value = parseFloat(item.valor);

                    // Asegurarse de que la fecha y el valor sean válidos
                    if (date && !isNaN(value)) {
                        return [date.getTime(), value];
                    }
                    return null;
                }).filter(Boolean); // Filtrar elementos nulos

                return {
                    name: sensorName || `Sensor ${sensorId}`,
                    data: sensorData
                };
            });

            setSeries(transformedSeries);
        }
    }, [lecturaDatas]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: series.length > 0 ? series[0].data.map(point => new Date(point[0]).toISOString()) : [],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
