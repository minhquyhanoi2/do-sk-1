function calculate() {
    // L?y d? li?u t? ngu?i dùng
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);

    // Ki?m tra d? li?u d?u vào
    if (isNaN(weight) || isNaN(heightCm) || isNaN(waist) || isNaN(hip)) {
        alert('Vui long nhap day du thong tin.');
        return;
    }

    // Tính toán các ch? s?
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(2);
    const whr = (waist / hip).toFixed(2);

    // Ðánh giá k?t qu?
    let bmiCategory = '';
    if (bmi < 18.5) {
        bmiCategory = 'Thieu can';
    } else if (bmi < 24.9) {
        bmiCategory = 'Binh thuong';
    } else if (bmi < 29.9) {
        bmiCategory = 'Thua can';
    } else {
        bmiCategory = 'Beo phi';
    }

    let whrRisk = '';
    if (whr > 0.9) {
        whrRisk = 'Nguy co cao ve cac benh tim mach';
    } else {
        whrRisk = 'Nguy co thap ve cac benh tim mach';
    }

    // Hi?n th? k?t qu?
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Ket qua:</h2>
        <p>BMI: ${bmi} (${bmiCategory})</p>
        <p>Ti le eo/mong (WHR): ${whr} (${whrRisk})</p>
    `;

    // Hi?n th? bi?u d?
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = {
        labels: ['Mo', 'Co', 'Xuong', 'Nuoc'],
        datasets: [{
            data: [25, 35, 15, 25], // Giá tr? m?u, c?n thay th? b?ng giá tr? th?c t? n?u có
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
        }]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        }
    };
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}
