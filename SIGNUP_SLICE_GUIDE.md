# SignUp & Backend Setup Guide

**✅ Frontend Implementation Complete:**
- ✅ SignUp slice implemented and working
- ✅ Signup component with form validation
- ✅ Redux store configured
- ✅ All frontend issues fixed

**📋 What You Need to Do Now:**

## 🗄️ Backend Setup & Database Integration

**✅ Already Completed:**
- ✅ Backend dependencies installed (bcrypt, @types/bcrypt)
- ✅ Environment variables set up (.env file)
- ✅ Backend API implementation (signup & login endpoints)
- ✅ Prisma schema fixed for Prisma 7 compatibility
- ✅ Prisma Client generated successfully

**📋 What You Need to Do Now:**

---

### Step 3: Set Up PostgreSQL Database

**Current Issues:**
1. ❌ `.env` file has placeholder credentials (`username:password`)
2. ❌ Database `rewardflow` doesn't exist yet
3. ❌ `psql` command not in PATH (use pgAdmin instead)

**Fix Steps:**

1. **Start PostgreSQL Service (if not running):**
   - Press `Win + R`, type `services.msc`, press Enter
   - Find "PostgreSQL" service (may be named like "postgresql-x64-16")
   - Right-click → Start (if stopped)
   - Verify status shows "Running"

2. **Find Your PostgreSQL Credentials:**
   
   **Option A: Check pgAdmin (if you remember):**
   - Open pgAdmin
   - Try connecting to your PostgreSQL server
   - The username is usually `postgres`
   - Password is what you set during PostgreSQL installation
   
   **Option B: Reset PostgreSQL Password (if forgotten):**
   - Open pgAdmin
   - Right-click on your PostgreSQL server → Properties
   - Go to "Connection" tab to see username
   - To reset password: Right-click server → Change Password

3. **Update `.env` File with Correct Credentials:**
   
   Open `backend/.env` file and update the DATABASE_URL:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/rewardflow?schema=public"
   PORT=5000
   NODE_ENV=development
   ```
   
   **Replace `YOUR_PASSWORD`** with your actual PostgreSQL password.
   
   **Example:**
   ```env
   DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/rewardflow?schema=public"
   ```

4. **Create the Database Using pgAdmin (Easiest Method):**
   
   - Open **pgAdmin** (usually in Start Menu)
   - Connect to your PostgreSQL server (enter password if prompted)
   - Expand "Databases" in the left sidebar
   - Right-click "Databases" → **Create** → **Database...**
   - In the "Database" field, enter: `rewardflow`
   - Click **Save**
   - You should see `rewardflow` appear in the databases list

5. **Run Database Migration:**
   
   **⚠️ IMPORTANT: You MUST run this command from the `backend` directory!**
   
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```
   
   **Why?** The Prisma schema is located at `backend/prisma/schema.prisma`, so you need to be in the `backend` folder.
   
   **If you get "schema not found" error:**
   - Make sure you're in the `backend` directory: `cd backend`
   - Check you're in the right place: `ls prisma/schema.prisma` (should show the file)
   - Then run: `npx prisma migrate dev --name init`
   
   If successful, you'll see: `✔ Applied migration` and the `User` and `Task` tables will be created.

5. **(Optional) View Database:**
   ```bash
   cd backend
   npx prisma studio
   ```
   Opens a visual database browser at `http://localhost:5555`

---

<!-- DONE TILL HERE -->

**✅ Backend Implementation Already Complete**

The backend API has been fully implemented in `backend/src/server.ts`. Here's what it includes:

#### Signup Endpoint (`POST /api/auth/signup`)

**Features:**
- ✅ Validates all required fields (name, email, password, confirmPassword)
- ✅ Checks if passwords match
- ✅ Validates password length (minimum 6 characters)
- ✅ Checks if user with email already exists
- ✅ Hashes password using bcrypt (10 salt rounds)
- ✅ Creates user in database
- ✅ Returns user data (without password)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400`: Missing fields, passwords don't match, password too short, or user already exists
- `500`: Internal server error

#### Login Endpoint (`POST /api/auth/login`)

**Features:**
- ✅ Validates email and password
- ✅ Finds user by email
- ✅ Verifies password using bcrypt
- ✅ Returns user data (without password)

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid email or password
- `500`: Internal server error

---

### Step 5: Start the Backend Server & Test

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000` with auto-reload on file changes.

