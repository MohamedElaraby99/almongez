# Phone-Based Authentication Implementation

## Overview
This implementation allows users with the "USER" role to register and login using their phone number instead of email, while maintaining email-based authentication for ADMIN and SUPER_ADMIN roles.

## Key Changes Made

### 1. Database Schema Changes (`backend/models/user.model.js`)

#### Email Field
- **Before**: Required for all users, unique
- **After**: 
  - Required only for ADMIN and SUPER_ADMIN roles
  - Optional for USER role
  - Unique only when provided (sparse index)

#### Phone Number Field
- **Before**: Required for USER role, not unique
- **After**: 
  - Required and unique for USER role
  - Not required for ADMIN/SUPER_ADMIN roles

### 2. Authentication Controller Changes (`backend/controllers/user.controller.js`)

#### Registration Function
- **Role-based validation**: Different field requirements based on user role
- **USER role**: Phone number required, email optional
- **ADMIN role**: Email required
- **Duplicate checking**: Phone number uniqueness for USER, email uniqueness for ADMIN

#### Login Function
- **Flexible authentication**: Accepts either email or phone number
- **User lookup**: Searches by email or phone number based on provided identifier
- **Error messages**: Updated to be more generic ("Invalid credentials")

#### JWT Token Generation
- **Role-based payload**: Includes phone number for USER role, email for ADMIN role
- **Backward compatibility**: Includes email for USER if available

### 3. Frontend Changes

#### Login Component (`client/src/Pages/Login.jsx`)
- **Toggle functionality**: Users can switch between phone and email login
- **Validation**: Egyptian phone number format validation
- **Dynamic form**: Changes input type and placeholder based on selected method

#### Signup Component (`client/src/Pages/Signup.jsx`)
- **Role-based fields**: Different field requirements based on admin code
- **Email field**: Optional for regular users, required for admin
- **Phone field**: Required for regular users, not shown for admin
- **Validation**: Updated validation logic for role-specific requirements

### 4. Admin Controller Changes (`backend/controllers/adminUser.controller.js`)
- **Search functionality**: Now includes phone number in search
- **User creation**: Role-specific field validation and duplicate checking

## User Experience

### For Regular Users (USER role)
1. **Registration**:
   - Must provide phone number (required)
   - Email is optional
   - All other fields (governorate, stage, age) remain required

2. **Login**:
   - Can login using phone number OR email (if provided)
   - Phone number is the primary identifier
   - Toggle between phone and email login methods

### For Admin Users (ADMIN/SUPER_ADMIN role)
1. **Registration**:
   - Must provide email (required)
   - Phone number not required
   - Simplified registration process

2. **Login**:
   - Login using email only
   - Traditional email-based authentication

## Validation Rules

### Phone Number Validation
- Egyptian phone number format: `^(\+20|0)?1[0125][0-9]{8}$`
- Examples: `01234567890`, `+201234567890`, `11234567890`

### Email Validation
- Standard email format validation
- Required for admin users
- Optional for regular users

## Security Considerations

1. **Unique Constraints**: Phone numbers are unique for USER role
2. **JWT Tokens**: Include appropriate identifier based on role
3. **Password Security**: Unchanged - still uses bcrypt hashing
4. **Device Fingerprinting**: Maintained for security

## Migration Notes

### Existing Users
- Users with existing email addresses can continue using email for login
- Phone number becomes the primary identifier for new registrations
- Backward compatibility maintained

### Database Indexes
- Sparse indexes on email field to handle optional emails
- Unique index on phone number for USER role
- Existing indexes maintained for backward compatibility

## Testing

A test file (`backend/test-phone-auth.js`) has been created to verify:
1. User creation with phone number only
2. Login with phone number
3. Duplicate phone number prevention
4. Admin user creation with email
5. Admin login with email

## API Endpoints

### Registration
```
POST /user/register
```
- Accepts either email (admin) or phone number (user) based on role
- Role determined by adminCode parameter

### Login
```
POST /user/login
```
- Accepts either email or phone number in request body
- Returns JWT token with appropriate identifier

## Error Messages

### Registration Errors
- "Phone number is required for regular users"
- "Email is required for admin users"
- "Phone number already exists, please login"
- "Email already exists, please login"

### Login Errors
- "Please provide either email or phone number and password"
- "Invalid credentials"

## Future Enhancements

1. **SMS Verification**: Add phone number verification via SMS
2. **Two-Factor Authentication**: Use phone number for 2FA
3. **Phone Number Formatting**: Auto-format phone numbers
4. **International Support**: Extend to other phone number formats
