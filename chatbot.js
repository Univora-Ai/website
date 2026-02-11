const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const greetingBubble = document.querySelector(".greeting-bubble");
const closeBubbleBtn = document.querySelector(".close-bubble");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Auto-show greeting bubble after 3 seconds
setTimeout(() => {
    if (!document.body.classList.contains("show-chatbot")) {
        greetingBubble.classList.add("show");
    }
}, 3000);

// Close bubble when clicked or when chat opens
if (closeBubbleBtn) {
    closeBubbleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        greetingBubble.classList.remove("show");
    });
}

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    // Use the new SVG icon for incoming messages
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="bot-icon"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    // Simulate a delay for a more natural feel
    setTimeout(() => {
        const staticResponse = "Thank you for reaching out! To get the best assistance with our advanced AI solutions, please contact our team directly at support@univoraai.com or call +233 204427073. We look forward to architecting intelligence with you.";
        messageElement.textContent = staticResponse;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 500);
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window width is > 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    greetingBubble.classList.remove("show"); // Hide bubble when chat opens
});
