# emoji-picker
Emoji-picker with frontend UI and backend API for users to see each emoji choices for other users and choose their own emoji.  

## backend 
This directory holds the backend API for the emoji-picker project.  

### Get Started
Run this list of commands to install necesary dependencies and start a dev server.
1. `cd backend`
2. `npm install`
3. `npm run build`
4. `npm start`

## frontend
This directory holds the frontend UI for the emoji-picker project.
- use chakra UI for grid
- used https://emoji-api.com/emojis api to GET emojis
- use String.fromCodePoint(`0x${code_point_from_api}) to display emoji

## worklog
1. 00:10 - set up vm, install node, set up local git
    - installed node/npx/npm with `sudo snap install node --channel=18/stable --classic`
2. 00:30 - exploration and discovery
    - [api for unicode emojis](https://emoji-api.com/emojis) identified
    - thought about data structure
3. 02:30 - backend
    - set up backend project: loosely following [setup guide](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
        - `npm install --save express dotenv`
        - `npm install -D typescript @types/express @types/node`
        - `npx tsc --init`
4. 03:45 - frontend
    - note that create-react-app has trouble with snap versions of node/npm
        - [see issue here](https://github.com/facebook/create-react-app/issues/12253)
        - resolved issue by using yarn to run create-react-app with typescript template flag
        - from project root
            - `npm install -g yarn`
            -  `yarn set version berry`
            - `sudo yarn create react-app frontend --template typescript` 
            -  `sudo mkdir ./frontend/node_modules/.cache`
            - create file in `./frontend/node_modules/.cache` called `.eslintcache`
            - `sudo chmod ugo+rwx node_modules/.cache/.eslintcache`
5. 04:30 - documentation


## Rough Notes
Extension Ideas:
- UI change: group emojis by type
- users can see other user's emoji picks, do refresh on certain interval?
- refactor API to refer to users by id instead of by firstName
- db extension:
    - set up sqlite db, use https://sequelize.org/
    - set up models for data structures
  
Project
- Team emoji picker
    - Script to seed usernames, create promises for list of users, use allSettled?
    - UI extension idea:
        - Automatic refresh/update for other team member’s emojis
    - DB extension idea:
        - Move from sqlite in-memory/ file-based db to https://aws.amazon.com/rds/
        - Use sequelize: https://sequelize.org/  
- API
    - Can be a lambda function, or just spin up a VM
- Data Structure:
    - USERS
        - userID INDEX
        - firstName STRING/VARCHAR
        - selectedEmoji INT (storing the selected codePoint)
