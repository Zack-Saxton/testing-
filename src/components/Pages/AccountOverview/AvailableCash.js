import React from "react";
import Grid from "@material-ui/core/Grid";
import Chartist from "react-chartist";
import fillDonut from "chartist-plugin-fill-donut";
import tooltip from "chartist-plugin-tooltips-updated";

//Data for Chart
const LoanAmount = 10000;
const RepaidAmount = 6000;
const intro = "Loan Amount $" + LoanAmount + " : Repaid Amount $" + RepaidAmount;

const donutChart = {
    labels: [1, 2],
    series: [
        { className: "stroke-blue", meta: intro, value: 60 },
        { className: "stroke", meta: "", value: 40 },
    ],
};

export default function AvailableCash() {
    const donutOptions = {
        donut: true,
        donutWidth: 8,
        showLabel: false,
        // appendToBody: false,
        showValue: true,
        plugins: [
            fillDonut({
                items: [
                    {
                        content: '<h5 class="centerheading">$ 6,000</h5>',
                    },
                ],
            }),
            tooltip({ appendToBody: true }),
        ],
    };

    return (
        <Grid
            item
            xs={12}
            style={{ paddingTop: "20px", textAlign: "center" }}
        >
            <Chartist
                data={donutChart}
                options={donutOptions}
                type={"Pie"}
                className="donutchart"
            />

            <p style={{ textAlign: "center" }}>As of 02/22/2021</p>
        </Grid>
    );
}
