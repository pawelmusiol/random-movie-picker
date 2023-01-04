import {
    Grid,
    Avatar,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import { Delete, Favourite, Add, Movie, Person, MenuIcon, PersonAdd } from '../icons'
import { Cinema } from '../images'
import { styled } from '@mui/material/styles'
import { amber, red, grey } from '@mui/material/colors'
import * as Colors from '@mui/material/colors'

const DeleteImage = styled('img')(({ theme, color }) => ({
    backgroundColor: color ? color : 'none',
    borderRadius: 4,
    maxWidth: 32,
}))

const ListedFilms = ({ icon, list }) => {
    const [ShowMore, setShowMore] = useState(false)
    return (
        <List onMouseLeave={() => setShowMore(false)} sx={{ minWidth: '100%' }}>
            {list.map((item, i) => (
                <ListItem key={i} >
                    {(i < 3 || ShowMore) ?
                        <>
                            <ListItemAvatar>
                                <Avatar src={icon.src} sx={{ bgcolor: grey[400], padding: 0.5 }} />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                        </>
                        :
                        <>
                            {(i === 3) &&
                                <ListItemText primary={'. . .'} primaryTypographyProps={{ fontSize: 20 }} onMouseEnter={() => setShowMore(true)} />
                            }
                        </>
                    }
                </ListItem>

            ))}
        </List>
    )
}

const randomColorPicker = () => {
    const colorTypes = [
        'blue',
        'blueGrey',
        'brown',
        'common',
        'cyan',
        'deepOrange',
        'deepPurple',
        'green',
        'grey',
        'indigo',
        'lightBlue',
        'lightGreen',
        'lime',
        'orange',
        'pink',
        'purple',
        'red',
        'teal',
        'yellow']

    return Colors[colorTypes[Math.floor(Math.random() * colorTypes.length)]][500]
}

const ListedUsers = ({ icon, list }) => {
    const avatarColor = useCallback(() => randomColorPicker(), [])
    return (
        <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {list.map((item, i) => (
                <ListItem key={i} sx={{ maxWidth: 30 }} >
                    {console.log(i)}
                    <ListItemAvatar sx={{ minWidth: 0 }}>
                        <Avatar sx={{ backgroundColor: avatarColor() }}>
                            {item.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                </ListItem>
            ))}
        </List>
    )
}

const ActionMenu = ({ onDelete, onRequest, acceptRequest, isPrivate, onSwitchPrivacy }) => {
    const [AnchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>{acceptRequest ?
            <>
                <Button variant='contained' onClick={acceptRequest}>
                    <Typography sx={{ marginRight: 2 }}>Accept Request</Typography>
                    <DeleteImage src={Add.src} color='none' />
                </Button>
            </>
            :
            <>
                <IconButton>
                    <DeleteImage src={MenuIcon.src} onClick={e => setAnchorEl(e.currentTarget)} color='none' />
                </IconButton>
                <Menu
                    anchorEl={AnchorEl}
                    id='list-menu'
                    open={Boolean(AnchorEl)}
                    onClose={handleClose}
                >
                    {onDelete &&
                        <MenuItem onClick={() => { onDelete(); handleClose; }}>
                            <DeleteImage src={Delete.src} />
                            <Typography>Remove</Typography>
                        </MenuItem>
                    }
                    <MenuItem>
                        <DeleteImage src={Favourite.src} />
                        <Typography> Add To Favourite</Typography>
                    </MenuItem>
                    {!isPrivate ?
                        <>
                            <MenuItem onClick={() => { onRequest(); handleClose(); }}>
                                <DeleteImage src={PersonAdd.src} />
                                <Typography> Invite Friends</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { onSwitchPrivacy(); handleClose() }}> Switch To Private </MenuItem>
                        </>
                        :
                        <MenuItem onClick={() => { onSwitchPrivacy(); handleClose() }}>Switch To Public</MenuItem>
                    }
                </Menu>
            </>
        }
        </>
    )
}

const SingleList = ({ list, onDelete, onRequest, acceptRequest, onSwitchPrivacy }) => {
    let OwnerName = list.users.find(user => user.isOwner === true)?.name ? list.users.find(user => user.isOwner === true)?.name : 'Unknown'
    return (
        <Grid item xs={4} >
            <Card>

                <CardHeader
                    sx={{ fontSize: 24 }}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="list">
                            {OwnerName[0].toUpperCase()}
                        </Avatar>
                    }
                    title={
                        <Link href={`list/${list._id}`} >
                            <Typography sx={{ cursor: 'pointer' }}>{list.name}</Typography>
                        </Link>
                    }
                    subheader={
                        <Link href={`list/${list._id}`}>
                            <Typography sx={{ cursor: 'pointer' }}>{OwnerName.charAt(0).toUpperCase() + OwnerName.slice(1)}</Typography>
                        </Link>
                    }
                    action={<ActionMenu
                        isPrivate={list.private}
                        acceptRequest={acceptRequest}
                        onDelete={onDelete}
                        onRequest={onRequest}
                        onSwitchPrivacy={onSwitchPrivacy}
                    />}
                />
                <CardMedia component="img" image={Cinema.src} height="194" alt={list.name} />
                <CardContent>
                    <ListedUsers icon={Person} list={list.users} />
                    <ListedFilms icon={Movie} list={list.films} />
                    {/* <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onDelete}>
                            <DeleteImage src={Delete.src} />
                        </Button>
                        <Button>
                            <DeleteImage src={Favourite.src} color={amber[500]} />
                        </Button>
                    </Grid> */}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SingleList