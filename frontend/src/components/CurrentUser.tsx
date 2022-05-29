import {
    Box, Center, Input, Avatar, AvatarBadge, AvatarGroup, Grid, GridItem, Text, Button,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import * as AllModels from '../models/AllModels';

function CurrentUser() {
    const [user, setUser] = useState({ firstName: '' } as AllModels.User);
    const [emojis, setEmojis] = useState([] as AllModels.EmojiArr);
    const [selectedEmoji, setSelectedEmoji] = useState({} as AllModels.ApiEmoji);

    // functions and variables to deal with form input
    const [inputNameValue, setInputNameValue] = React.useState('');
    const handleChange = (event: any) => setInputNameValue(event.target.value);
    const setUserFirstName = (firstName: string) => {
        let updatedUser: AllModels.User = { ...user };
        updatedUser.firstName = inputNameValue;
        setUser(updatedUser);
    }

    // handle popover open/close state
    const { isOpen, onToggle, onClose } = useDisclosure()

    // handle emoji click
    const handleEmojiClick = async (emoji: AllModels.ApiEmoji) => {
        // TODO: a loading indicator, error handling
        onToggle();
        setSelectedEmoji(emoji);

        // if user doesn't have id, then isn't already a created user
        if (!user.hasOwnProperty('id')) {
            const createUserApiCall = await axios.post(`/user/`, user);

            // update user with api assigned id
            setUser(createUserApiCall.data);
        }

        await axios.post(`/user/current_emoji`, {
            firstName: user.firstName,
            currentEmoji: emoji.codePoint
        })

        console.log(`Set emoji ${emoji.character} for user ${user.firstName}`);
    }

    useEffect(() => {
        const getEmojis = async () => {
            let emojiApiCall = await axios.get('https://emoji-api.com/emojis', {
                params: {
                    access_key: process.env.REACT_APP_EMOJI_API_KEY
                }
            });

            setEmojis(emojiApiCall.data);
        };

        getEmojis();
    }, []); // empty array means do once on initialization

    return (
        <Center h='100%'>
            <Grid templateColumns='repeat(1, 1fr' gap={3}>
                <GridItem>
                    <Center>
                        <Avatar name={user.firstName} />
                    </Center>
                </GridItem>
                <GridItem>
                    <Center>
                        {/* either display Input for first name, or show first name */}
                        {
                            user.firstName == ''
                            &&
                            <Center>
                                <Input placeholder='First name here...' bg='white' mr={2}
                                    value={inputNameValue}
                                    onChange={handleChange}
                                />
                                <Button colorScheme='green'
                                    onClick={() => { setUserFirstName(inputNameValue) }}
                                >Confirm</Button>
                            </Center>
                        }
                        {
                            user.firstName != '' && <Text size='md'>{user.firstName}</Text>
                        }
                    </Center>
                </GridItem>
                <GridItem>
                    {/* only allow users to pick emoji after name is set */}
                    {
                        user.firstName != ''
                        &&
                        <Center>
                            <Popover
                                placement='bottom'
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <PopoverTrigger>
                                    <Button colorScheme='green' onClick={onToggle}>Set Emoji</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Choose an emoji</PopoverHeader>
                                    <PopoverBody maxH='xs' overflowY='scroll'>
                                        {
                                            emojis.map((emoji: AllModels.ApiEmoji) => {
                                                return (
                                                    <Text
                                                        key={uuidv4()} as='span'
                                                        size='xl'
                                                        m={2}
                                                        cursor='pointer'
                                                        onClick={() => { handleEmojiClick(emoji) }}
                                                    >
                                                        {emoji.character}
                                                    </Text>
                                                )
                                            })
                                        }
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Center>
                    }
                </GridItem>
            </Grid>
        </Center>
    )
}

export default CurrentUser;