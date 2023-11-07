const preferences = JSON.parse(localStorage.getItem('preferences')) || { 
    food: [],
    time: null,
    budget: null,
    transport: null
};

function storeFood(p) {
    if (preferences.food.includes(p)) {
        // If it's already in the Map, remove it (toggle the selection)
        console.log(`${preferences.food}`);
    } else {
        // If it's not in the Map, add it
        preferences.food.push(p);
        console.log(`${preferences.food}`);
    }
    localStorage.setItem('preferences', JSON.stringify(preferences));
}


function storeTransport(p) {
    preferences.transport = p;
    console.log(`Added preference: ${preferences.transport}`);
    localStorage.setItem('preferences', JSON.stringify(preferences));
}

function storeTime(p) {
    preferences.time = p;
    console.log(`Added preference: ${preferences.time}`);
    localStorage.setItem('preferences', JSON.stringify(preferences));
}

function storeBudget(p) {
    preferences.budget = p;
    console.log(`Added preference: ${preferences.budget}`);
    localStorage.setItem('preferences', JSON.stringify(preferences));
}

function testPreferences() {
    console.log(preferences);
}