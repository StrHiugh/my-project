import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function AreaGraphic({ lecturaDatas }) {
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
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: [], // Categorías se llenarán dinámicamente
        },
        tooltip: {
            x: {
                format: 'MMM dd'
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                gradientToColors: ['#a771dd'],
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#7827c8']
        }
    });

    useEffect(() => {
        console.log("Lectura Datas:", lecturaDatas);
        if (lecturaDatas.length > 0) {
            const monthMap = {
                "Enero": 0,
                "Febrero": 1,
                "Marzo": 2,
                "Abril": 3,
                "Mayo": 4,
                "Junio": 5,
                "Julio": 6,
                "Agosto": 7,
                "Septiembre": 8,
                "Octubre": 9,
                "Noviembre": 10,
                "Diciembre": 11,
            };

            const transformedData = lecturaDatas.map((item, index) => {
                const value = parseFloat(item.valor);
                if (isNaN(value)) {
                    console.warn("Valor no válido encontrado:", item.valor);
                    return null;
                }

                // Usa el mes y un índice para asegurar que cada entrada es única
                return { x: `${item.created_at} ${index + 1}`, y: value }; // Usar el índice para diferenciarlos
            }).filter(Boolean);

            console.log("Datos transformados:", transformedData);
            setSeries([{ data: transformedData }]);
        }
    }, [lecturaDatas]);


    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
}

// Define las propTypes para el componente
AreaGraphic.propTypes = {
    lecturaDatas: PropTypes.array.isRequired,
};
