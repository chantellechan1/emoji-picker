# emoji-picker


## backend 
### how to run
```
cd backend
npm install
npm run build
npm start
```

## frontend
- use chakra UI for grid
- used https://emoji-api.com/emojis api to GET emojis
- use String.fromCodePoint(`0x${code_point_from_api}) to display emoji

## worklog
1. 00:10 - set up vm, install node, set up local git
    - installed node/npx/npm with `sudo snap install node --channel=18/stable --classic`
2. 00:30 - exploration and discovery
    - api for unicode emojis
    - thought about data structure
3. 02:00 - backend
    - set up backend project: [following setup guide](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
        - `npm install --save express dotenv`
        - `npm install -D typescript @types/express @types/node`
        - `npx tsc --init`
4. 03:30 - frontend
5. 04:00 - documentation


## scratch pad
Extension Ideas:
- UI change: group emojis by type
- users can see other user's emoji picks, do refresh on certain interval?
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
