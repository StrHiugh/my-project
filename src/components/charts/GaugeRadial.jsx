import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GaugeRadial = ({ labels, series, labelColor }) => {
    const chartOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: labelColor,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                            return val + '%';
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                gradientToColors: ['#7827c8'],
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            }
        },
        stroke: {
            dashArray: 4
        },
        labels: [labels]
    };

    const chartSeries = [series];

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