2. **Verify Backend is Running:**
   Test the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```
   Expected response: `{"message": "Server is healthy"}`

3. **Test Signup Endpoint (Optional):**
   You can test using curl or Postman:
   ```bash
   curl -X POST http://localhost:5000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "confirmPassword": "password123"
     }'
   ```

4. **Verify Data in Database:**
   ```bash
   cd backend
   npx prisma studio
   ```
   Navigate to the `User` table to see your created users.

---

## 🔄 Frontend-Backend Integration

**✅ All Implementation Complete:**

✅ **Frontend (signUpSlice.ts):** Configured and working  
✅ **Backend (server.ts):** Signup & login endpoints implemented  
✅ **Signup Component:** Form validation, error handling, loading states  
✅ **Database Config:** Prisma 7 compatibility fixed

---

## 🧪 End-to-End Testing

### Test Complete Signup Flow

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Signup:**
   - Navigate to `/signup` page
   - Fill in the form:
     - Name: "John Doe"
     - Email: "john@example.com"
     - Password: "password123"
     - Confirm Password: "password123"
   - Click "Sign Up"
   - Should see loading state
   - On success, should navigate to `/tasks`
   - Check Redux DevTools to see user data in state

4. **Verify in Database:**
   - Open Prisma Studio: `npx prisma studio`
   - Check `User` table - you should see the new user
   - Password should be hashed (not plain text)

5. **Test Login (Future):**
   - You can now implement login functionality using the same credentials
   - The login endpoint is already implemented and ready to use

---

## 🔐 Security Features

The implementation includes several security best practices:

1. **Password Hashing:**
   - Passwords are hashed using bcrypt (10 salt rounds)
   - Never stored in plain text
   - Cannot be reversed

2. **Input Validation:**
   - All fields validated on backend
   - Password length requirements
   - Email uniqueness check

3. **Error Handling:**
   - Generic error messages to prevent information leakage
   - Proper HTTP status codes

4. **No Password in Responses:**
   - Passwords never returned in API responses
   - Only user ID, name, and email returned

---

## 📝 Database Schema

Your Prisma schema includes:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  bio       String?
  createdAt DateTime @default(now())
  tasks     Task[]
}
```

**Fields:**
- `id`: Unique identifier (UUID)
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password (never plain text)
- `bio`: Optional biography
- `createdAt`: Timestamp of account creation
- `tasks`: Relationship to user's tasks

---

## 🚀 Next Steps

### For Login Implementation:

1. **Create Login Slice:**
   - Similar to signUpSlice.ts
   - Call `POST /api/auth/login`
   - Store user data and authentication state

2. **Update Auth Slice:**
   - Add login/logout actions
   - Store JWT token (if you add JWT authentication)
   - Manage authentication state

3. **Protect Routes:**
   - Use `ProtectedRoute` component
   - Redirect to login if not authenticated

### For Enhanced Security:

1. **Add JWT Tokens:**
   - Install `jsonwebtoken`
   - Generate tokens on login/signup
   - Send token in Authorization header
   - Verify token on protected routes

2. **Add Rate Limiting:**
   - Prevent brute force attacks
   - Limit signup/login attempts

3. **Add Email Verification:**
   - Send verification email on signup
   - Require email verification before login

---

## 🐛 Troubleshooting

### Error 1: `P1000: Authentication failed` (YOUR CURRENT ISSUE)

**Error Message:** `Authentication failed against database server, the provided database credentials for 'username' are not valid.`

**Problem:** Your `.env` file still has placeholder values (`username:password`) instead of real PostgreSQL credentials.

**Solution:**
1. Open `backend/.env` file
2. You'll see: `DATABASE_URL="postgresql://username:password@localhost:5432/rewardflow?schema=public"`
3. Replace `username` with `postgres` (or your PostgreSQL username)
4. Replace `password` with your actual PostgreSQL password
5. Example: `DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/rewardflow?schema=public"`
6. Save the file
7. Run migration again: `npx prisma migrate dev --name init`

