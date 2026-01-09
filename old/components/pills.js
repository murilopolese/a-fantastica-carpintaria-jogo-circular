function BigButton(props) {
    const {
        onClick = () => false,
        children = [
            html`<span>Frase curta de apresentação</span>`,
            html`<span class="bold">Clique aqui para jogar!</span>`,
        ]
    } = props || {}
    return html`
        <button class="big-button" onclick=${onClick}>
            <span class="column">
                ${children}
            </span>
        </button>
    `
}

function Sponsors() {
    return html`
        <div class="sponsors">
            <img src="media/sponsors.png" alt="Patrocínio" />
        </div>
    `
}

function RuggedButton(props) {
    const {
        onClick = () => false
    } = props || {}
    return html`
        <button class="rugged-button column" onclick=${onClick}>
            <span class="top row">
                <span class="semi-circle"></span>
                <span class="semi-circle"></span>
                <span class="semi-circle"></span>
            </span>
            <span class="text">JOGAR</span>
            <span class="bottom row">
                <span class="semi-circle"></span>
                <span class="semi-circle"></span>
                <span class="semi-circle"></span>
            </span>
        </button>
    `

}

function GameButton(props) {
    const {
        onClick = () => false,
        children = [html`<span></span>`],
        disabled = false
    } = props || {}
    return html`
        <button disabled=${disabled} class="game-button" onclick=${onClick}>
            <span class="column">
                ${children}
            </span>
        </button>
    `
}

function Progress(props) {
    const {
        value = 0
    } = props || {}
    return html`
        <div class="progress">
            <div class="value" style="width: ${value}%"></div>
        </div>
    `
}

export {
    BigButton,
    Sponsors,
    RuggedButton,
    GameButton,
    Progress
}