import { useState, useEffect } from "react";
import { Button, Dialog, Container, Typography, DialogTitle, DialogContent } from "@mui/material";
import { Carousel, LoadingAnimation } from "..";
import { Close } from "../../icons";
import SearchBox from "./SearchBox";

interface IProps {
    open: boolean,
    onClose: () => void
}

interface IResult {
    results?: movieResult[],
    ready:boolean,
}

const SearchDialog = ({ open, onClose }: IProps) => {
    const [Results, setResults] = useState<IResult>({ ready: true })
    const [ShowMore, setShowMore] = useState(0)

    useEffect(() => {
        setResults({ ready: true })
    }, [])

    const closeAndClear = () => {
        setResults({ ready: true })
        setShowMore(0)
        onClose()
    }

    const updateResults = (data) => {
        setResults(data)
        setShowMore(0)
    }

    console.log(Results)

    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <Container maxWidth="lg">
                <DialogTitle sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> */}
                    <Typography>Search For Anything</Typography>
                    <img src={Close.src} style={{ width: 32 }} onClick={closeAndClear} />
                    {/* </Box> */}
                </DialogTitle>
                <DialogContent>
                    <SearchBox updateResults={updateResults} />
                    {Results.ready ?
                        Results.results &&
                        <>
                            <Carousel data={Results.results.slice(0, 6)} onItemClick={onClose} noArrows />
                            {/* <Carousel data={Results.results2} onItemClick={onClose} noArrows /> */}
                            {ShowMore > 0 &&
                                <Carousel data={Results.results.slice(6, 12)} onItemClick={onClose} noArrows />
                            }
                            {ShowMore > 1 &&
                                <Carousel data={Results.results.slice(12, 18)} onItemClick={onClose} noArrows />
                            }
                            {ShowMore < 2 && <Button onClick={() => setShowMore(ShowMore + 1)}>Checkout More Results</Button>}
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