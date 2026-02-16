function setTheme(theme) {
    document.body.classList.remove('theme-white', 'theme-valentine');
    if (theme !== 'default') document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('amo-theme', theme);
}

function toggleSection(id) {
    document.getElementById(id).classList.toggle('closed');
}

// แยกตัวประกอบแบบมีเลขยกกำลัง
function checkPrimeFactors() {
    let num = parseInt(document.getElementById('primeInput').value);
    const resDiv = document.getElementById('primeResult');
    if (isNaN(num) || num < 2) { resDiv.innerText = "กรุณาใส่ตัวเลขที่มากกว่า 1"; return; }
    
    let counts = {}, d = 2, temp = num;
    while (temp > 1) {
        while (temp % d === 0) { counts[d] = (counts[d] || 0) + 1; temp /= d; }
        d++;
        if (d * d > temp && temp > 1) { counts[temp] = (counts[temp] || 0) + 1; break; }
    }
    
    resDiv.innerHTML = Object.keys(counts).sort((a,b)=>a-b).map(b => 
        counts[b] > 1 ? `${b}<sup>${counts[b]}</sup>` : b
    ).join(' × ');
}

// แปลงฐานเลข
function runBaseConvert() {
    const val = document.getElementById('baseNumInput').value.trim();
    const from = parseInt(document.getElementById('baseFrom').value);
    const to = parseInt(document.getElementById('baseTo').value);
    const resDiv = document.getElementById('baseResult');
    try {
        let dec = parseInt(val, from);
        if (isNaN(dec)) { resDiv.innerText = "ตัวเลขไม่ถูกต้องสำหรับฐานนี้"; return; }
        resDiv.innerText = dec.toString(to).toUpperCase();
    } catch (e) { resDiv.innerText = "เกิดข้อผิดพลาด"; }
}

// เครื่องคิดเลข
const display = document.getElementById('display');
function press(val) {
    if (display.value === '0') display.value = val;
    else display.value += val;
}
function clearAll() { display.value = '0'; }
function calculateResult() {
    try {
        const toRad = "(Math.PI/180)";
        let expr = display.value.replace(/sin\(/g, `Math.sin(${toRad}*`)
                                .replace(/cos\(/g, `Math.cos(${toRad}*`)
                                .replace(/tan\(/g, `Math.tan(${toRad}*`)
                                .replace(/sqrt\(/g, 'Math.sqrt(');
        let res = eval(expr);
        display.value = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    } catch (e) { display.value = 'Error'; setTimeout(clearAll, 1200); }
}

window.onload = () => {
    const saved = localStorage.getItem('amo-theme');
    if (saved) setTheme(saved);
};