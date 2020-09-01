# bnbgotit

# Config

```
cp .env.example .env
```

# HTTPie Command

- Register: http POST http://localhost:5000/api/users username=nghia1 email=nghia1@email.com password=nghia1
- Login: http --auth nghia1:nghia1 POST http://localhost:5000/api/tokens
- Logout: http DELETE http://localhost:5000/api/tokens "Authorization: Bearer Rl6pyBnX+y63Up4oTfCl5EiBSj+ItiGx"

- Get Users: http GET http://localhost:5000/api/users "Authorization: Bearer RhtQ3mk2xBLc2JF2bBpH9aJ+NLfgTm29"

-

```

```



# TODO

*BACKEND*
    + Review
    + Reservation
    + Listing Date

    + Search
        - search user
            > by name
            > by review
        - search listing
            > by name
            > by date
            > by user
            > by attr ???
        - search
        -

*FRONTEND*