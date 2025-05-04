let chartInstance;

function calculateFootprint() {
  const animal = parseInt(document.getElementById("animalProducts").value);
  const local = parseInt(document.getElementById("localFood").value);

  const household = parseInt(document.getElementById("householdSize").value) || 1;
  const electricity = parseInt(document.getElementById("electricity").value);
  const efficiency = parseInt(document.getElementById("efficiency").value);
  const renewable = parseFloat(document.getElementById("renewable").value) || 0;
  const trash = parseInt(document.getElementById("trash").value);

  const carTravel = parseFloat(document.getElementById("carTravel").value) || 0;
  const bikeTravel = parseFloat(document.getElementById("bikeTravel").value) || 0;
  const fuelEff = parseFloat(document.getElementById("fuelEfficiency").value) || 8;
  const carpool = parseInt(document.getElementById("carpool").value);
  const publicTransport = parseFloat(document.getElementById("publicTransport").value) || 0;
  const flights = parseFloat(document.getElementById("flightHours").value) || 0;

  let food = (animal + 1) * (5 - local);
  let housing = (5 - efficiency) + (1 - electricity) + ((100 - renewable) / 100) * 2 + (3 - trash);
  let transport = ((carTravel * 52) / 100) * (fuelEff / 100) * (1 - carpool * 0.25) + (publicTransport * 52 * 0.01) + (flights * 0.25);

  const totalCO2 = (food + housing + transport).toFixed(1);
  const earths = (totalCO2 / 2.5).toFixed(1);
  const overshootDay = new Date(2025, 0, 1);
  overshootDay.setDate(overshootDay.getDate() + (365 * (2.5 / totalCO2)));

  document.getElementById("result").innerHTML = `
    🌍 <strong>Your estimated annual carbon footprint:</strong> ${totalCO2} tonnes CO₂e<br>
    📅 <strong>Earth Overshoot Day:</strong> ${overshootDay.toDateString()}<br>
    🌎 <strong>If everyone lived like you, we would need:</strong> ${earths} Earths
  `;

  const ctx = document.getElementById("footprintChart").getContext("2d");

  const data = {
    labels: [
      `Food (${food.toFixed(1)} t)`,
      `Housing (${housing.toFixed(1)} t)`,
      `Transportation (${transport.toFixed(1)} t)`
    ],
    datasets: [{
      data: [food, housing, transport],
      backgroundColor: ["#66bb6a", "#ffa726", "#42a5f5"],
    }]
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}