const audio = new Audio('timer_beep.mp3')
const audio_duration_seconds = 3
const audio_ending_offset_compensation_ms = 900

const time_wrapper = document.getElementById('time-wrapper')
const timer = document.getElementById('time')

const lap = document.getElementById('lap-count')

const btn_start_stop = document.getElementById('start-stop-btn')
changeBtn('#00FF00', 'start')

var beeper
var lap_count

document.getElementById('minus').onclick = () => {
    if (timer.textContent >= 6) timer.textContent -= 1
}
document.getElementById('minus').ondblclick = () => {
    if (timer.textContent >= 8) timer.textContent -= 3
}
document.getElementById('plus').onclick = () => {
    timer.textContent -= -1
}
document.getElementById('plus').ondblclick = () => {
    timer.textContent -= -3
}

btn_start_stop.onclick = () => {
    beeper ? stopBeeper() : resetBeeper()
}

function startTimerCountdown(init){
    let time = init
    audio.play()
    
    let degrees = 180
    time_wrapper.style.transform = 'rotate(90deg)'
    
    let rotator = setInterval( () => {
        time_wrapper.style.transform = `rotate(${degrees}deg)`
        degrees += 90
    }, 1000)
    setTimeout( () => {
        clearInterval(rotator)
    }, audio_duration_seconds * 1000);
    
    setTimeout( () => {

        beeper = setInterval(
            () => 
                {
                    timer.textContent = time
                    
                    if (time == audio_duration_seconds) audio.play()
                    
                    if (time == 0) {
                        time = init
                        lap.textContent = `Lap ${++lap_count}`
                    } else {
                        time -= 1
                    }
                }, 1000)

    }, audio_duration_seconds * 1000 - audio_ending_offset_compensation_ms)
    
}
function changeBtn(color, text){
    btn_start_stop.style.backgroundColor = color
    btn_start_stop.textContent = text
}
function stopBeeper(){
    clearInterval(beeper)
    beeper = undefined
    changeBtn('#00FF00', 'start')
    audio.pause()
    audio.currentTime = 0
}
function resetBeeper(){
    btn_start_stop.style.visibility = 'hidden'
    setTimeout(() => {
        btn_start_stop.style.visibility = 'visible'
    }, audio_duration_seconds * 1000)
    let init_time = timer.textContent
    startTimerCountdown(init_time)
    changeBtn('#FF0000', 'stop')
    lap_count = 1
    lap.textContent = `Lap ${lap_count}`
}