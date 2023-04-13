import { useState } from "react";
import { Box, Dialog, Container, Typography, DialogTitle, DialogContent } from "@mui/material";
import { Carousel, LoadingAnimation } from "..";
import { Close } from "../../icons";
import SearchBox from "./SearchBox";

const SearchDialog = ({ open, onClose }) => {
    const [Results, setResults] = useState({ ready: true })

    const closeAndClear = () => {
        setResults({ ready: true })
        onClose()
    }

    console.log(Results)

    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <Container maxWidth="lg">
                <DialogTitle sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {/* <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> */}
                    <Typography>Search For Anything</Typography>
                    <img src={Close.src} style={{ width: 32 }} onClick={closeAndClear} />
                    {/* </Box> */}
                </DialogTitle>
                <DialogContent>
                <SearchBox setResults={setResults} />
                {Results.ready ?
                    Results.results1 &&
                    <>
                        <Carousel data={Results.results1} onItemClick={onClose} noArrows />
                        {/* <Carousel data={Results.results2} onItemClick={onClose} noArrows /> */}
                        <Typography>Checkout More Results</Typography>
                    </>
                    :
                    <LoadingAnimation />
                }
                </DialogContent>
            </Container>
        </Dialog>
    )
}

export default SearchDialog