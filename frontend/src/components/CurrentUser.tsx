import {
    Box, Center, Input, Avatar, AvatarBadge, AvatarGroup, Grid, GridItem, Text, Button,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// TODO: move to models folder
interface User {
    id?: number,
    firstName: string,
    currentEmoji?: string
}

interface ApiEmoji {
    slug: string,
    character: string,
    unicodeName: string,
    codePoint: string,
    group: string,
    subGroup: string
}

interface EmojiArr extends Array<ApiEmoji> {};

function CurrentUser() {
    const [user, setUser] = useState({ firstName: '' } as User);
    const [emojis, setEmojis] = useState([] as EmojiArr);

    // functions and variables to deal with form input
    const [inputNameValue, setInputNameValue] = React.useState('');
    const handleChange = (event: any) => setInputNameValue(event.target.value);
    const setUserFirstName = (firstName: string) => {
        let updatedUser: User = { ...user };
        updatedUser.firstName = inputNameValue;
        setUser(updatedUser);
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
                            <Popover preventOverflow={true} boundary='scrollParent'>
                                <PopoverTrigger>
                                    <Button colorScheme='green'>Set Emoji</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Choose an emoji</PopoverHeader>
                                    <PopoverBody>
                                        {
                                            emojis.map((emoji: ApiEmoji) => {
                                            return(
                                                <Text 
                                                    key={uuidv4()} as='span'
                                                    size='xl'
                                                    m={2}
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