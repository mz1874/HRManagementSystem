document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Done', 'Ongoing', 'Delayed'],
            datasets: [{
                data: [65, 25, 10], // 默认数据
                backgroundColor: ['#6CC763', '#FFC107', '#F2A9A3'],
                borderColor: ['#ABE3A5', '#FDD853', '#F3C5C1'],
                borderWidth: 3,
            }]
        }
    });

    const departmentSelect = document.getElementById('department-select');
    const monthSelect = document.getElementById('month-select');

    // 模拟不同部门和月份的数据
    function getData(department, month) {
        const data = {
            HR: { January: [60, 30, 10], February: [50, 40, 10], March: [70, 20, 10] },
            Sales: { January: [80, 15, 5], February: [75, 20, 5], March: [90, 5, 5] },
            IT: { January: [50, 40, 10], February: [60, 30, 10], March: [55, 35, 10] },
        };
        return data[department][month];
    }

    // 更新图表数据
    function updateChart() {
        const department = departmentSelect.value;
        const month = monthSelect.value;
        const newData = getData(department, month);

        chart.data.datasets[0].data = newData;
        chart.update();
    }

    departmentSelect.addEventListener('change', updateChart);
    monthSelect.addEventListener('change', updateChart);
});
