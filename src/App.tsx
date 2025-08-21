import { useEffect, useState } from "react"

type Container = {
  capacity: number,
  quantity: number
}

type Process = {
  capacity: number,
  waitingTime: number,
  waitingUntil: number,
  active: boolean,
  // quantity of material being processed
  // if null, only process with full capacity
  processing: number
}

type Project = {
  name: string,
  description: string,
  beams: number,
  sheets: number,
  deadline: number, // in milliseconds
  deadlineAt: number, // Date.now() + deadline
}

type State = {
  donationAmount: number,
  collectionAmount: number,
  // Storage units
  collectors: Container,
  cleaned: Container,
  material: Container,
  // Machines
  washingMachine: Process,
  shredingMachine: Process,
  extrudingMachine: Process,
  pressingMachine: Process,
  // Finished goods counter
  beams: number,
  sheets: number,
  // Pending project
  project: Project,
  // Score
  developmentPoints: number
}

const initialState: State = {
  donationAmount: 1,
  collectionAmount: 1,

  collectors: {
    capacity: 50,
    quantity: 0
  },
  cleaned: {
    capacity: 100,
    quantity: 0
  },
  material: {
    capacity: 200,
    quantity: 0
  },
  washingMachine: {
    capacity: 20,
    waitingTime: 5000,
    waitingUntil: 0,
    active: false,
    processing: 0
  },

  shredingMachine: {
    capacity: 10,
    waitingTime: 5000,
    waitingUntil: 0,
    active: false,
    processing: 0
  },

  extrudingMachine: {
    capacity: 100,
    waitingTime: 15000,
    waitingUntil: 0,
    active: false,
    processing: 0
  },

  pressingMachine: {
    capacity: 200,
    waitingTime: 10000,
    waitingUntil: 0,
    active: false,
    processing: 0
  },

  beams: 0,
  sheets: 0,
  project: {
    name: "Primeiro Projeto",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    beams: 1,
    sheets: 0,
    deadline: 30*6 * 1000,
    deadlineAt: Date.now() + (30*6 * 1000),
  },

  developmentPoints: 0

}

function donation(state: State): State {
  const newState = structuredClone(state)
  newState.collectors.quantity = Math.min(
    state.collectors.capacity,
    newState.collectors.quantity + newState.donationAmount
  )
  return newState
}

function collect(state: State): State {
  const newState = structuredClone(state)
  newState.collectors.quantity = Math.min(
    state.collectors.capacity,
    newState.collectors.quantity + newState.collectionAmount
  )
  return newState
}

function wash(state: State): State {
  const newState = structuredClone(state)
  const batchSize = Math.min(
    newState.collectors.quantity,
    newState.washingMachine.capacity
  )
  newState.washingMachine.processing = batchSize
  newState.collectors.quantity -= batchSize
  newState.washingMachine.waitingUntil = Date.now() + (newState.washingMachine.waitingTime)
  newState.washingMachine.active = true
  return newState
}

function shred(state: State): State {
  const newState = structuredClone(state)
  const batchSize = Math.min(
    newState.cleaned.quantity,
    newState.shredingMachine.capacity
  )
  newState.shredingMachine.processing = batchSize
  newState.cleaned.quantity -= batchSize
  newState.shredingMachine.waitingUntil = Date.now() + (newState.shredingMachine.waitingTime)
  newState.shredingMachine.active = true
  return newState
}

function produceBeam(state: State): State {
  const newState = structuredClone(state)
  if (newState.material.quantity >= state.extrudingMachine.capacity) {
    newState.material.quantity -= state.extrudingMachine.capacity
    newState.extrudingMachine.waitingUntil = Date.now() + (newState.extrudingMachine.waitingTime)
    newState.extrudingMachine.active = true
  }
  return newState
}

function produceSheet(state: State): State {
  const newState = structuredClone(state)
  if (newState.material.quantity >= state.pressingMachine.capacity)
  newState.material.quantity -= state.pressingMachine.capacity
  newState.pressingMachine.waitingUntil = Date.now() + (newState.pressingMachine.waitingTime)
  newState.pressingMachine.active = true
  return newState
}

