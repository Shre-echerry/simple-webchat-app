



const harrySelectorBtn = document.querySelector('#user1-selector')
const sathSelectorBtn = document.querySelector('#user2-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'user1' ? 'black-bg' : 'blue-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'user1'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} Interface...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'user1') {
    harrySelectorBtn.classList.add('active-person')
    sathSelectorBtn.classList.remove('active-person')
  }
  if (name === 'user2') {
    sathSelectorBtn.classList.add('active-person')
    harrySelectorBtn.classList.remove('active-person')
  }

  
  chatInput.focus()
}

harrySelectorBtn.onclick = () => updateMessageSender('user1')
sathSelectorBtn.onclick = () => updateMessageSender('user2')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))
  chatMessages.innerHTML += createChatMessageElement(message)
  chatInputForm.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})