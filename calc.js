var Currents = 0;
var FlagNewNum = false;
var PendingOp = "";
let empty = 'Error          ';
const out = document.querySelector('.calc-screen p');
const outslide = document.querySelector('marquee');
const aside = document.querySelector('.wrapper__ticker');
const ValuteOne = document.querySelector('.wrapper__input > select:first-child');
const ValuteTwo = document.querySelector('.wrapper__input > select:last-child');
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

usdtotop()

//гуд ворк
function usdtotop()
{  
    $.get('https://www.cbr-xml-daily.ru/daily_json.js',
    function(data) {
    dataRead = JSON.parse(data)
	outslide.innerHTML = `Сегодня ${dataRead.Timestamp.substr(0,10)} | `
	for (var key in dataRead.Valute) {
		outslide.innerHTML += `<strong class="${key}">${key}: <span>${dataRead.Valute[key].Value}₽</span>  | </strong>`
		aside.innerHTML += `<div class="ticker"><input type="checkbox" id="${key}" name="${key}" value="yes" checked><label>${key}</label></div>`
		ValuteOne.innerHTML += `<option value="${dataRead.Valute[key].Value}">${key}</option>`
		ValuteTwo.innerHTML += `<option value="${dataRead.Valute[key].Value}">${key}</option>`
	}  
	})
}

$(document).ready(function($){
    $('.wrapper__ticker').on("change",function(event){
		if ( $(event.target).is(':checked') )  {$(`.${event.target.id}`).show()}
		else $(`.${event.target.id}`).hide()
	    });
});

    $("#one").on("input", function (e) {
		var value1 = $('#valute1').val();
		var value2 = $('#valute2').val();
		var value3 = $('#one').val()
		var result2 = value1 * value3 / value2
		$('p').html(result2.toFixed(2));
		check ()
	    });

// проверка количества символов
function check () {
	if (out.textContent === '0.00' || out.textContent == '0' || out.textContent == '') return out.textContent = '0'
    if (out.textContent.length > 7)
    {out.style.fontSize = '32px' } 
    else out.style.fontSize = '64px'
    
    if (out.textContent.length > 14){
        out.textContent = empty;
        return;
    }
    }

// обработчик нажатия 
// цифровой кнопки
function NumPressed (Num) 
{
		if (FlagNewNum) 
		{
			out.textContent = Num;
			FlagNewNum = false;
		}	
		else 
		{
			if (out.textContent == "0")
            out.textContent = Num;
			else
            out.textContent += Num;
		}
		check ()
}
// обработчик нажатия
// кнопки действия
function Operation (Op) 
{

		var Readout = out.textContent;
		if (out.textContent == empty) return '0'
		if (FlagNewNum && PendingOp != "=")
		{
			out.textContent = Currents;
		}
		else
		{
			FlagNewNum = true;
			if ( '+' == PendingOp )
				Currents += parseFloat(Readout);
			else if ( '-' == PendingOp )
				Currents -= parseFloat(Readout);
			else if ( '/' == PendingOp )
				Currents /= parseFloat(Readout);
			else if ( '*' == PendingOp )
				Currents *= parseFloat(Readout);
			else
				Currents = parseFloat(Readout);
                out.textContent = Currents;
			PendingOp = Op;
		}
		check ()
}
	
// добавление десятичной точки с числу
function Decimal () 
{
		var curReadOut = out.textContent;
		if (FlagNewNum) 
		{
			curReadOut = "0.";
			FlagNewNum = false;
		}
		else
		{
			if (curReadOut.indexOf(".") == -1)
				curReadOut += ".";
		}
		out.textContent = curReadOut;
}
	
// Очистка текущего результата
function ClearEntry () 
{
    out.textContent = "0";
		FlagNewNum = true;
}

// Возведение в степень
function stepen () 
{
    out.textContent = Math.pow(out.textContent, 2);
	check ()
}

// курс доллара
function usd()
{
    $.get('https://www.cbr-xml-daily.ru/daily_json.js',
    function(data) {
    data = JSON.parse(data)
	console.log(data)
	let usd = data.Valute.USD.Value
	if (out.textContent === '0.00' || out.textContent == '0' || out.textContent == '') return out.textContent = '0'
	else out.textContent = (out.textContent / usd).toFixed(4)
})
}

