export default function Modal() {
  const cancelButton = document.querySelector('.button.cancel')
  cancelButton.addEventListener('click', close)

  const wrapper = document.querySelector('.modal-wrapper')

  function open() {
    wrapper.classList.add('active')
  }
  function close() {
    wrapper.classList.remove('active')
  }

  return { open, close }
}
