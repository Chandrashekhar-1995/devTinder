# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //forgate password API

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - // get you the profiles of other users on platform

Status:ignore, interested, accepted, rejected