function updateProcesses(state: State): State {
  const newState = structuredClone(state)
  const time = Date.now()

  if (state.washingMachine.active && state.washingMachine.waitingUntil < time) {
    newState.cleaned.quantity = Math.min(
      newState.cleaned.quantity+newState.washingMachine.processing,
      newState.cleaned.capacity
    )
    newState.washingMachine.active = false
  }

  if (state.shredingMachine.active && state.shredingMachine.waitingUntil < time) {
    newState.material.quantity = Math.min(
      newState.material.quantity+newState.shredingMachine.processing,
      newState.material.capacity
    )
    newState.shredingMachine.active = false
  }

  if (state.extrudingMachine.active && state.extrudingMachine.waitingUntil < time) {
    newState.beams += 1
    newState.extrudingMachine.active = false
  }

  if (state.pressingMachine.active && state.pressingMachine.waitingUntil < time) {
    newState.sheets += 1
    newState.pressingMachine.active = false
  }

  return newState
}

const canDeliverProject = (s: State): boolean => s.beams >= s.project.beams && s.sheets >= s.project.sheets

function deliverProject(state: State): State {
  const newState = structuredClone(state)
  if (canDeliverProject(newState)) {
    newState.beams -= newState.project.beams
    newState.sheets -= newState.project.sheets
    newState.developmentPoints += 1
    const extraPoints = (newState.project.deadlineAt - Date.now()) / (15*1000)
    newState.developmentPoints += extraPoints

    newState.project.beams *= 2
    newState.project.sheets *= 2
    newState.project.deadline *= 1.5

    if (newState.project.beams == 0) newState.project.beams = 1
    if (newState.project.sheets == 0) newState.project.sheets = 1

    newState.project.deadlineAt = Date.now() + newState.project.deadline

    newState.project.name = "Outro projeto! Um pouco mais difícil..."
  }
  return newState
}

