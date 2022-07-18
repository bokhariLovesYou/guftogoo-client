export const Schema__Form__CreateAccount = {
  fields: [
    {
      group: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          element: `input`,
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
          element: `input`,
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
      label: "Username",
      name: "username",
      type: "text",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Username is required`,
        },
        pattern: {
          value: /^\S*$/,
          message: `Must only be characters`,
        },
      },
    },
    {
      label: "Email address",
      name: "email",
      type: "email",
      element: `input`,
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
      element: `input`,
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

export const Schema__Form__Login = {
  fields: [
    {
      label: "Email address",
      name: "email",
      type: "email",
      element: `input`,
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
      element: `input`,
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
    title: `Sign in`,
    type: `submit`,
    variant: `primary`,
    className: `w-full`,
  },
  helpLinkAboveButton: {
    title: `Forgot your password?`,
    destination: `#`,
  },
  helpLinkBelowButton: {
    title: `Don't have an account? Create an account for free!`,
    destination: `/create-account`,
  },
};

export const Schema__Form__Profile = {
  fields: [
    {
      group: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          element: `input`,
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
          element: `input`,
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
      label: "Profile Tagline",
      name: "profileTagline",
      type: "textarea",
      element: `textarea`,
      minRows: 3,
      maxRows: 6,
    },
    {
      label: "Profile Bio",
      name: "profileBio",
      type: "textarea",
      element: `textarea`,
      minRows: 4,
      maxRows: 6,
    },
  ],
  button: {
    title: `Update`,
    type: `submit`,
    variant: `primary`,
    className: ``,
  },
  helpLinkAboveButton: {
    title: null,
    destination: null,
  },
  helpLinkBelowButton: {
    title: null,
    destination: null,
  },
};

export const Schema__TrendingTopics = [
  {
    title: "JavaScript",
    destination: "#",
  },
  {
    title: "Web Development",
    destination: "#",
  },
  {
    title: "Beginner",
    destination: "#",
  },
  {
    title: "React",
    destination: "#",
  },
  {
    title: "Programming",
    destination: "#",
  },
  {
    title: "Python",
    destination: "#",
  },
];

export const Schema__TrendingIndustries = [
  {
    title: "Tech",
    destination: "#",
  },
  {
    title: "Sales",
    destination: "#",
  },
  {
    title: "Product",
    destination: "#",
  },
  {
    title: "Human Resource",
    destination: "#",
  },
  {
    title: "Banking/Finance",
    destination: "#",
  },
];
