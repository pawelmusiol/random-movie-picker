import { useState } from "react";
import { Pagination } from "@mui/material"
import { Box } from '@mui/material'

const ResultPagination = ({ page = 1, totalPages = 1, changePage }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2}}>
            <Pagination count={totalPages} page={page} onChange={changePage} size='large' />
        </Box>
    )
}

export default ResultPagination