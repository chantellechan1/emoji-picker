# emoji-picker
Emoji-picker with frontend UI and backend API for users to see each emoji choices for other users and choose their own emoji.  

## Project Summary
This project allows users to set their name and emoji for those on their team to see. In the left pane on the frontend, users can set their username and emoji. On the right pane, there is a refresh button and a list that displays all users on their team (we simulate multiple users in different browser tabs). The backend API handles user creation, user emoji setting, getting the current user's emoji, and getting all users.
  
![screenshot of frontend](https://github.com/chantellechan1/emoji-picker/blob/main/docs/frontend.png)
  
Challenges were encounted during this project on both the frotend and backend parts of the project. On the frontend, more time than expected was spent setting up the project and development environment, due to an issue with the Ubuntu snap version of node/npm. Additionally, the popover toggling has a notable delayed effect, as efforts to programatically close the popover on emoji selection were implemented but not perfected due to time contraints. On the backend, project setup was relatively smooth, though due to time contraints, error catching/handling and data integrity (ensuring no duplicate users) were neglected. Along with the list of extension ideas presented under [Rough Notes](#markdown-header-rough-notes), this would be an area of opportunity for extending the project. 

## Backend 
This directory holds the backend API for the emoji-picker project.  

### Get Started
Run this list of commands to install necesary dependencies and start a dev server.
1. `cd backend`
2. `npm install`
3. `npm run build`
4. `npm start`

## Frontend
This directory holds the frontend UI for the emoji-picker project.  

### Get Started
Run this list of commands to install necesary dependencies and start a dev server.
1. `cd frontend`
2. `npm install`
4. `npm start`

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
    - use String.fromCodePoint(`0x${code_point_from_api}) to convert between emoji char and unicode codepoint
4. 04:00 - frontend
    - note that create-react-app has trouble with snap versions of node/npm
        - [see issue here](https://github.com/facebook/create-react-app/issues/12253)
        - resolved issue by using yarn to run create-react-app with typescript template flag
        - from project root
            - `npm install -g yarn`
            -  `yarn set version berry`
            - `sudo yarn create react-app frontend --template typescript` 
            - `sudo mkdir ./frontend/node_modules/.cache`
            - `sudo chmod ugo+rwx node_modules/.cache/`
            - `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
                - followed [this issue](https://github.com/facebook/create-react-app/issues/7612)
            - finally was able to `npm start` or `yarn start`
    - use chakra UI for grid
    - used https://emoji-api.com/emojis api to GET emojis
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
