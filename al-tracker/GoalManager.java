import java.util.ArrayList;
import java.util.List;

public class GoalManager {
    private List<String> goals;

    public GoalManager() {
        goals = new ArrayList<>();
    }

    public void addGoal(String goal) {
        goals.add(goal);
        System.out.println("Added goal: " + goal);
    }

    public void showGoals() {
        System.out.println("Your Goals:");
        for (int i = 0; i < goals.size(); i++) {
            System.out.println((i+1) + ". " + goals.get(i));
        }
    }

    public void completeGoal(int index) {
        if(index > 0 && index <= goals.size()) {
            System.out.println("Completed goal: " + goals.get(index - 1));
            goals.remove(index - 1);
        } else {
            System.out.println("Invalid goal number.");
        }
    }
}
