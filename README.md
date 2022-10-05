# Form Builder
[![form-builder-ci](https://github.com/BennAjax/form-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/BennAjax/form-builder/actions/workflows/ci.yml)

1. Frontend  
1. Backend


### Disclaimer
Due to the short time frame of the task, i wasnt able to write a complete test of the entire project, I had to go for speed in order to complete the project

&nbsp;
### Run locally

1. Clone this repository
1. Navigate into the respective folders(frontend and backend) dependencies and install dependencies
1. For backend, check the env.example file and provide necessary environment variables
1. The frontend assumes the backend is running on `http://localhost:4000`, however this can at `frontend/src/index.js'
1. The frontend runs on `http://localhost:4000` by default

### Technology stack
## Frontend
- Create React App
- Tailwind CSS
- React Router
- Axios

## Backend
- Architecture: Clean Architecture By Robert Martin (Uncle Bob)
- Node.js (TypeScript)
- Express.js
- MongoDB 
- Mongoose
- Jest 
- Super Test


&nbsp;
### Running Tests

To run tests, add .env from .env.example, install modules and  run the following command

```
  npm run test
```


