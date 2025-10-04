export default function store(state, emitter) {
    state.missions = [
        {
            title: "Construa um gol de futebol para uma escola usando plástico descartado.",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 3
        },
        {
            title: "O Mirante São Benedito precisa de um banco renovado para os turistas.",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 6
        },
        {
            title: "A comunidade de Jabaeté precisa de um parquinho para a criançada se divertir!",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 9
        },
        {
            title: "A comunidade de Ourimar precisa de uma casinha de ferramentas e mobiliário para a horta comunitária.",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 12
        },
        {
            title: "A escola inteira precisa de um mobiliário reformado.",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 15
        },
        {
            title: "Precisamos de coletores para toda a cidade!!",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 18
        },
        {
            title: "A comunidade precisa de um barco construído com plástico reciclado para as festas do Ticumbi no Sapê do Norte.",
            description: "Colete, limpe, triture e processe o material dentro do tempo estipulado para ganhar moedas como recompensa.",
            goal: 21
        }
    ]
    state.currentMission = 0
    state.tampinhas = {
        current: 0,
        capacity: 10,
        autoCollect: 1,
        autoTime: 1
    }
    state.lavadora = {
        done: 0,
        current: 0,
        capacity: 5,
        runningTime: 0,
        processTime: 10,
        timer: 0
    }
    state.trituradora = {
        done: 0,
        current: 0,
        capacity: 20,
        runningTime: 0,
        processTime: 10,
        timer: 0
    }
    state.extrusora = {
        done: 0,
        capacity: 10,
        runningTime: 0,
        processTime: 10,
        timer: 0
    }

    emitter.on('collect', () => {
        state.tampinhas.current = Math.min(
            state.tampinhas.current + 1,
            state.tampinhas.capacity
        )
        console.log('coleta', state.tampinhas.current)
        emitter.emit('render')
    })

    emitter.on('wash', () => {
        if (state.lavadora.timer == 0) {
            if (state.lavadora.capacity > state.tampinhas.current) {
                // Menos tampinha que a capacidade
                state.lavadora.current = state.tampinhas.current
                state.tampinhas.current = 0
            } else {
                // Mais tampinha que a capacidade
                state.lavadora.current = state.lavadora.capacity
                state.tampinhas.current -= state.lavadora.capacity
            }
            
            state.lavadora.timer = setInterval(() => {
                state.lavadora.runningTime += 1
                if (state.lavadora.runningTime >= state.lavadora.processTime) {
                    state.lavadora.done += state.lavadora.current
                    state.lavadora.current = 0
                    clearInterval(state.lavadora.timer)
                    state.lavadora.timer = 0
                    state.lavadora.runningTime = 0
                }
                emitter.emit('render')
            }, 1000)
        } else {
            console.log('lavadora já está rodando')
        }
        emitter.emit('render')
    })

    emitter.on('grind', () => {
        if (state.trituradora.timer == 0) {
            if (state.trituradora.capacity > state.lavadora.done) {
                // Menos que a capacidade
                state.trituradora.current = state.lavadora.done
                state.lavadora.done = 0
            } else {
                // Mais que a capacidade
                state.trituradora.current = state.trituradora.capacity
                state.lavadora.done -= state.trituradora.capacity
            }
            
            state.trituradora.timer = setInterval(() => {
                state.trituradora.runningTime += 1
                if (state.trituradora.runningTime >= state.trituradora.processTime) {
                    state.trituradora.done += state.trituradora.current
                    state.trituradora.current = 0
                    clearInterval(state.trituradora.timer)
                    state.trituradora.timer = 0
                    state.trituradora.runningTime = 0
                }
                emitter.emit('render')
            }, 1000)
        } else {
            console.log('trituradora já está rodando')
        }
        emitter.emit('render')
    })

    emitter.on('extrude', () => {
        if (state.extrusora.timer == 0) {
            if (state.extrusora.capacity > state.trituradora.done) {
                // Menos que a capacidade
                state.extrusora.current = state.trituradora.done
                state.trituradora.done = 0
            } else {
                // Mais que a capacidade
                state.extrusora.current = state.extrusora.capacity
                state.trituradora.done -= state.extrusora.capacity
            }
            
            state.extrusora.timer = setInterval(() => {
                state.extrusora.runningTime += 1
                if (state.extrusora.runningTime >= state.extrusora.processTime) {
                    state.extrusora.done += 1
                    state.extrusora.current = 0
                    clearInterval(state.extrusora.timer)
                    state.extrusora.timer = 0
                    state.extrusora.runningTime = 0
                }
                if (state.extrusora.done >= state.missions[state.currentMission].goal) {
                    state.extrusora.done -= state.missions[state.currentMission].goal
                    state.currentMission += 1
                    emitter.emit('pushState', '#melhorias')
                }
                emitter.emit('render')
            }, 1000)
        } else {
            console.log('extrusora já está rodando')
        }
        emitter.emit('render')
    })
    
}