const TowerComp = ({ id, disks, handleDrop, handleDrag }) => {
  if (disks === 1) {
    disks = []
  }
  return (
    <div
      className="column-container"
      id={id}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="center-bar" />
      {disks
        ? disks.map((tile, index) => {
            const tileCount = disks.length
            const tileStyles = { width: `${tile * 1.7}em` }

            tileStyles.marginTop =
              index === 0 ? `calc(65vh - ${tileCount * 33 + 20}px)` : "0"

            return (
              <div
                {...tile}
                className="tile"
                draggable
                key={`column-${id}-${tile}`}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => handleDrag(e, tile, id)}
                style={tileStyles}
              />
            )
          })
        : (disks = [])}
    </div>
  )
}

export default TowerComp
