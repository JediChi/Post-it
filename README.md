# Post-it

This API allows users to create, update and edit their accounts, create posts, and comment on posts.

Base URL
The base URL for this API is "api/v1"

Data Model
This models the data of the api. It can be accessed via this link: "https://dbdesigner.page.link/TBb8qRsy2zTMj9WK7"

API Documentation
This gives more information about the API and the various endpoints: ""

API Live Link
This is the live link to the API: ""

Authentication
All API endpoints require authentication using a JSON Web Token (JWT). To authenticate, include the JWT in the Authorization header of each request

EndPoints

Endpoints
There are three resources: users, posts and comments

## USERS

POST /api/v1/users
This endpoint allows users to register a new account.

POST /api/v1/users/login
This endpoint allows users to login to their account.

GET /api/v1/users
This endpoint returns information about the authenticated user's account.

PATCH /api/v1/accounts
This endpoint allows the authenticated user to update their account information.

## POSTS

POST /api/v1/posts
This endpoint allows the authenticated user to create a new post.

PATCH /api/v1/posts/:id
This endpoint allows the authenticated user to update an existing post.

DELETE /api/v1/posts/:id
This endpoint allows the authenticated user to delete an existing post.

## COMMENTS

POST /api/v1/posts/:id/comments
This endpoint allows the authenticated user to add a comment to an existing post.

PATCH /api/v1/comments/:id
This endpoint allows the authenticated user to update an existing comment.

DELETE /api/v1/comments/:id
This endpoint allows the authenticated user to delete an existing comment.
