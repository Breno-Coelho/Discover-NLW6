import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescripition = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//pega os botões com a class check
const buttonsCheck = document.querySelectorAll('.actions a.check')

//adiciona o EventListenner de click a todos os botões de check
buttonsCheck.forEach(button => {
  button.addEventListener('click', handleClick)
})

//Quando o botão delete for clicado ele abre a modal
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

function handleClick(event, check = true) {
  event.preventDefault()
  const slug = check ? 'check' : 'delete'

  const form = document.querySelector('.modal form')
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  //edição do modal para marcar como lida e excluir
  const text = check ? 'Marcar como lida' : 'Excluir'
  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescripition.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