export default function App() {
  const [ state, setState ] = useState<State>(initialState)

  useEffect(() => {
    const interval = setTimeout(() => {
      let newState = donation(state)
      newState = updateProcesses(newState)
      setState(newState)
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [state])

  function handleCollect() {
    let newState = collect(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  function handleWash() {
    let newState = wash(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  function handleShred() {
    let newState = shred(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  function handleMakeBeam() {
    let newState = produceBeam(state)
    newState = updateProcesses(newState)
    setState(newState)
  }


  function handleMakeSheet() {
    let newState = produceSheet(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  function handleDeliverProject() {
    let newState = deliverProject(state)
    setState(newState)
  }


  const projectTimeLeft = ((state.project.deadlineAt - Date.now()) / 1000)

  let washingProgress: number = 100-100*Math.max(0, state.washingMachine.waitingUntil-Date.now())/state.washingMachine.waitingTime
  let shredingProgress: number = 100-100*Math.max(0, state.shredingMachine.waitingUntil-Date.now())/state.shredingMachine.waitingTime
  let extrudingProgress: number = 100-100*Math.max(0, state.extrudingMachine.waitingUntil-Date.now())/state.extrudingMachine.waitingTime
  let pressingProgress: number = 100-100*Math.max(0, state.pressingMachine.waitingUntil-Date.now())/state.pressingMachine.waitingTime
  if (!state.washingMachine.active) washingProgress = 0
  if (!state.shredingMachine.active) shredingProgress = 0
  if (!state.extrudingMachine.active) extrudingProgress = 0
  if (!state.pressingMachine.active) pressingProgress = 0
  let beamsProgress: number = 100 * (state.beams / state.project.beams)
  let sheetsProgress: number = 100 * (state.sheets / state.project.sheets)

  return (
    <div className="container-fluid p-4">
      <div className="row">

        <div className="col project-info">
          <div className="card">
            <div className="card-body">
              <h5>
                A fantastica Carpintaria tem um projeto: <br/><strong>{state.project.name}</strong>
              </h5>
              <p>
                {state.project.description}
              </p>
              <p>
                Pare esse projeto você vai precisar de: <br/>
                <strong>{state.project.beams} ripas e {state.project.sheets} placas de plástico</strong>.
              </p>
              <p>
                <strong>Mas precisa ficar pronto em {projectTimeLeft.toFixed(0)} dias</strong> e contando!
              </p>
              <div className="progress my-3" role="progressbar">
                <div className="progress-bar" style={{width: `${(projectTimeLeft / (state.project.deadline/1000)) * 100}%`}}></div>
              </div>
              <p className="d-grid">
                <button
                  disabled={!canDeliverProject(state)}
                  className="btn btn-primary"
                  onClick={handleDeliverProject}
                  >
                  ENTREGAR PROJETO
                </button>
              </p>
              {
                state.project.beams > 0
                ? <>
                  <p>Ripas de madeira plastica: ( {state.beams}/{state.project.beams} )</p>
                  <div className="progress" role="progressbar">
                    <div className="progress-bar" style={{width: `${beamsProgress}%`}}></div>
                  </div>
                </>
                : null
              }
              {
                state.project.sheets > 0
                ? <>
                  <p>Placas madeira plastica: ( {state.sheets}/{state.project.sheets} )</p>
                  <div className="progress" role="progressbar">
                    <div className="progress-bar" style={{width: `${sheetsProgress}%`}}></div>
                  </div>
                </>
                : null
              }
            </div>
          </div>
        </div>

        <div className="col process-info">
          <div className="container-fluid">

            <div className="row g-4">

              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p>
                      Recebendo <strong>1</strong> doações de tampinha por dia.
                    </p>
                    <p className="d-grid">
                      <button className="btn btn-primary" onClick={handleCollect}>COLETAR</button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p>
                      <strong>{state.collectors.quantity}</strong> tampinhas recebidas.
                    </p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${(state.collectors.quantity/state.collectors.capacity)*100}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p className="d-grid">
                      {
                        state.washingMachine.active
                        ? <button disabled className="btn btn-primary">
                            LAVANDO {state.washingMachine.processing} TAMPINHAS
                          </button>
                        : <button
                            className="btn btn-primary"
                            disabled={state.washingMachine.active}
                            onClick={handleWash}
                            >
                            LAVAR {Math.min(state.washingMachine.capacity, state.collectors.quantity)} TAMPINHAS
                          </button>
                      }
                    </p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${washingProgress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p>
                      <strong>{state.cleaned.quantity}</strong> tampinhas limpas.
                    </p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${(state.cleaned.quantity/state.cleaned.capacity)*100}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p className="d-grid">
                      {
                        state.shredingMachine.active
                        ? <button disabled className="btn btn-primary">
                            TRITURANDO {state.shredingMachine.processing} TAMPINHAS
                          </button>
                        : <button
                            className="btn btn-primary"
                            disabled={state.shredingMachine.active}
                            onClick={handleShred}
                            >
                            TRITURAR {Math.min(state.shredingMachine.capacity, state.cleaned.quantity)} TAMPINHAS
                          </button>
                      }
                    </p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${shredingProgress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <p>
                      <strong>{state.material.quantity}</strong> tampinhas trituradas na estante de material.
                    </p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${(state.material.quantity/state.material.capacity)*100}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <p className="d-grid">
                      {
                        state.extrudingMachine.active
                        ? <button disabled className="btn btn-primary">
                            FAZENDO RIPA DE MADEIRA PLÁSTICA
                          </button>
                        : <button
                            className="btn btn-primary"
                            disabled={state.extrudingMachine.active || (state.material.quantity < state.extrudingMachine.capacity)}
                            onClick={handleMakeBeam}
                            >
                            FAZER RIPA DE MADEIRA PLÁSTICA
                          </button>
                      }
                    </p>
                    <p>(Usa 100 tampinhas trituradas)</p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${extrudingProgress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <p className="d-grid">
                      {
                        state.pressingMachine.active
                        ? <button disabled className="btn btn-primary">
                            FAZENDO PLACA DE MADEIRA PLÁSTICA
                          </button>
                        : <button
                            className="btn btn-primary"
                            disabled={state.pressingMachine.active || (state.material.quantity < state.pressingMachine.capacity)}
                            onClick={handleMakeSheet}
                            >
                            FAZER PLACA DE MADEIRA PLÁSTICA
                          </button>
                      }
                    </p>
                    <p>(Usa 200 tampinhas trituradas)</p>
                    <div className="progress" role="progressbar">
                      <div className="progress-bar" style={{width: `${pressingProgress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col upgrade-info" style={{maxHeight: '100vh', overflowY: 'scroll'}}>

          <div className="row g-4">

            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <p>
                    <strong>{state.developmentPoints.toFixed(0)}</strong> pontos de desenvolvimento para aplicar.
                  </p>
                  <p>
                    Realize projetos para ganhar mais pontos.
                  </p>
                </div>
              </div>
            </div>

            {
              (new Array(20).fill(null)).map(() => (
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h6>Nome da melhoria</h6>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad molestiae perferendis at dicta iste, quos aliquam. Repellat, laboriosam. Vitae adipisci cum earum nihil, perferendis ipsam ratione porro officia architecto laudantium.
                      </p>
                      <p className="d-grid">
                        <button disabled className="btn btn-primary">APLICAR</button>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }

            <div className="col-12 py-3"></div>

          </div>


        </div>

      </div>
    </div>
  )
}
