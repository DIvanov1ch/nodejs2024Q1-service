# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/DIvanov1ch/nodejs2024Q1-service.git
```

## Installing NPM modules

- Navigate to the project directory:

```bash
cd nodejs2024Q1-service/
```

- Switch to `develop` branch:

```bash
git checkout develop
```

- Install dependencies:

```bash
npm install
```

## Running application

 - Create and start containers
```
npm run docker:up
```

 - Start existing containers for a service
```
npm run docker:start
```

 - Stop running containers without removing them. They can be started again with `npm run docker:start`.
```
npm run docker:stop
```

 - Stop containers and remove containers, networks, volumes, and images created by `up`.
```
npm run docker:down
```

 - Quick overview of an image.
```
npm run docker:view:quick
```

 - Complete view of all the vulnerabilities in the image.
```
npm run docker:view:complete
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Endpoints
  * `Users` (`/user` route)
    * `GET` `/user` - get all users
    * `GET` `/user/:id` - get single user by id
    * `POST` `/user` - create user (following DTO should be used)
      `CreateUserDto`
      ```typescript
          interface CreateUserDto {
            login: string;
            password: string;
          }
      ```
    * `PUT` `/user/:id` - update user's password
      `UpdatePasswordDto` (with attributes):
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
      }
      ```
    * `DELETE` `/user/:id` - delete user

  * `Tracks` (`/track` route)
    * `GET` `/track` - get all tracks
    * `GET` `/track/:id` - get single track by id
    * `POST` `/track` - create new track
    * `PUT` `/track/:id` - update track info
    * `DELETE` `/track/:id` - delete track

  * `Artists` (`/artist` route)
    * `GET` `/artist` - get all artists
    * `GET` `/artist/:id` - get single artist by id
    * `POST` `/artist` - create new artist
    * `PUT` `/artist/:id` - update artist info
    * `DELETE` `/artist/:id` - delete album

  * `Albums` (`/album` route)
    * `GET` `/album` - get all albums
    * `GET` `/album/:id` - get single album by id
    * `POST` `/album` - create new album
    * `PUT` `/album/:id` - update album info
    * `DELETE` `/album/:id` - delete album

  * `Favorites`
    * `GET` `/favs` - get all favorites
      ```typescript
      interface FavoritesResponse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    * `POST` `/favs/track/:id` - add track to the favorites
    * `DELETE` `/favs/track/:id` - delete track from favorites
    * `POST` `/favs/album/:id` - add album to the favorites
    * `DELETE` `/favs/album/:id` - delete album from favorites
    * `POST` `/favs/artist/:id` - add artist to the favorites
    * `DELETE` `/favs/artist/:id` - delete artist from favorites

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
