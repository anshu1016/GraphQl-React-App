export const github = {
  baseURL: "https://api.github.com/graphql",
  username: import.meta.env.VITE_GITHUB_USERNAME, // Accessing username
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Accessing token
  },
};