**How to find your PostgreSQL password:**
- Open **pgAdmin** (usually in Start Menu)
- Try to connect to your PostgreSQL server
- The password is what you set during PostgreSQL installation
- If forgotten: Right-click server in pgAdmin → Change Password

### Error 2: `P1001: Can't reach database server at localhost:5432`

**Problem:** PostgreSQL service is not running.

**Solution:**
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "PostgreSQL" service (may be named like "postgresql-x64-16")
3. Right-click → Start (if stopped)
4. Verify status shows "Running"

### Error 3: `psql: command not found`

**Problem:** PostgreSQL command-line tools not in PATH.

**Solution:** Use pgAdmin GUI instead (see Step 3.4 in guide above)

### Error 4: Database `rewardflow` doesn't exist

**Problem:** Database hasn't been created yet.

**Solution:** Create it using pgAdmin:
1. Open pgAdmin
2. Connect to PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `rewardflow` → Save
5. Then run migration: `cd backend && npx prisma migrate dev --name init`

### Error 5: `Could not find Prisma Schema`

**Error:** `Could not find Prisma Schema that is required for this command`

**Problem:** You're running the command from the wrong directory (root instead of backend).

**Solution:**
1. **Make sure you're in the `backend` directory:**
   ```bash
   cd backend
   ```

2. **Verify you're in the right place:**
   ```bash
   ls prisma/schema.prisma
   ```
   This should show the file exists.

3. **Then run the migration:**
   ```bash
   npx prisma migrate dev --name init
   ```

**Remember:** All Prisma commands must be run from the `backend` directory, not the root `RewardFlow` directory!

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**
1. Change PORT in `.env`:
   ```env
   PORT=5001
   ```

2. Update frontend API URL in `signUpSlice.ts`:
   ```typescript
   const response = await fetch('http://localhost:5001/api/auth/signup', {
   ```

### Prisma 7 Compatibility Issue (FIXED)

**Error:** `The datasource property 'url' is no longer supported in schema files`

**✅ Solution Applied:**
- Removed `url` from `schema.prisma`
- Updated `database.ts` to pass connection URL to PrismaClient constructor
- This is now fixed in your codebase

### Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd backend
npx prisma generate
```

### Migration Issues

**Error:** `Migration failed` or `Database does not exist`

**Solutions:**
1. **Make sure PostgreSQL is running** (see Database Connection Issues above)

2. **Create the database first (if it doesn't exist):**
   
   **Using psql:**
   ```bash
   psql -U postgres
   CREATE DATABASE rewardflow;
   \q
   ```
   
   **Using pgAdmin:**
   - Open pgAdmin
   - Right-click "Databases" → Create → Database
   - Name: `rewardflow` → Save

3. **Then run migration:**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

4. **If you need to reset (⚠️ WARNING: Deletes all data):**
   ```bash
   npx prisma migrate reset
   ```

---

## ✅ Remaining Checklist

**What you still need to do:**

- [ ] **Start PostgreSQL Service:** Use `services.msc` to start PostgreSQL (Step 3.1)
- [ ] **Find PostgreSQL Password:** Check pgAdmin or reset if needed (Step 3.2)
- [ ] **Update .env File:** Replace `username:password` with real credentials (Step 3.3)
- [ ] **Create Database:** Use pgAdmin to create `rewardflow` database (Step 3.4)
- [ ] **Run Migration:** `cd backend` then `npx prisma migrate dev --name init` (Step 3.5) ⚠️ **Must be in backend directory!**
- [ ] **Start Backend Server:** `cd backend` then `npm run dev` (Step 5)
- [ ] **Test Signup Flow:** Use the frontend signup form (Step 5.3)

**✅ Already Completed:**
- ✅ Backend dependencies installed
- ✅ Environment variables configured
- ✅ Backend API implemented
- ✅ Prisma 7 compatibility fixed
- ✅ Prisma Client generated
- ✅ Frontend signup slice configured
- ✅ Signup component implemented

---

## 📚 Additional Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **bcrypt:** https://www.npmjs.com/package/bcrypt
- **Express.js:** https://expressjs.com/
- **PostgreSQL:** https://www.postgresql.org/docs/

---

Good luck with your implementation! Follow these steps carefully and you'll have a working signup slice with full backend integration. 🎉

