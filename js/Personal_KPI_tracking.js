document.addEventListener("DOMContentLoaded", function () {
    // Mock KPI data
    const mockKpiData = [
        { title: "Completeness of Order", value: 50 },
        { title: "Accuracy of Inventory", value: 60 },
        { title: "Average Pick Time", value: 30 },
        { title: "Warehouse Utilization", value: 50 },
        { title: "Inventory Turnover", value: 50 },
    ];

    // Function to render KPI cards dynamically
    function renderKpiCards(kpis) {
        const container = document.getElementById("kpi-container");
        container.innerHTML = ""; // Clear any existing content

        kpis.forEach((kpi) => {
            const card = document.createElement("div");
            card.className = "col-md-4";

            card.innerHTML = `
                <div class="kpi-card">
                    <h5>${kpi.title}</h5>
                    <div class="progress-circle">
                        <svg viewBox="0 0 36 36" class="circular-chart green">
                            <path
                                class="circle-bg"
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            ></path>
                            <path
                                class="circle"
                                style="--value: ${kpi.value}"
                                stroke-dasharray="${kpi.value}, 100"
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            ></path>
                        </svg>
                    </div>
                    <div class="percentage">${kpi.value}%</div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Render KPI data using mock data
    renderKpiCards(mockKpiData);
});