import Cover from "./views/cover.js"
import Mission from "./views/mission.js"
import Game from "./views/game.js"
import Upgrades from "./views/upgrades.js"
import store from "./store/game.js"

let app = Choo({ hash: true })

app.use(store)

app.route('*', Cover)
app.route('/', Cover)
app.route('/missao', Mission)
app.route('/:prefix/missao', Mission)
app.route('/jogo', Game)
app.route('/:prefix/jogo', Game)
app.route('/melhorias', Upgrades)
app.route('/:prefix/melhorias', Upgrades)
app.mount('#app')
