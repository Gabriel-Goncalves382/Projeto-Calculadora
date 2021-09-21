
    class Calculadora{
        constructor(operadorAntTextElement,operadorAtualTextElement){
            this.operadorAntTextElement = operadorAntTextElement
            this.operadorAtualTextElement = operadorAtualTextElement
            this.clear()
        }

        clear(){
            this.operadorAnt = ''
            this.operadorAtual = ''
            this.operacao = undefined
        }

        deletar(){
            this.operadorAtual = this.operadorAtual.toString().slice(0,-1)
        }

        passaNumero(numero){
            if (numero === '.' && this.operadorAtual.includes('.')) return
        this.operadorAtual = this.operadorAtual.toString() + numero.toString()
        }

        escolherOperacao(operacao){
            if (this.operadorAtual === '') return
            if (this.operadorAnt !== ''){
                this.computar()
            }
            this.operacao = operacao
            this.operadorAnt = this.operadorAtual
            this.operadorAtual = ''
        }

        computar(){
            let resultado
            const ant = parseFloat(this.operadorAnt)
            const atual = parseFloat(this.operadorAtual)
            if(isNaN(ant)|| isNaN(atual))return
            switch(this.operacao){
                case '+':
                    resultado = ant+atual
                    break
                case '-':
                    resultado = ant-atual
                    break
                case '*':
                    resultado = ant*atual
                    break  
                case '÷':
                    resultado = ant/atual
                    break  
            }
            this.operadorAtual = resultado
            this.operacao = undefined
            this.operadorAnt = ''
        }

        pegaNumeroDisplay(numero) {
            const stringNumero = numero.toString()
            const digitosInteiros = parseFloat(stringNumero.split('.')[0])
            const digitosDecimais = stringNumero.split('.')[1]
            let displayInteiro
            if (isNaN(digitosInteiros)) {
              displayInteiro = ''
            } else {
              displayInteiro = digitosInteiros.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (digitosDecimais != null) {
              return `${displayInteiro}.${digitosDecimais}`
            } else {
              return displayInteiro
            }
          }


        atualizarDisplay(){
            this.operadorAtualTextElement.innerText = this.pegaNumeroDisplay(this.operadorAtual)
            if(this.operacao != null) {
                this.operadorAntTextElement.innerText = `${this.pegaNumeroDisplay(this.operadorAnt)} ${this.operacao}`
            }else{
                this.operadorAntTextElement.innerText = ''
            }
        }
    }

    const numeroBotoes = document.querySelectorAll('[data-numero]')
    const numeroOperacoes = document.querySelectorAll('[data-operacoes]')
    const botaoIgual = document.querySelector('[data-igual]')
    const botaoDelete = document.querySelector('[data-delete]')
    const botaoLimpa = document.querySelector('[data-limpa]')
    const operadorAntTextElement = document.querySelector('[data-operador-anterior]')
    const operadorAtualTextElement = document.querySelector('[data-operador-atual]')

const calculadora = new Calculadora(operadorAntTextElement,operadorAtualTextElement)

numeroBotoes.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.passaNumero(button.innerText)
        calculadora.atualizarDisplay()
    })
});

numeroOperacoes.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.escolherOperacao(button.innerText)
        calculadora.atualizarDisplay()
    })
})



botaoLimpa.addEventListener('click', button => {
    calculadora.clear()
    calculadora.atualizarDisplay()
  })

botaoDelete.addEventListener('click', button =>{
    calculadora.deletar()
    calculadora.atualizarDisplay()
})

botaoIgual.addEventListener('click', button =>{
    calculadora.computar()
    calculadora.atualizarDisplay()
})
