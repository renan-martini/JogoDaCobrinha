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
                let lostMessage = document.querySelector("h1")
                lostMessage.style.display = "block"
                let playAgain = document.querySelector("button")
                playAgain.style.display = "inline"
                clearInterval(this.meuIntervalo)
            }
            this.corpo.push(novaCabeca)
            
            
            this.pintarCobra()
        }, 100)
          
    }

    mudarDirecao(event){
        if(!lost){
            if(event.code === "ArrowUp" && minhaCobra.direcao[1] !== 1){
                minhaCobra.direcao = [0, -1]
                clearInterval(minhaCobra.meuIntervalo)
                minhaCobra.andar()
            }else if(event.code === "ArrowDown" && minhaCobra.direcao[1] !== -1){
                minhaCobra.direcao = [0, 1]
                clearInterval(minhaCobra.meuIntervalo)
                minhaCobra.andar()
            }else if(event.code === "ArrowRight" && minhaCobra.direcao[0] !== -1){
                minhaCobra.direcao = [1, 0]
                clearInterval(minhaCobra.meuIntervalo)
                minhaCobra.andar()
            }else if(event.code === "ArrowLeft" && minhaCobra.direcao[0] !== 1){
                minhaCobra.direcao = [-1, 0]
                clearInterval(minhaCobra.meuIntervalo)
                minhaCobra.andar()
            }
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

const playAgain = document.querySelector("button")
playAgain.addEventListener("click", () => {
    minhaCobra.corpo.forEach(elem => {
        let celula = document.querySelector(`#${elem}`)
        celula.classList.remove("cobra")
    })
    minhaCobra.corpo = ["x25-y13", "x26-y13"]
    minhaCobra.direcao = [1,0]
    minhaCobra.pintarCobra()
    minhaCobra.andar()
    lost = false

    let lostMessage = document.querySelector("h1")
    let playAgain = document.querySelector("button")

    lostMessage.style.display = "none"
    playAgain.style.display = "none"
})