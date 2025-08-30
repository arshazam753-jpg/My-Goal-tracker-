const goalList = document.getElementById('goal-list');
const newGoalInput = document.getElementById('new-goal');

let goals = [];

function addGoal() {
    const goalText = newGoalInput.value.trim();
    if (goalText === "") return alert("Please enter a goal!");

    goals.push(goalText);
    renderGoals();
    newGoalInput.value = "";
    notify(`Added goal: ${goalText}`);
}

function completeGoal(index) {
    const completedGoal = goals.splice(index, 1);
    renderGoals();
    notify(`Completed goal: ${completedGoal}`);
}

function renderGoals() {
    goalList.innerHTML = "";
    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.textContent = goal;
        const btn = document.createElement("button");
        btn.textContent = "✅";
        btn.onclick = () => completeGoal(index);
        li.appendChild(btn);
        goalList.appendChild(li);
    });
}

function notify(message) {
    // Basic voice notification
    if ("speechSynthesis" in window) {
        const utterance = new
