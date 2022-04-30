/**
 * 
 * Considers the error
 * 
 */
function toFloat32Number(number) {
	const data = new DataView(new ArrayBuffer(4));
	data.setFloat32(0, number);
	return data.getFloat32(0);
}

/**
 * 
 * Received values named Cannon.ReloadTime (Auto-Smasher)
 * 
 */
const reloadTimes = [
	15,
	13.710000038146973,
	12.530940055847168,
	11.453279495239258,
	10.468297004699707,
	9.568023681640625,
	8.745173454284668,
	7.993088722229004,
	7.305683135986328,
	6.677394390106201,
	6.103138446807861
];

/**
 * 
 * Guesses a constant based on Cannon.ReloadTime values received in WebSocket.
 * 
 */
const constat_min = 1.094091898;
const constat_max = 1.094091906;
const constant = (constat_min + (constat_max - constat_min) / 2);
const tickRate = 40;
const reloadMultiplier = 1.0;
reloadTimes.forEach((reloadTime, i) => {

	const _reloadTime = (((1000 / tickRate) * 0.6 * reloadMultiplier) / (constant ** i));
	const _encodedReloadTime = toFloat32Number(_reloadTime);

	const difference = (_encodedReloadTime - reloadTime);
	console.log("Reload:", i, "\t", "Difference:", difference);

});
console.log();

/**
 * 
 * Checks whether the guessed constant can be expressed as a fraction
 * 
 */
let nearestDifference = 1.0;
let x, y;
for (let i = 2; i < 1000; i++) {
	for (let j = 2; j < 1000; j++) {

		const value = (constant * (i / j));
		const integerPart = Math.round(value);

		const difference = Math.abs(value - integerPart);
		if (difference < nearestDifference) {
			nearestDifference = difference;
			x = j;
			y = i;
		}

	}
}
console.log(`x / y : (x, y) = (${x}, ${y})`);
console.log("Difference:", nearestDifference);
