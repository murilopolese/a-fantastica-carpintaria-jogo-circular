import { GameButton, Progress } from '../components/pills.js'

export default function Game(state, emit) {
    const collectButton = GameButton({
        onClick: () => emit('collect'),
        children: [
            html`<span>Coletar</span>`,
            html`<span>tampinhas</span>`
        ]
    })
    const washAmount = state.tampinhas.current > state.lavadora.capacity 
        ? state.lavadora.capacity 
        : state.tampinhas.current
    const washButton = GameButton({
        onClick: () => emit('wash'),
        disabled: state.lavadora.timer != 0 || state.tampinhas.current == 0,
        children: [
            html`<span>Limpar ${washAmount}</span>`,
            html`<span>tampinhas</span>`
        ]
    })
    const grindAmount = state.lavadora.done > state.trituradora.capacity
        ? state.trituradora.capacity
        : state.lavadora.done
    const grindButton = GameButton({
        onClick: () => emit('grind'),
        disabled: state.trituradora.timer != 0 || state.lavadora.done == 0,
        children: [
            html`<span>Triturar ${grindAmount}</span>`,
            html`<span>tampinhas</span>`
        ]
    })

    const extrudeButton = GameButton({
        onClick: () => emit('extrude'),
        disabled: state.trituradora.done < state.extrusora.capacity,
        children: [
            html`<span>Transformar ${state.extrusora.capacity}</span>`,
            html`<span>tampinhas em ripa</span>`
        ]
    })

    const collectProgress = Progress({
        value: (state.tampinhas.current / state.tampinhas.capacity) * 100
    })
    const washProgress = Progress({
        value: (state.lavadora.runningTime / state.lavadora.processTime) * 100
    })
    const grindProgress = Progress({
        value: (state.trituradora.runningTime / state.trituradora.processTime) * 100
    })
    const extrudeProgress = Progress({
        value: (state.extrusora.runningTime / state.extrusora.processTime) * 100
    })

    const score = html`
        <div class="score">${state.extrusora.done}</div>
    `
    
    return html`
        <div id="app" class="game">
            <div class="row wrapper">
                <div class="column stage">
                    <img src="media/coletor.png" alt="Coletor" />
                    ${collectButton}
                    ${collectProgress}
                </div>
                <div class="column stage">
                    <img src="media/lavadora.png" alt="Lavadora" />
                    ${washButton}
                    ${washProgress}
                </div>
                <div class="column stage">
                    <img src="media/trituradora.png" alt="Trituradora" />
                    ${grindButton}
                    ${grindProgress}
                </div>
                <div class="column stage">
                    <img src="media/extrusora.png" alt="Extrusora" />
                    ${extrudeButton}
                    ${extrudeProgress}
                </div>
                ${score}
            </div>
        </div>
    `
}