let btcglobal = null;

// курс битка
function bitcoin()
{
    $.get('https://api.coindesk.com/v1/bpi/currentprice.json',
    function(data) {
	console.log(data)
    data = JSON.parse(data)
	let btc = data.bpi.USD.rate_float
	btcglobal = btc;
	if (out.textContent === '0.00' || out.textContent == '0' || out.textContent == '') return out.textContent = '0'
	else out.textContent = (out.textContent / ( btc*60 )).toFixed(4) //как добраться до переменной usd?
})
	check ()
}
// Полная очистка всех результатов
function Clear () 
{
		Currents = 0;
		PendingOp = "";
		ClearEntry();
}

// меняем знак текущего результата
// замыкание, простой пример
// function powGreater (b){
// 	let base = b;
// 	let sum = 0;
// 	let pow = function(a) {
// 		sum += a * base
// 		return sum
// 	}
// return pow
// }
// const pow5 = powGreater(5);
// const pow10 = powGreater(10)
function Neg () 
{
	console.log(pow5(out.textContent))
    out.textContent = 
		parseFloat(out.textContent) * -1;
}
	
// вычисляем значение процентов
function Percent () 
{
    out.textContent = 
			(parseFloat(out.textContent) / 100) * 
			parseFloat(Currents);
	// const pow = powGreater(10)
	// console.log(pow10(out.textContent))
}



// let a = '';
// let b = '';
// let sign = '';
// let finish = false;

// // const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
// const action = ['-', '+', 'x', '/'];


// const out = document.querySelector('.calc-screen p');



// function clearAll () {
//     a = '';
//     b = '';
//     sign = '';
//     finish = false;
//     out.textContent = 0;
// }

// document.querySelector('.ac').onclick = clearAll;

// document.querySelector('.buttons').onclick = (event) => {
//     if(!event.target.classList.contains('btn')) return;
//     if(event.target.classList.contains('ac')) return;

// // out.textContent = ''; не знаю зачем это

// const key = event.target.textContent;

// //провека на нажатие 0-9 или .
// if(key < Number.MAX_SAFE_INTEGER) {
//     if (b === '' && sign === '') {
//     a+=key;
//     out.textContent = a;
// }
// else if (a!== '' && b!== '' && finish){
//     b = key;
//     finish = false;
//     out.textContent = b;
// }
// else {
//     b+= key;
//     out.textContent = b
// }
// }

// if(action.includes(key)) {
//     sign = key;
//     out.textContent = sign;
//     return;
// }


// if (key === '+/-' && b == '' && a !== '' ) {

//     if (a == 0) {
//         a = '-';
//         out.textContent = a;
//     }

//     else if (a == '-') {
//         a = '';
//         out.textContent = a;
//     }

//     else if (Number(a) > 0) {
//         a = -Math.abs(a);
//         out.textContent = a;   
//     }
//     else {
//         a = Math.abs(a);
//         out.textContent = a;   
//     }
// } 
// else  if (key === '+/-' && b !== '' && a !== '' && sign !=='' ) {
//     if (b == 0) {
//         b = '-';
//         out.textContent = b;
//     }

//     else if (b == '-') {
//         b = '';
//         out.textContent = b;
//     }

//     else if (Number(b) > 0) {
//         b = -Math.abs(b);
//         out.textContent = b;   
//     }
//     else {
//         b = Math.abs(b);
//         out.textContent = b;   
//     }

// }

// if (key === '=') {
//     if (b === '') b = a;
//     switch (sign) {
//         case '+': a = (+a) + (+b); break;
//         case '-': a = (+a) - (+b); break;
//         case 'x': a = (+a) * (+b); break;
//         case '/':
//             if (b === '0') {
//                 clearAll()
//                 out.textContent = 'Error';
//                 return;
//             }
//             a = (+a) / (+b); break;
//     }
//     finish = true;
//     out.textContent = a;
//     b = '';
// }

// }
