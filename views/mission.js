import { RuggedButton } from "../components/pills.js"

export default function Mission(state, emit) {
    const ruggedButton = RuggedButton({
        onClick: () => emit('pushState', '#game')
    })
    return html`
        <div id="app" class="mission">
            <div class="row wrapper">
                <div class="illustration">
                    <img src="media/mission.png" />
                </div>
                <div class="column text">
                    <div class="column description">
                        <span class="title">A Cidade Quintal vai construir mais uma horta na comunidade.</span>
                        <span>Precisamos montar mesas e cadeiras, mas tudo começa pela coleta!</span>
                    </div>
                    ${ruggedButton}
                </div>
            </div>
        </div>
    `
}