// Global variables
let PowerT, VoltageT, LengthT, I;

function calculateCurrent() {
    console.log('Button clicked'); // Check if function is called
    PowerT = parseFloat(document.getElementById('power').value);
    VoltageT = parseFloat(document.getElementById('voltage').value);
    LengthT = parseFloat(document.getElementById('length').value);
    const powerfactor = parseFloat(document.getElementById('powerFactor').value);

    // Calculate the power factor in degrees
    const powerfactordeg = Math.acos(powerfactor) * (180 / Math.PI);

    // Calculate the current
    I = (PowerT * 10**3) / (Math.sqrt(3) * VoltageT * powerfactor);

    // Display the current
    document.getElementById('current').value = I.toFixed(2);
}

function calculateParameters() {
    const conductorName = document.getElementById('conductorName').value;
    const resistance = parseFloat(document.getElementById('resistance').value);
    const aluminumStrands = parseInt(document.getElementById('aluminumStrands').value);
    const steelStrands = parseInt(document.getElementById('steelStrands').value);
    const diameter = parseFloat(document.getElementById('diameter').value);

    // Use the global variables set by the calculateCurrent function
    const rcalc = resistance * 1.18;
    const ptl = 3 * (I ** 2) * rcalc * LengthT;
    const ptlmw = ptl / 1000000;
    let eff = (1 - (ptlmw / PowerT)) * 100;

    let resultText = `Conductor = ${conductorName}<br>Resistance at 20 (ohm/km) = ${resistance}<br>Number of aluminium strands = ${aluminumStrands}<br>Number of steel strands = ${steelStrands}<br>Overall diameter (mm) = ${diameter}<br>Efficiency is = ${eff.toFixed(2)}%`;

    if (eff >= 94) {
        resultText += `<br><br>CONDUCTOR IS SELECTED: ${conductorName}`;
        document.getElementById('gmrInput').style.display = 'block';
    } else {
        resultText += `<br><br>Conductor IS REJECTED: ${conductorName}`;
        resultText += '<br><br>The fluctuation shall not be allowed for more than ten percent in standard volt mentioned in ELECTRICITY REGULATION 2050 IN 42 NUMBER.';
        document.getElementById('gmrInput').style.display = 'none';
        document.getElementById('inductanceCapacitance').style.display = 'none';
    }

    document.getElementById('result').innerHTML = resultText;
}

function calculateInductanceCapacitance() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const gmr = parseFloat(document.getElementById('gmr').value);

    const gmrl = gmr * (diameter / 2);
    const gmrc = diameter / 2;
    const L = (2 * 10 ** -7) * Math.log((6.91 * 1000) / gmrl);
    const C = ((2 * Math.PI * 8.85 * 10 ** -12) / Math.log((6.91 * 1000) / gmrc)) * 10 ** 9;

    const inductanceCapacitanceText = `Inductance (H/m) = ${L}<br>Capacitance (uF/km) = ${C}`;
    document.getElementById('inductanceCapacitance').innerHTML = inductanceCapacitanceText;
    document.getElementById('inductanceCapacitance').style.display = 'block';
}
