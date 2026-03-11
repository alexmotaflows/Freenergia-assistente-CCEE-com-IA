import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatScreen from "./components/ChatScreen";

export default function App() {
  const [profileId, setProfileId] = useState(null);

  if (!profileId) return <WelcomeScreen onSelect={setProfileId} />;
  return <ChatScreen profileId={profileId} onReset={() => setProfileId(null)} />;
}
