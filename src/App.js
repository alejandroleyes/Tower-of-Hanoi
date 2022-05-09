import React, { useEffect, useState } from "react"
import GameOptionsComp from "./components/GameOptionsComp"
import TowerComp from "./components/TowerComp"
import WinMessageComp from "./components/WinMessageComp"
import Tower from "./utils/Tower"
import "./App.css"

const App = () => {
  const [moveCount, setMoveCount] = useState(0)

  const [dragTile, setDragTile] = useState(0)
  //Disks for tower One
  const [disks, setDisks] = useState(4)

  //Disks foreach tower (1, 2, 3)
  const [tiles, setTiles] = useState([])
  const [tilesTwo, setTilesTwo] = useState([])
  const [tilesThree, setTilesThree] = useState([])

  // 3 towers
  let [towerOne] = useState(new Tower(1))
  let [towerTwo] = useState(new Tower(2))
  let [towerThree] = useState(new Tower(3))

  let [timer, setTimer] = useState(0)

  const towers = {
    1: {
      tower: towerOne,
    },
    2: {
      tower: towerTwo,
    },
    3: {
      tower: towerThree,
    },
  }

  useEffect(() => {
    document.title = "Tower of Hanoi"
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disks])

  useEffect(() => {
    setTiles(towerOne.traverse())
  }, [towerOne.length, towerOne, towerOne.top])

  useEffect(() => {
    setTilesTwo(towerTwo.traverse())
  }, [towerTwo.length, towerTwo])

  useEffect(() => {
    setTilesThree(towerThree.traverse())
  }, [towerThree.length, towerThree])

  const reset = () => {
    const n = disks

    setMoveCount(0)
    if (timer) {
      clearInterval(timer)
      setTimer(0)
    }
    towerOne.resetTower()
    towerTwo.resetTower()
    towerThree.resetTower()

    for (let i = n; i > 0; i--) {
      towerOne.add(i)

      setTiles([].push(i))
    }
  }

  const handleDrag = (e, tile, id) => {
    const dragTile = { tile, towerId: id }

    if (towers[id].tower.top.value === dragTile.tile) {
      setDragTile(dragTile)
    } else {
      e.preventDefault()
    }
  }

  const handleDrop = (e) => {
    const dropColumn = e.currentTarget.id //ID column destination
    let source = towers[dragTile.towerId].tower //source tower
    let destination = towers[dropColumn].tower //tower destination

    if (destination.top === null || source.top.value < destination.top.value) {
      const goodMove = source.moveTopTo(destination) //move disk from to
      if (goodMove) {
        setMoveCount((prevState) => prevState + 1) //update moves
      }
    }
  }

  const handleSolve = () => {
    reset()
    towerThree.deleteSteps()
    towerOne.moveDisks(disks, towerOne, towerThree, towerTwo)
    const saveSteps = towerThree.steps()
    const stepsSolve = saveSteps
    const len = stepsSolve.length
    reset()
    /// animation
    let i = 0
    let interval = setInterval(() => {
      let source = towers[stepsSolve[i][0]].tower //source tower
      let destination = towers[stepsSolve[i][1]].tower //tower destination
      const goodMove = source.moveTopTo(destination)
      if (goodMove) {
        setMoveCount((prevState) => prevState + 1)
      }
      i++
      if (i === len) clearInterval(interval)
      setTimer(interval)
    }, 1000)
  }

  const handleIncrement = () => {
    if (disks === 12) {
    } else {
      setDisks(disks + 1)
    }
  }
  const handleDecrement = () => {
    if (disks === 1) {
    } else {
      setDisks(disks - 1)
    }
  }
  let winCondition = false
  if (towerOne.length === 0 && towerTwo.length === 0) {
    winCondition = true
  }

  return (
    <>
      <div className="title">
        <h1> Tower of Hanoi</h1>
      </div>
      <div className="container">
        <GameOptionsComp
          disks={disks}
          handleSolve={handleSolve}
          reset={reset}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        {winCondition && <WinMessageComp moveCount={moveCount} />}
        Moves: {moveCount}
      </div>
    </>
  )
}

export default App
