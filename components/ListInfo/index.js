import {
    Box,
    Typography,
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    Grid,
    Button,
    IconButton
} from '@mui/material'




const ListInfo = ({ users, listInfo }) => {
    return (
        <>
            <Box>
                <Typography>{listInfo.name}</Typography>
            </Box>
            <Users users={users} />
            
        </>
    )
}

const Users = ({ users }) => {
    return (
        <Grid sx={{ display: 'flex', marginBottom: 2}} gap={1}>
            {users.map((user, i) =>
                <Card key={`user-${i}`} sx={{ display: 'flex', padding: 1, alignItems: 'center' }}>
                    <Avatar>
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography>{user.name}</Typography>
                </Card>)}
        </Grid>
    )
}




export default ListInfo