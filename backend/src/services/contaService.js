function saque(conta, valor){

    if(conta.tipo == "corrente"){

        // PEGA O SALDO DA CONTA E SUBTRAI COM O VALOR DO SAQUE DESEJADO -1 REAL DA TARIFA DE SAQUE
        const novoSaldo = conta.saldo - (valor + 1)

        if(novoSaldo < -500){
            return `Saldo insuficiente: limite de cheque especial excedido.`
        }else{
            conta.saldo = novoSaldo
            return `Saque realizado! Seu saldo: ${conta.saldo}.`
        }
    }

    if(conta.tipo == "poupanca"){
        const novoSaldo = conta.saldo - valor

        if(novoSaldo < 0){
            return `Saldo insuficiente.`
        }else{
            conta.saldo = novoSaldo
            return `Saque realizado! Seu saldo: ${conta.saldo}.`
        }
    }
     
    return "Tipo de conta inválido."

}

module.exports = { saque }