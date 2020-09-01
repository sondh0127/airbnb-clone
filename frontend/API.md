```javascript
class API {
  constructor(endPoint, method, status, req, res) {
    this.endPoint = endPoint;
    this.method = method;
    this.status = status;
    this.req = req;
    this.res = res;
  }
}
```

# USERS

### (POST /users) Create new user

- Request:

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "password": "string",
  "birthDay": "string"
}
```

- Response: (201)

```json
{
  "status": 201,
  "message": "successful operation",
  "user": {}
}
```

- Response: (403)

```json
{
  "status": 403,
  "error": "successful operation",
  "message": {}
}
```

---

### (GET /login) Logs user into the system

- Request:

```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

- Response: (200)

```json
"Headers": {
  "X-Rate-Limit": "integer", //calls per hour allowed by the user integer
  "X-Expires-After": "string" // date in UTC when token expires string
}
```

```json
{
  "message": "successful operation"
}
```

- Response: (400)

```json
{
  "message": "Invalid username/password supplied"
}
```

---

### (GET /user/logout) Logs out current logged in user session

- Request:

```json
{}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

---

### (GET /user/reset) Send Reset password email

- Request:

```json
{
  "email": "string"
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

---

### (GET /users/<:u_id>) Get user date by user id

- Request:

```json
{
  "token": "current token"
  // checking current user => return addition infos if current user id == user_id
  // what are addition infos:
}
```

- Response: (200)

```json
{
  "message": "successful operation",
  "user": {
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "birthDay": "string",
    "other": "string"
  }
}
```

- Response: (403)

```json
{
  "message": "Invalid user email supplied"
}
```

- Response: (404)

```json
{
  "message": "User not found"
}
```

---

### (PUT /users/<:u_id>) Update user

- Request:

```json
{
  "token": "current token",
  // check allow to update user
  "user": {
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "birthDay": "string",
    "other": "string"
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation",
  "user": {
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "birthDay": "string",
    "other": "string"
  }
}
```

- Response: (400)

```json
{
  "message": "Invalid user id supplied"
}
```

- Response: (404)

```json
{
  "message": "User not found"
}
```

# LISTING

### (POST /listings) Create listing

- Request:

```json
{
  "token": "current token",
  // check allow to create listing
  "listing": {
    // get and generate from user session
    "host_id": "int",
    "host_url": "string",
    //
    "room_type": "string-enum", // entire place/private room/ shared room
    "num_guests": "int",
    "num_bedrooms": "int",
    "num_beds": "int",
    "sleeping_arrangements": [
      {
        "room_name": "string-enum", // common spaces/ bedroom{:x}
        "type_of_bed": "string-enum", // double/queen/single/sofa bed/ king/ ??How many kind that we should have
        "num_beds": "int"
      },
      {}
    ],
    "num_bathrooms": "int",
    "country": "string", // Vietnam
    "street": "string", // 84 Tran Nhan Tong
    // City voi State bi loi swap cho nhau (google map error)
    "city": "string", // Hai Ba Trung
    "state": "string" // Ha Noi
  }
}
```

- Response: (201)

```json
{
  "message": "successful operation"
}
```

- Response: (405)

```json
{
  "message": "Invalid input"
}
```

---

### (PUT /listings/<:l_id>) Update listings by id

- Request:

```json
{
  "token": "current token",
  // check allow to create listing
  "listing": {
    "...": "POST /listings",
    "latitude": "int",
    "longtitude": "int",
    "amenities": {
      "essentials": true,
      "wifi": true,
      "...": "...",
      "smoke_detector": false
    }
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

- Response: (404)

```json
{
  "message": "Listing not found"
}
```

- Response: (405)

```json
{
  "message": "Validation exception"
}
```

---

### (GET /listings/<:l_id>) Get listings by id

- Request:

```json
{
  // "token": "current token",
  "listing": {
    "id": "1",
    "__all__": "string"
    // get all the data of listing same as listing table
    // include: {images, overview, sleeping arrangements}
    // listing_price, calendar
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

- Response: (405)

```json
{
  "message": "Invalid input"
}
```

---

### (GET /listings?year=2012&guests=4) Get listings pagination

- Request:

```json
{
  // "token": "current token",
  "listing": {
    // general info
    "id": "1"
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

- Response: (400)

```json
{
  "message": "Invalid input"
}
```

---

### (GET /listings/users/<:u_id>) Get all listing by user

- Request:

```json
{
  "token": "current token",
  "listings": {
    // general info about listings
    "111": {},
    "222": {}
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

---

# REVIEW

### (POST /reviews) Create new review

- Request:

```json
{
  "token": "current token",
  // need booking before review
  "reviews": {
    "review_info": "data"
  }
}
```

- Response: (201)

```json
{
  "message": "successful operation"
}
```

- Response: (405)

```json
{
  "message": "Invalid input value"
}
```

### (GET /reviews/users/<:u_id>) Get all reviews by user

- Request:

```json
{
  "token": "current token",
  "reviews": {
    // general info about listings
    "123": {},
    "124": {}
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

- Response: (400)

```json
{
  "message": "Invalid input value"
}
```

---

### (GET /reviews/listings/<:l_id>) Get all reviews for listing

- Request:

```json
{
  "token": "current token",
  "reviews": {
    // general info about listings
    "123": {},
    "124": {}
  }
}
```

- Response: (200)

```json
{
  "message": "successful operation"
}
```

- Response: (400)

```json
{
  "message": "Invalid input value"
}
```

# DATE

### (GET /dates/listings/<:l_id>) Get calendar days, with availability and price of listing

---

### (PUT /dates/listings/<:l_id>/price) Set price for a day

---

### (PUT /dates/listings/<:l_id>/availability) Set availability for day

# Reservations

---

### (POST /reservations) Submit a new reservation

---

### (GET /reservations/<:r_id>) Get a reservation by id

---

### (PUT /reservations/<:r_id>) Update a reservation

---

### (DELETE /reservations/<:r_id>) Delete a reservation by id

---

### (GET /reservations/users/<:u_id>) Get reservations by users

---

### (GET /reservations/listings/<:l_id>) Get reservations by listings

---

# TODO

- Update listing image
