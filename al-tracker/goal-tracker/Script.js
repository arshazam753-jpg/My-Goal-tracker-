const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");

// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem("goals")) || [];
goals.forEach(addGoalToDOM);

// Request notification permission
if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
            alert("Notifications are disabled. You won’t get reminders.");
        }
    });
}

// Add goal
addGoalBtn.addEventListener("click", () => {
    const goalText = goalInput.value.trim();
    if (goalText === "") return;

    const goal = { text: goalText, id: Date.now() };
    goals.push(goal);
    localStorage.setItem("goals", JSON.stringify(goals));
    addGoalToDOM(goal);

    // Ask user for reminder time
    const minutes = prompt("In how many minutes should I remind you about this goal?", "1");
    if (minutes && !isNaN(minutes)) {
        scheduleReminder(goalText, Number(minutes));
    }

    goalInput.value = "";
});

// Function to add goal to DOM
function addGoalToDOM(goal) {
    const li = document.createElement("li");
    li.textContent = goal.text;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.className = "removeBtn";
    removeBtn.onclick = () => {
        goals = goals.filter(g => g.id !== goal.id);
        localStorage.setItem("goals", JSON.stringify(goals));
        li.remove();
    };
    
    li.appendChild(removeBtn);
    goalList.appendChild(li);
}

// Function to schedule notifications + voice
function scheduleReminder(goalText, minutes = 1) {
    if ("Notification" in window && Notification.permission === "granted") {
        setTimeout(() => {
            new Notification("Goal Reminder ⏰", {
                body: `Don't forget: ${goalText}`,
                icon: "icon.png"
            });

            const utterance = new SpeechSynthesisUtterance(`Reminder: ${goalText}`);
            speechSynthesis.speak(utterance);

        }, minutes * 60 * 1000);
    }
}

// Register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(() => {
        console.log("Service Worker Registered");
    });
  }
