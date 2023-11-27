import { RouterButton } from "../../components/Button";

export default function SetupIndex() {
  const isSetupDone = localStorage.getItem("setup-done") == "true";

  // usually 100vh with no overflow is bad but in this case theres nothing
  // important being cut off so its okay
  // and this is the only page that uses these rules so other pages wont be affected
  return (
    <>
      <div
        style={{
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <main
          style={{
            padding: "var(--space-l)",
          }}
        >
          <h1>Welcome to WeEat!</h1>
          <p>Looking for something to eat? On a budget? Short on time?</p>
          <p>WeEat has you covered! Find places nearby based on what you are hungry for.</p>
          <p>We will pick places for you or your group to go to within whatever time you have for breakfast, lunch, or dinner.</p>
          {isSetupDone ? <RouterButton to="/preferences">Edit Preferences</RouterButton> : <RouterButton to="/preferences/categories">Get Started!</RouterButton>}
        </main>
        <img src="/weeat-welcome.svg" alt="intro" />
      </div>
    </>
  );
}
