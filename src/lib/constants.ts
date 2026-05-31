const formTypes = ["signin", "signup"] as const;

type FormTypes = (typeof formTypes)[number];

type FormFields = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  switchText: string;
  switchLabel: string;
  switchHref: "/sign-up" | "/sign-in";
};

export const formContent: Record<FormTypes, FormFields> = {
  signin: {
    eyebrow: "Welcome back",
    title: "Sign in to Next Scheduler",
    description:
      "Plan posts, manage your calendar, and keep publishing on time.",
    submitLabel: "Sign in",
    switchText: "New here?",
    switchLabel: "Create an account",
    switchHref: "/sign-up",
  },
  signup: {
    eyebrow: "Start scheduling",
    title: "Create your account",
    description: "Draft posts now and schedule them to publish later.",
    submitLabel: "Sign up",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/sign-in",
  },
};
