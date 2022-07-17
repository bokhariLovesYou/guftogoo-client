export const Schema__Form__CreateAccount = {
  fields: [
    {
      group: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          validations: {
            required: {
              value: true,
              message: `First name is required`,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: `Please only enter valid alphabets`,
            },
          },
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          validations: {
            required: {
              value: true,
              message: `Last name is required`,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: `Please only enter valid alphabets`,
            },
          },
        },
      ],
    },
    {
      label: "Email address",
      name: "email",
      type: "email",
      validations: {
        required: {
          value: true,
          message: `Email address is required`,
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: `Please enter a valid email address`,
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      validations: {
        required: {
          value: true,
          message: `Password is required`,
        },
        minLength: {
          value: 10,
          message: `Must be at least 10 characters`,
        },
      },
    },
  ],
  button: {
    title: `Create Account`,
    type: `submit`,
    variant: `primary`,
    className: `w-full`,
  },
  helpLinkAboveButton: {
    title: null,
    destination: null,
  },
  helpLinkBelowButton: {
    title: `Already have an account? Sign in`,
    destination: `/create-account`,
  },
};
