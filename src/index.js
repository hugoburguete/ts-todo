function greeter(person) {
    return "Hello, " + person;
}
var user = {
    firstName: "Jane",
    lastName: "Doe"
};
document.body.innerHTML = greeter(user);
