# EVS Small Engine Repair Site

A custom full stack application based on the EVS Small Engine Repair Shop.

### Tech Stack / Features
* **Frontend:** Clean HTML5, CSS3, and JavaScript (Fetch API) with a minimal white and blue website design.
* **Backend:** Node.js with Express.js architecture (MVC Pattern).
* **Database:** PostgreSQL for robust data persistence.
* **Security:** Secure JWT (JSON Web Tokens) user sessions and `bcrypt` password hashing.

### Required Packages
To run this project, the following dependencies are required:
* `express` - Fast, unopinionated minimalist web framework for Node.js.
* `pg` - Non-blocking PostgreSQL client for Node.js.
* `bcrypt` - Library to help hash admin passwords securely.
* `jsonwebtoken` - Implementation of JSON Web Tokens for protecting admin routes.
* `dotenv` - Zero-dependency module that loads environment variables from a `.env` file.

## Installation & Setup
### Clone or Open the Project Directory:

``` Bash
cd evs-small-engine-repair
```

### Install Dependencies:
##### Run the following command in your terminal to download the required packages listed in package.json:

``` Bash
npm install
```

### Configure Environment Variables:
Create a .env file in the root directory of the project and define your environment configurations:

``` Text
PORT=8000
JWT_SECRET=your_super_secret_jwt_key
```
**Note: Ensure your database connection settings are configured inside config/db.js.**

### Initialize Database Tables:
Ensure your PostgreSQL instance contains the repairs and admin_credentials tables with the appropriate column mappings (e.g., username and password_hash).

### Start the Server:

``` Bash
node server.js
```

#### The application will be accessible locally at: http://localhost:8000

**Website Video Breakdown - Release Date: June 22 2026. View it at: [Norrie Builds YT Channel](https://www.youtube.com/@NorrieBuilds)**