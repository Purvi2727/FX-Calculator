//init variables
let result = 0;

//initial DOM setup
document.getElementById("toAmount").value = "";
let currencies = Object.keys(data.currency);
currencies.forEach(function(value){
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    document.getElementById("fromConverter").appendChild(option);
});
currencies.forEach(function(value){
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    document.getElementById("toConverter").appendChild(option);
});

function updateSymbol(selectBox){
    if(selectBox === "from"){
        document.getElementById("fromSymbol").innerHTML = data.currency[document.getElementById("fromConverter").value].symbol;
    }else{
        document.getElementById("toSymbol").innerHTML = data.currency[document.getElementById("toConverter").value].symbol;
    }
}

// Currency conversion
function fnConvert(){
    result = 0;
    document.getElementById("toAmount").value = "";
    let base = document.getElementById("fromConverter").value;
    let term = document.getElementById("toConverter").value;
    let amount = document.getElementById("fromAmount").value;

    let output = data.currency[base].terms[term];
    let keyName = base+""+term;
    if(output === "D"){
        result = amount * data.rates[keyName];
        fnConvertToDecimal(result);
    } else if(output === 1){
        result = amount * output;
        fnConvertToDecimal(result);
        return result;
    } else if(output === "Inv"){
        keyName = term+""+base;
        result = amount * data.rates[keyName];
        fnConvertToDecimal(result);
    }else{
        fnLookUp(amount, base, term, output);
    }
}

// Recursive function to reach to conversion rates
// conversion rates - D, 1 or Inv

function fnLookUp(amount, base, term, output){
    let keyName = base+""+output;
   if(output !== "D" && output !== "Inv" && output !== 1){    
        if(data.rates[keyName] === undefined){
            keyName = output+""+base;
            result = amount / data.rates[keyName];
        }else{
            result = amount * data.rates[keyName];    
        }
        fnConvertToDecimal(result);
        let newOutput = data.currency[output].terms[term];
        fnLookUp(result, output, term, newOutput);
   }else{
    if(output === "D"){
        keyName = base+""+term;
        result = amount * data.rates[keyName];
        fnConvertToDecimal(result);
    } else if(output === 1){
        result = amount * output;
        fnConvertToDecimal(result);
        return result;
    } else if(output === "Inv"){
        keyName = term+""+base;        
        result = amount / data.rates[keyName];
        fnConvertToDecimal(result);
    }
   }
}

function fnConvertToDecimal(_value){
    document.getElementById("toAmount").value = _value.toFixed(2);
}