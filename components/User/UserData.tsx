import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";
import { NoImage } from "../../images";

const ProfileImg = styled('img')({
    minWidth: 100,
    aspectRatio: '9/16',
    minHeight: 100 * 16 / 9,
    objectFit: 'contain'
})

const UserData = ({ userInfo }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <ProfileImg src={userInfo.image ? userInfo.image : NoImage.src} />
            <Box>
                <Typography sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{userInfo.name}</Typography>
                <Typography>{userInfo.email}</Typography>
            </Box>
        </Box>
    )
}

export default UserData