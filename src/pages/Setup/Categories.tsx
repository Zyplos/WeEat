import { useRef, useState } from "react";
import { Button, RouterButton } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import { TextInput } from "../../components/Forms";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import localforage from "localforage";

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
  const inputRef = useRef<HTMLInputElement>();
  const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const isSetupDone = localStorage.getItem("setup-done") == "true";

  const onChangeCallback = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value;

    setFilteredCategories(() => {
      return [
        ...categories.filter((category: string) => {
          return category.toLowerCase().includes(value.toLowerCase());
        }),
        ...categories.filter((category: string) => {
          return !category.toLowerCase().includes(value.toLowerCase());
        }),
      ];
    });
  };

  async function handleClick(category: string) {
    try {
      setSelectedCategories((currentlySelected) => {
        let newSelected = [];

        if (currentlySelected.includes(category)) {
          newSelected = currentlySelected.filter((c) => c !== category);
        } else {
          newSelected = [...currentlySelected, category];
        }

        localforage.setItem("preference-categories", newSelected);
        return newSelected;
      });
    } catch (error) {
      console.error("couldn't save setting", error);
    }
  }

  return (
    <>
      <Header>
        <h1>Food Preferences</h1>
      </Header>
      <MainLayout>
        <p>Choose some categories to get started!</p>
        <TextInput onChange={onChangeCallback} inputRef={inputRef} placeholder="Search..." />

        {filteredCategories.map((category) => (
          <Button key={category} onClick={() => handleClick(category)} variant={selectedCategories.includes(category) ? "active" : undefined}>
            {category}
          </Button>
        ))}
      </MainLayout>
      <FloatingFooter>
        {!isSetupDone && (
          <RouterButton to="/preferences/transport" nospacing>
            Next
          </RouterButton>
        )}
        {isSetupDone && (
          <RouterButton to="/preferences" variant="outlined" nospacing>
            Back
          </RouterButton>
        )}
      </FloatingFooter>
    </>
  );
}
