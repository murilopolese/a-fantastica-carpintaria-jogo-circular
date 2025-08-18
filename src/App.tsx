import { useEffect, useState } from "react"

type State = {
  donationInterval: number, // seconds

  collectionAmount: number,
  collectorCapacity: number,
  collected: number,

  washingWaitingTime: number, // seconds
  washingWaitingUntil: number, // Date.now() + (washingWaitingTime*1000)
  washingCapacity: number,
  washingBatch: number,
  
  cleanCapacity: number,
  cleaned: number,
  
  shrederWaitingTime: number,
  shrederWaitingUntil: number,
  shrederCapacity: number,
  shredingBatch: number,

  materialCapacity: number,
  materialProduced: number,

  extruderCapacity: number,
  extruderWaitingTime: number,
  extruderWaitingUntil: number,
  
  pressCapacity: number,
  pressWaitingTime: number,
  pressWaitingUntil: number,

  washing: boolean,
  shreding: boolean,
  producingBeam: boolean,
  producingSheet: boolean,

  beams: number,
  sheets: number,

  neededBeams: number,
  neededSheets: number,

  developmentPoints: number
}

const State: State = {
  donationInterval: 2,

  collectionAmount: 1,
  collectorCapacity: 100,
  collected: 0,

  washingWaitingTime: 7,
  washingWaitingUntil: 0,
  washingCapacity: 20,
  washingBatch: 0,

  cleanCapacity: 100,
  cleaned: 0,
  
  shrederWaitingTime: 4,
  shrederWaitingUntil: 0,
  shrederCapacity: 10,
  shredingBatch: 0,

  materialCapacity: 200,
  materialProduced: 0,

  extruderCapacity: 100,
  extruderWaitingTime: 20,
  extruderWaitingUntil: 0,
  
  pressCapacity: 200,
  pressWaitingTime: 20,
  pressWaitingUntil: 0,

  washing: false,
  shreding: false,
  producingBeam: false,
  producingSheet: false,

  beams: 0,
  sheets: 0,

  neededBeams: 2,
  neededSheets: 1,

  developmentPoints: 0
}

function collect(state: State): State {
  const newState = structuredClone(state)
  newState.collected = Math.min(state.collectorCapacity, newState.collected+newState.collectionAmount)
  return newState
}

function wash(state: State): State {
  const newState = structuredClone(state)
  const batchSize = Math.min(newState.collected, newState.washingCapacity)
  newState.washingBatch = batchSize
  newState.collected -= batchSize
  newState.washingWaitingUntil = Date.now() + (newState.washingWaitingTime * 1000)
  newState.washing = true
  return newState
}

function shred(state: State): State {
  const newState = structuredClone(state)
  const batchSize = Math.min(newState.cleaned, newState.shrederCapacity)
  newState.shredingBatch = batchSize
  newState.cleaned -= batchSize
  newState.shrederWaitingUntil = Date.now() + (newState.shrederWaitingTime * 1000)
  newState.shreding = true
  return newState
}

function produceBeam(state: State): State {
  const newState = structuredClone(state)
  newState.materialProduced -= state.extruderCapacity
  newState.extruderWaitingUntil = Date.now() + (newState.extruderWaitingTime * 1000)
  newState.producingBeam = true
  return newState
}

function produceSheet(state: State): State {
  const newState = structuredClone(state)
  newState.materialProduced -= state.pressCapacity
  newState.pressWaitingUntil = Date.now() + (newState.pressWaitingTime * 1000)
  newState.producingSheet = true
  return newState
}

function updateProcesses(state: State): State {
  const newState = structuredClone(state)
  const time = Date.now()

  if (state.washing && state.washingWaitingUntil < time) {
    newState.cleaned = Math.min(newState.cleaned+newState.washingBatch, newState.cleanCapacity)
    newState.washing = false
  }

  if (state.shreding && state.shrederWaitingUntil < time) {
    newState.materialProduced = Math.min(newState.materialProduced+newState.shredingBatch, newState.materialCapacity)
    newState.shreding = false
  }

  if (state.producingBeam && state.extruderWaitingUntil < time) {
    newState.beams += 1
    newState.producingBeam = false
  }

  if (state.producingSheet && state.pressWaitingUntil < time) {
    newState.sheets += 1
    newState.producingSheet = false
  }

  return newState
}

function App() {
  const [ state, setState ] = useState<State>(State)

  useEffect(() => {
    const interval = setTimeout(() => {
      let newState = collect(state)
      newState = updateProcesses(newState)
      setState(newState)
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [state])

  const washing: boolean = state.washing
  const shreding: boolean = state.shreding
  const producingBeam: boolean = state.producingBeam
  const producingSheet: boolean = state.producingSheet

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

  function handleBeam() {
    let newState = produceBeam(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  function handleSheet() {
    let newState = produceSheet(state)
    newState = updateProcesses(newState)
    setState(newState)
  }

  return (
    <div>
      <p>Recebendo doações à cada <strong>{state.donationInterval}</strong> segundos</p>
      <p><strong>{state.collectionAmount}</strong> tampinhas por doação</p>
      <p><button onClick={handleCollect}>coletar {state.collectionAmount} tampinhas</button></p>
      <p><strong>{state.collected}</strong> tampinhas coletadas. Cabem {state.collectorCapacity} no total</p>
      <p><button disabled={washing} onClick={handleWash}>Lavar {Math.min(state.washingCapacity, state.collected)} tampinhas</button></p>
      <p>{washing ? "lavando..." : "pronto pra lavar"}</p>
      <p><strong>{state.cleaned}</strong> tampinhas limpas. Cabem {state.cleanCapacity} no total</p>
      <p><button disabled={shreding} onClick={handleShred}>Triturar {Math.min(state.shrederCapacity, state.cleaned)} tampinhas</button></p>
      <p>{shreding ? "triturando..." : "pronto pra triturar"}</p>
      <p><strong>{state.materialProduced/10}</strong> caixas de material triturado. Cabem {state.materialCapacity/10} no total</p>
      <p><button disabled={producingBeam||(state.materialProduced < state.extruderCapacity)} onClick={handleBeam}>Produzir ripa (10 caixas)</button></p>
      <p>{producingBeam ? "produzindo ripa" : "máquina parada"}</p>
      <p><button disabled={producingSheet||(state.materialProduced < state.pressCapacity)} onClick={handleSheet}>Produzir placa (20 caixas)</button></p>
      <p>{producingSheet ? "produzindo placa" : "máquina parada"}</p>
      <p><strong>{state.beams}</strong> ripas prontas. Precisa de {state.neededBeams} no total</p>
      <p><strong>{state.sheets}</strong> placas prontas. Precisa de {state.neededSheets} no total</p>

    </div>
  )
}

export default App
