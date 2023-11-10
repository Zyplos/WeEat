import { Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import { TextInput } from "../../components/Forms";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function CategoriesPage() {
  const categories = [
    "American",
    "Asian",
    "Bakery",
    "Barbecue",
    "Breakfast",
    "Burgers",
    "Cafe",
    "Chinese",
    "Coffee",
    "Deli",
    "Desserts",
    "Fast Food",
    "Ice Cream",
    "Italian",
    "Japanese",
    "Mexican",
    "Pizza",
    "Sandwiches",
    "Seafood",
    "Steak",
    "Sushi",
    "Thai",
    "Vegetarian",
    "Vietnamese",
  ];

  return (
    <>
      <Header>
        <h1>Food Preferences</h1>
      </Header>
      <MainLayout>
        <p>Choose some categories to get started!</p>
        <TextInput placeholder="Search..." />
        {categories.map((category) => (
          <div key={category}>
            <input type="checkbox" id={category} name={category} value={category} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined">Back</Button>
        <Button>Next</Button>
      </FloatingFooter>
    </>
  );
}
