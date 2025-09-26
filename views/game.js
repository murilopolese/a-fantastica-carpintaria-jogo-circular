import { GameButton, Progress } from '../components/pills.js'

export default function Game(state, emit) {
    const collectButton = GameButton({
        onClick: () => emit('pushState', '#melhorias'),
        children: [
            html`<span>Coletar ${2}</span>`,
            html`<span>tampinhas</span>`
        ]
    })
    const washButton = GameButton({
        onClick: () => console.log('lavar'),
        children: [
            html`<span>Limpar ${2}</span>`,
            html`<span>tampinhas</span>`
        ]
    })
    const grindButton = GameButton({
        onClick: () => console.log('triturar'),
        children: [
            html`<span>Limpar ${2}</span>`,
            html`<span>tampinhas</span>`
        ]
    })
    const extrudeButton = GameButton({
        onClick: () => console.log('extruir'),
        children: [
            html`<span>Transformar 100</span>`,
            html`<span>tampinhas em ripa</span>`
        ]
    })

    const collectProgress = Progress()
    const washProgress = Progress()
    const grindProgress = Progress()
    const extrudeProgress = Progress()

    const score = html`
        <div class="score">0</div>
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
                <div class="column stage disabled">
                    <img src="media/extrusora.png" alt="Extrusora" />
                    ${extrudeButton}
                    ${extrudeProgress}
                </div>
                ${score}
            </div>
        </div>
    `
}