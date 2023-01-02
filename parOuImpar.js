const typeNum = process.argv[2]
const num = process.argv[3]

export function getRndInterger(min,max){
    return Math.floor(Math.random()  +  (max - min  + 1)) +min;
}

//Número aleatório entre o valor min e o valor max (incluem ambas extremidades).
const numeroAleatorioEntreZeroeDez = getRndInterger(0, 18)
const soma = Number(num)+Number(numeroAleatorioEntreZeroeDez)
if(!typeNum || !num){
    console.log("faltou digitar Par/Impar")
}else{
    if(soma%2 === 0 && typeNum === "par"){
        console.log(`Você escolheu par e o seu computador escolheu impar. O resultado escolheu foi ${soma} + Você ganhou!`)
    }else if(soma%2 === 1 && typeNum === "par"){
    console.log(`Você escolheu par e o seu computador escolheu impar. O resultado escolheu foi ${soma} + Você perdeu!`)
   }else if(soma%2 ===0 && typeNum ==="impar"){
    console.log(`Você escolheu impar e o seu computador escolheu par. O resultado escolheu foi ${soma} + Você perdeu!`)
    }else if(soma%2===1&& typeNum === "impar"){
        console.log(`Você escolheu impar e o seu computador escolheu par. O resultado escolheu foi ${soma} + Você ganhou!`)
    }else{
        console.log("Deu ruim!")
    }
   }
