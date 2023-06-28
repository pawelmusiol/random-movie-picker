import { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material"
import { Box } from '@mui/material'

interface IProps {
    page: number,
    totalPages: number,
    changePage: (e:ChangeEvent<unknown>, page: number) => void,
}

const ResultPagination = ({ page = 1, totalPages = 1, changePage }:IProps) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2}}>
            <Pagination count={totalPages} page={page} onChange={changePage} size='large' />
        </Box>
    )
}

export default ResultPagination