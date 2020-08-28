import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')


function main(currentTime) {

    if (gameOver){
        if (confirm('GAME OVER NOOB!')){
            window.location = '/'   
        }
        return 
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime 

    // update the length of snake and food position
    update() 
    // draw it
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    // Snake runs into a wall or itself
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}