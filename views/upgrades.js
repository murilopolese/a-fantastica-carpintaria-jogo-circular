export default function Upgrades(state, emit) {
    if (state.coins <= 0) {
        emit('pushState', '#missao')
        return
    }
    return html`
        <div id="app" class="upgrades">
            <div class="row wrapper">
                <div class="column text">
                    <div class="message column">
                        <span class="title">Parabéns!</span>
                        <span>adquira melhorias com suas moedas</span>
                    </div>
                    <div class="illustration">
                        <img src="media/coins.png" />
                    </div>
                    <button class="reward-button row">
                        <span class="number">${state.coins}</span>
                        <span class="column">
                            <span>moedas</span>
                            <span>recebidas</span>
                        </span>
                    </button>
                </div>
                <div class="column upgrade-list">
                    <div class="header row">
                        <div class="column">
                            <span class="title">MELHORIAS</span>
                            <span>Use seus pontos de desenvolvimento</span>
                        </div>
                        <div class="icon">
                            <img src="media/recycle.png" />
                        </div>
                    </div>
                    <hr />
                    <div class="list column">
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:tampinhas-capacity')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Coletores maiores</span>
                                <span>Aumenta tampinhas que podem ser armazenadas</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:tampinhas-amount')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Aumenta a quantidade de tampinhas coletadas por click</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:lavadora-capacity')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Lavadora maior</span>
                                <span>Aumenta quantidade de tampinhas podem ser lavadas de uma vez</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:lavadora-time')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Lavadora melhor</span>
                                <span>Reduzir tempo que demora para lavar tampinhas</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:trituradora-capacity')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Trituradora maior</span>
                                <span>Aumenta quantidade de tampinhas que podem ser trituradas de uma vez</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:trituradora-time')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Trituradora mais rápida</span>
                                <span>Reduzir tempo que demora para triturar tamponhas</span>
                            </div>
                        </div>
                        <div class="item row">
                            <button class="outline-button" onclick=${() => emit('upgrade:extrusora-time')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Extrusora mais rápida</span>
                                <span>Reduzir tempo que demora para fazer uma ripa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}