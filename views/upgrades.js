export default function Upgrades(state, emit) {
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
                        <span class="number">2</span>
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
                            <button class="outline-button" onclick=${() => emit('pushState', '#missao')}>MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                        <div class="item row disabled">
                            <button class="outline-button">MELHORAR</button>
                            <div class="column">
                                <span class="title">Campanha na Escola</span>
                                <span>Reduzir intervalo de doações</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}