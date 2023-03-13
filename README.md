# Post-it

This API allows users to create, update and edit their accounts, create posts, and comment on posts.

Base URL
The base URL for this API is "api/v1"

Data Model
This models the data of the api. It can be accessed via this link: "https://dbdesigner.page.link/TBb8qRsy2zTMj9WK7"

API Documentation
This gives more information about the API and the various endpoints: "https://post-it-0uhq.onrender.com/api/v1/docs"

API Live Link
This is the live link to the API: "https://post-it-0uhq.onrender.com"

Authentication
All API endpoints require authentication using a JSON Web Token (JWT). To authenticate, include the JWT in the Authorization header of each request

Endpoints
There are three resources: users, posts and comments

## USERS

POST /api/v1/users
This endpoint allows users to register a new account.

POST /api/v1/users/login
This endpoint allows users to login to their account.

POST /api/v1/users/logout
This endpoint allows users to logout from their account.

GET /api/v1/users
This endpoint returns information about the authenticated user's account.

PATCH /api/v1/me
This endpoint allows the authenticated user to update their account information.

DELETE /api/v1/me
Soft delete was implememted on the resource. So, users can delete their accounts but it would still remain on the database.

## POSTS

POST /api/v1/posts
This endpoint allows the authenticated user to create a new post.

GET /api/v1/posts
This endpoint returns information about the authenticated user's posts.

PATCH /api/v1/posts/:id
This endpoint allows the authenticated user to update an existing post.

DELETE /api/v1/posts/:id
Soft delete was implememted on the resource. So, users can delete their posts but it would still remain on the database.

## COMMENTS

POST /api/v1/posts/:id/comments
This endpoint allows the authenticated user to add a comment to an existing post.

GET /api/v1/posts/:id/comments
This endpoint returns information about the authenticated user's comments on posts.

PATCH /api/v1/posts/comments/:id
This endpoint allows the authenticated user to update an existing comment.

DELETE /api/v1/posts/comments/:id
This endpoint allows the authenticated user to delete an existing comment.
Soft delete was implememted on the resource. So, users can delete their comments but it would still remain on the database.
