import Cover from "./views/cover.js"
import Mission from "./views/mission.js"
import Game from "./views/game.js"
import Upgrades from "./views/upgrades.js"

let app = Choo({ hash: true })
app.route('*', Cover)
app.route('/', Cover)
app.route('/mission', Mission)
app.route('/:prefix/mission', Mission)
app.route('/game', Game)
app.route('/:prefix/game', Game)
app.route('/melhorias', Upgrades)
app.route('/:prefix/melhorias', Upgrades)
app.mount('#app')
