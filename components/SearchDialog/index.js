import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { Carousel } from "..";
import { Close } from "../../icons";
import SearchBox from "./SearchBox";

const SearchDialog = ({ open, onClose }) => {
    const [Results, setResults] = useState({ ready: true })

    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <img src={Close.src} style={{ width: 32 }} onClick={onClose} />
            {Results.ready && Results.results ?
                <Carousel />
                :
                <SearchBox />
            }
        </Dialog>
    )
}

export default SearchDialog