interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person;
}

let user = {
    firstName: "Jane",
    lastName: "Doe"
};

document.body.innerHTML = greeter(user);