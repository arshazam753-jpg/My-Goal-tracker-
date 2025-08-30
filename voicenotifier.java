public class VoiceNotifier {
    public void notify(String message) {
        // Simple simulation of voice notification
        System.out.println("🔊 Voice Notification: " + message);
    }

    public static void main(String[] args) {
        VoiceNotifier notifier = new VoiceNotifier();
        notifier.notify("You have completed a goal! Keep going!");
    }
}
