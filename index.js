console.log(process.argv)

const nome = process.argv[2]

if(!nome){
    console.log("Digite um nome")
}else{
   console.log(nome)
}