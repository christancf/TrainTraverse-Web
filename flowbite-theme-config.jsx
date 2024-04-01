export const trainTraverseTheme = {
  button: {
    color: {
      primary:
        "bg-primary-500 enabled:hover:bg-primary-600 focus-within:!ring-primary-300 active:!ring-primary-300 text-white focus:ring-2",
      secondary:
        "bg-secondary-500 enabled:hover:bg-secondary-600 focus-within:!ring-secondary-300 active:!ring-secondary-300 text-white focus:ring-2",
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          primary:
            "bg-gray-50 border-gray-300 text-gray-600 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-primary-400 dark:bg-primary-100 dark:focus:border-primary-500 dark:focus:ring-primary-500",
        },
      },
    },
  },
  toggleSwitch: {
    toggle: {
      base: "toggle-bg rounded-full border-none group-focus:ring-4 group-focus:ring-primary-500/25",
      checked: {
        off: "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
        color: {
          primary: "bg-primary-500 border-primary-500",
        },
      },
    },
  },
  tab: {
    tablist: {
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-1 focus:ring-primary-300 focus:outline-none",
        styles: {
          underline: {
            active: {
              on: "text-primary-600 rounded-t-lg border-b-2 border-primary-600 active dark:text-primary-500 dark:border-primary-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
      },
    },
  },
};
