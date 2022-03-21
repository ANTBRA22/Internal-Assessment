const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('#player_holder')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function save() {

  var player_holder = document.getElementById("player_holder")
  for (let i=1; i<=12; i++) {

    localStorage.setItem(i.toString(), player_holder.children.item(i-1).value)
  }
}

window.onload = function() {
  for (let i=1; i<=12; i++) {
    var item = localStorage.getItem(i.toString())
    if (item != null) {
      document.getElementById(i.toString()).value = item;
    }
  }
}