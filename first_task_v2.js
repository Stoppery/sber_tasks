// function also works with comb = 2 || 1 || 3
function amountOfNumbers() {
	let base = 10, comb = 1, res=0, coef=0, f = 10;

	for (let x = 0; x < comb * 9 + 1 ; x++) {
		if (x < base) {
			coef = 1;
			for (let m = 1; m < comb; m++) {
				coef *= (x + m);
			}
			coef /= (comb != 1) ? (comb-1) : 1; 
		} else if ((comb * 9 + 1) - x <= base){
			coef = 1;
			for (let m = 0; m < comb-1; m++) {
				coef *= ((comb * 9 + 1) - x + m);
			}
			coef /= (comb != 1) ? (comb-1) : 1; 
		} else  {
			if (comb == 3){
				f -= 2;
				coef += f;
			}
		}
		res += coef ** 2;
	}
	return res;
}

console.log(amountOfNumbers());