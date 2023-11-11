import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

export default function BudgetPage() {
  const options = {
    "1": "$10 or less",
    "2": "$20 or less",
    "3": "$30 or less",
    "4": "$40 or less",
    "5": "$50 or less",
    "100": "$100 or less",
    "100+": "Over $100",
  };

  return (
    <>
      <Header>
        <h1>Budget</h1>
      </Header>
      <MainLayout>
        <p>How much do you want to spend?</p>
        {Object.entries(options).map(([value, label]) => (
          <div key={value}>
            <input type="radio" id={value} name="budget" value={value} />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined" nospacing>
          Back
        </Button>
        <RouterButton to="/map" nospacing>
          Next
        </RouterButton>
      </FloatingFooter>
    </>
  );
}
