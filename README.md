# Dumsor Tracker 💡

### About

We're building this project to track the pattern of power outages across the country.

### Stack

The project is built using the following technologies:

### Frontend

Next.js: A React framework for building server-side rendered and statically generated web applications.
TypeScript: A statically typed superset of JavaScript that adds type annotations to the language.

### Backend

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express: A fast, unopinionated, minimalist web framework for Node.js.

### Database

[To be determined based on project requirements]

### App Flow

- Authentication: The application will require authentication. Users can view data without creating an account, but will have to create one to post data.
- When your power gets cut off, simply visit the app, and provide the following details:
  - Your location
  - Power Status: Do you have light or not?
 
### Setting Up:
- To set up. you'll need to generate a URL and a key from supabase.
- After acquiring that, store them in an `.env.local` file.
- add this as well: `NEXT_PUBLIC_API_BASE_URL = http:/localhost:3000/`
- Install all dependencies, and you're good to go!

## Contributing

Please read our [Contribution Guidelines](contributing/CONTRIBUTING.md) before contributing to the project.
