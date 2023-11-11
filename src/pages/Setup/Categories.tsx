import { useRef, useState } from "react";
import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import { TextInput } from "../../components/Forms";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

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

export default function CategoriesPage() {

  const inputRef = useRef<HTMLInputElement>()
  const [chosenCategories, changeChosenCategories] = useState(categories);

  const onChangeCallback = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value;
    
    changeChosenCategories(() => {
      return [
        ...categories.filter((category: string) => {
          return category.toLowerCase().includes(value.toLowerCase())
        }),
        ...categories.filter((category: string) => {
          return !category.toLowerCase().includes(value.toLowerCase())
        })
      ]
    }) 
  }
  
  return (
    <>
      <Header>
        <h1>Food Preferences</h1>
      </Header>
      <MainLayout>
        <p>Choose some categories to get started!</p>
        <TextInput onChange={onChangeCallback} inputRef={inputRef} placeholder="Search..." />
        {chosenCategories.map((category) => (
          <div key={category}>
            <input type="checkbox" id={category} name={category} value={category} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined" nospacing>
          Back
        </Button>
        <RouterButton to="/preferences/transport" nospacing>
          Next
        </RouterButton>
      </FloatingFooter>
    </>
  );
}
