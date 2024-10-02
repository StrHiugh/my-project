import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const parseDate = (dateString) => {
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
        'Diciembre': 11
    };

    // Si solo se proporciona el mes, asignamos un día y año por defecto
    if (dateString in monthMapping) {
        const monthIndex = monthMapping[dateString];
        return new Date(2024, monthIndex, 1); // Usar 1 como día y un año fijo (por ejemplo, 2024)
    }

    console.warn("Formato de fecha no reconocido:", dateString);
    return null; // Retornar null si el formato no es válido
};

export default function AreaGraphic({ lecturaDatas, sensorName  }) {
    const [series, setSeries] = useState([{ data: [] }]);
    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#7827c8',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        color: "#fff",
                        background: '#7827c8'
                    }
                }
            }],
            xaxis: [] // Inicialmente vacío, se llenará dinámicamente
        },

        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
            colors: ['#7827c8']
        },
        xaxis: {
            type: 'datetime', // Cambiar a 'datetime' para manejar mejor las fechas
            tickAmount: 6, // Las categorías se llenarán dinámicamente
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
            marker: {
                show: true, // Muestra el punto en el tooltip
                fillColors: ['#7827c8'] // Cambia el color del punto a morado
            }
        },
        fill: {
            type: 'solid',
            colors: ['#7827c8'],
            opacity: 0.6
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#7827c8']
        }
    });

    useEffect(() => {
        if (lecturaDatas.length > 0) {
            const transformedData = lecturaDatas.map((item, index) => {
                const value = parseFloat(item.valor);

                // Manejo de valores no válidos
                if (isNaN(value)) {
                    console.warn("Valor no válido encontrado:", item.valor);
                    return null;
                }

                const createdAt = parseDate(item.created_at); // Convertir a objeto Date

                // Manejo de fechas no válidas
                if (!createdAt) {
                    console.warn("Fecha no válida encontrada:", item.created_at);
                    return null;
                }

                const timestamp = createdAt.getTime() + index * 1000; // Asegurar unicidad en el eje x

                return { x: timestamp, y: value }; // Usar timestamp combinado con índice para el eje x
            }).filter(Boolean); // Filtrar elementos nulos

            setSeries([{ data: transformedData }]);
        }
    }, [lecturaDatas]);

    return (
        <div>
            <h2><strong>{sensorName}</strong></h2>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350}/>
            </div>
        </div>
    );
}

// Define las propTypes para el componente
AreaGraphic.propTypes = {
    lecturaDatas: PropTypes.array.isRequired,
    sensorName: PropTypes.string.isRequired, // Agregar la validación para el nuevo prop

};
