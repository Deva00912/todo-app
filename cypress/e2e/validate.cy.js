const cy = window.cy;
beforeEach(() => {
  cy.visit("/register");
});

describe("Registration Form Validation", () => {});
const data = [
  {
    dataCy: '[data-cy="email"]',
    wrongValues: ["A", "4", "Ab44", "$#", "Abcd@1234", "abcd@1234", "ABCD1234"],
    correctValue: "abcd1234@test.com",
  },
  {
    dataCy: '[data-cy="firstName"]',
    wrongValues: ["aa32a", "A@!weh23"],
    correctValue: "Abcd",
  },
  {
    dataCy: '[data-cy="lastName"]',
    wrongValues: ["aa32a", "A@!weh23"],
    correctValue: "Abcd",
  },
  {
    dataCy: '[data-cy="password"]',
    wrongValues: ["ABC@123*#", "abc123", "aBc123", "123@*Abc", "@493*$%"],
    correctValue: "Abc@123*#",
  },
  {
    dataCy: '[data-cy="confirmPassword"]',
    wrongValues: ["ABC@123*#", "abc123", "aBc123", "123@*Abc", "@493*$%"],
    correctValue: "Abc@123*#",
  },
];
it("should validate form fields", () => {
  cy.validate(data);
});
