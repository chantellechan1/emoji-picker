import { Avatar, Flex, Grid, GridItem, Icon, IconButton, Spacer, Text } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as AllModels from '../models/AllModels';
import axios from 'axios';

function AllUsers() {
    const [allUsers, setAllUsers] = useState([] as AllModels.UserArr);

    const updateAllUsers = async () => {
        const apiCallAllUsers = await axios.get('/user/all_users');
        setAllUsers(apiCallAllUsers.data);

    }

    // load all users on inital load
    useEffect(() => {
        updateAllUsers();
    }, []);

    return (
        <React.Fragment>
            <Flex m={6}>
                <Spacer />
                <IconButton aria-label='Reload users list' icon={<RepeatIcon />} colorScheme='green' 
                    onClick={updateAllUsers}
                />
            </Flex>
            <Grid templateRows={`repeat(${allUsers.length}, 1fr)`} m={6} gap={3}>
                {
                    allUsers.map(
                        (user: AllModels.User) => <GridItem key={uuidv4()} bgColor='white' p={3}>
                            <Avatar name={user.firstName} size='xs' mr={3}/>
                            <Text as='span' mr={3}>{user.firstName}</Text>
                            <Text as='span'>{user.currentEmoji}</Text>
                        </GridItem>
                    )
                }
            </Grid>
        </React.Fragment>

    )
}

export default AllUsers;