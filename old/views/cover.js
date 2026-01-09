import { BigButton, Sponsors } from '../components/pills.js'

export default function Cover(state, emit) {

    const lettering = html`
        <div class="lettering">
            <img src="media/lettering.png" alt="Jogo Circular - AFC 2025"/>
        </div>
    `

    const bigButton = BigButton({
        onClick: () => emit('pushState', '#missao')
    })

    const sponsors = Sponsors()

    return html`
        <div id="app" class="cover">
            ${lettering}
            ${bigButton}
            ${sponsors}
        </div>
    `
}