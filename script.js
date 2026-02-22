const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const voiceBtn = document.getElementById("voiceBtn");

// Add message to chat
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple brain logic
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi"))
        return "Hello! How can I help you today?";

    if (input.includes("your name"))
        return "I am your Mini Voice Assistant.";

    if (input.includes("time"))
        return "Current time is " + new Date().toLocaleTimeString();

    if (input.includes("date"))
        return "Today's date is " + new Date().toLocaleDateString();

    if (input.includes("who made you"))
        return "I was built using HTML, CSS and JavaScript.";

    return "I am still learning. Please ask something simple.";
}

// Send message
function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");

    const reply = getBotResponse(text);
    setTimeout(() => {
        addMessage(reply, "bot");
        speak(reply);
    }, 500);

    userInput.value = "";
}

// Voice output
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Voice input
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    voiceBtn.onclick = () => {
        recognition.start();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };
} else {
    voiceBtn.style.display = "none";
}
