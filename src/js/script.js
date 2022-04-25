let lost = false

class Board{

    static construirCampo(container){

        for(let j = 0; j < 25; j++){
            for(let i = 0; i < 50; i++){
            let div = document.createElement("div")
            div.classList.add("quadrado")
            div.id = `x${i}-y${j}`

            container.append(div)
        }
        }
        

    }
}

const campo = document.getElementById("container")

Board.construirCampo(campo)

class Snake{
    constructor(){
        this.corpo = ["x25-y13", "x26-y13"]
        this.direcao = [1,0]
        this.meuIntervalo
        this._score
        this.velocidade = 100
        this.clickable = true
    }

    pintarCobra(){
        this.corpo.forEach(elem => {
            let celula = document.querySelector(`#${elem}`)
            celula.classList.add("cobra")
        })
    }
    pegarXYUltimo(){
        let ultimo = this.corpo[this.corpo.length - 1]
        let x = parseInt(ultimo.split("-")[0].replace("x", ""))
        let y = parseInt(ultimo.split("-")[1].replace("y", ""))
        return [x, y]
    }

    andar(){
        this.meuIntervalo = setInterval(() => {
            let xy = this.pegarXYUltimo()
            let novaCabeca
            if(xy[0] === 49 && minhaCobra.direcao[0]=== 1){
                novaCabeca = document.querySelector(`#x0-y${xy[1] + this.direcao[1]}`)
            }else if(xy[1] === 0 && minhaCobra.direcao[1] === -1){
                novaCabeca = document.querySelector(`#x${xy[0] + this.direcao[0]}-y${24}`)
            }else if(xy[1] === 24 && minhaCobra.direcao[1] === 1){
                novaCabeca = document.querySelector(`#x${xy[0] + this.direcao[0]}-y${0}`)
            }else if(xy[0] === 0 && minhaCobra.direcao[0] === -1){
                novaCabeca = document.querySelector(`#x${49}-y${xy[1] + this.direcao[1]}`)
            }
            else{
                novaCabeca = document.querySelector(`#x${xy[0] + this.direcao[0]}-y${xy[1] + this.direcao[1]}`)
            }

            if(novaCabeca.classList.contains("comida")){

                novaCabeca.classList.remove("comida")
                this.spawnFood()
            }else{

                let rabo = this.corpo.shift()
                rabo = document.querySelector(`#${rabo}`)
                rabo.classList.remove("cobra")
            }

            novaCabeca = novaCabeca.id

            if(this.corpo.includes(novaCabeca)){
                lost = true
                let record = document.querySelector("#record")
                if(this._score > parseInt(record.innerText)){
                    record.innerText = this._score
                    localStorage.setItem("record", this._score)
                }
                let lostMessage = document.querySelector("h1")
                lostMessage.style.display = "block"
                let playAgain = document.querySelector("button")
                playAgain.style.display = "inline"
                clearInterval(this.meuIntervalo)
            }
            this.corpo.push(novaCabeca)
            
            
            this.pintarCobra()
            this.score()
        }, this.velocidade)
          
    }

    mudarDirecao(event){
        if(!lost){
            
            if(event.code === "ArrowUp" && minhaCobra.direcao[1] !== 1 && this.clickable === true){
                clearInterval(minhaCobra.meuIntervalo)
                this.clickable = false
                minhaCobra.direcao = [0, -1]
                minhaCobra.andar()
                
            }else if(event.code === "ArrowDown" && minhaCobra.direcao[1] !== -1 && this.clickable === true){
                clearInterval(minhaCobra.meuIntervalo)
                this.clickable = false
                minhaCobra.direcao = [0, 1]
                minhaCobra.andar()
            }else if(event.code === "ArrowRight" && minhaCobra.direcao[0] !== -1 && this.clickable === true){
                clearInterval(minhaCobra.meuIntervalo)
                this.clickable = false
                minhaCobra.direcao = [1, 0]
                minhaCobra.andar()
            }else if(event.code === "ArrowLeft" && minhaCobra.direcao[0] !== 1 && this.clickable === true){
                clearInterval(minhaCobra.meuIntervalo)
                this.clickable = false
                minhaCobra.direcao = [-1, 0]
                minhaCobra.andar()
            }

            
            setTimeout(() => {
                this.clickable = true
            }, 80)
        }
        
    }

    spawnFood(){
        let randX = getRandomIntInclusive(0, 49)
        let randY = getRandomIntInclusive(0, 24)

        while(this.corpo.includes(`x${randX}-y${randY}`)){
            randX = getRandomIntInclusive(0, 49)
            randY = getRandomIntInclusive(0, 24)
        }
        let comida = document.querySelector(`#x${randX}-y${randY}`)
        comida.classList.add("comida")
    }

    score(){
        let score = document.querySelector("#score")
        let totalScore = this.corpo.length * 100 - 200
        score.innerText = totalScore
        this.velocidade = 100 - totalScore/50
        this._score = totalScore
    }

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const minhaCobra = new Snake()
minhaCobra.pintarCobra()
minhaCobra.andar()
window.addEventListener("keyup", minhaCobra.mudarDirecao)
minhaCobra.spawnFood()
let record = document.querySelector("#record")
if(localStorage.getItem("record")){
    record.innerText = localStorage.getItem("record")
}else{record.innerText = 0}


const playAgain = document.querySelector("button")
playAgain.addEventListener("click", () => {
    minhaCobra.corpo.forEach(elem => {
        let celula = document.querySelector(`#${elem}`)
        celula.classList.remove("cobra")
    })
    minhaCobra.corpo = ["x25-y13", "x26-y13"]
    minhaCobra.pintarCobra()
    lost = false
    clearInterval(minhaCobra.meuIntervalo)
    minhaCobra.clickable = true
    minhaCobra.velocidade = 100
    minhaCobra.andar()
    minhaCobra.direcao = [1, 0]

    let lostMessage = document.querySelector("h1")
    let playAgain = document.querySelector("button")

    lostMessage.style.display = "none"
    playAgain.style.display = "none"
})