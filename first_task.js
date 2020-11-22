function amountOfNumbers(arr) {    // this function is fast, but has 999 iterations
	let result = 0, group = 0;
	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			for (let z = 0; z < 10; z++) {
				if (arr[x+y+z] === undefined)
				{
					arr[x+y+z] = 0;
				}
				arr[x+y+z] +=  1;
				group = x+y+z;
			}
		}
	}
	for (let i = 0; i <= group; i++) {
		result += Math.pow(arr[i], 2);
	}
	return result;
}




/* //Uncomment for the fastest function (28 iterations) it also works with comb = 2 || 1 || 3 and different base
function amountOfNumbers() {
	let base = 10, comb = 3, res=0, coef=0, plus = 0, f = 10;

	for (let x = 0; x < base * 3 - 2 ; x++) {
		if (x < base) {
			coef = (x + 1) * (x +2 ) / 2;
		} else if (28 - x <= base){
			coef = (28-x) * (28 - x + 1) / 2;
		} else {
			f -= 2;
			coef += f; 
		}
		res += coef ** 2;
	}
	return res;
}

console.log(amountOfNumbers());
*/







let arr = {};
let start = new Date().getTime();
console.log("Строка для сравнения");
let end = new Date().getTime(); 
console.log(`Результат времени затраченный на вывод тестовой строки: ${end - start}ms`);
start= new Date().getTime();
console.log(`Количество всех чисел, удовлетворяющих условию : ${amountOfNumbers(arr)}`); // 000000 : 0+0+0 = 0+0+0 
end = new Date().getTime();  
console.log(`Результат времени затраченный на подсчет и вывод задания: ${end - start}ms`);