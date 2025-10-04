import { RuggedButton } from "../components/pills.js"

export default function Mission(state, emit) {
    const ruggedButton = RuggedButton({
        onClick: () => emit('pushState', '#jogo')
    })
    const mission = state.missions[state.currentMission]
    if (!mission) {
        return html`
            <div id="app" class="mission">
                <div class="row wrapper">
                    <div class="illustration">
                        <img src="media/mission.png" />
                    </div>
                    <div class="column text">
                        <div class="column description">
                            <span class="title">Parabéns!</span>
                            <span>Você completou todas as missões!</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    return html`
        <div id="app" class="mission">
            <div class="row wrapper">
                <div class="illustration">
                    <img src="media/mission.png" />
                </div>
                <div class="column text">
                    <div class="column description">
                        <span class="title">${mission.title}</span>
                        <span>${mission.description}</span>
                    </div>
                    ${ruggedButton}
                </div>
            </div>
        </div>
    `
}