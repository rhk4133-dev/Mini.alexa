const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const voiceBtn = document.getElementById("voiceBtn");

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi"))
        return "Hello! How can I help you?";

    if (input.includes("time"))
        return "Current time is " + new Date().toLocaleTimeString();

    if (input.includes("date"))
        return "Today's date is " + new Date().toLocaleDateString();

    return "I am a demo assistant. Real AI needs backend API.";
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const reply = getBotResponse(text);
    setTimeout(() => {
        addMessage(reply, "bot");
        speak(reply);
    }, 500);

    userInput.value = "";
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    voiceBtn.onclick = () => recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };
}