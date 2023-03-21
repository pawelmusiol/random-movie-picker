import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share"

const RequestDialog = ({ open, setOpen, link }) => {

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Send this link to your friends</DialogTitle>
            <Typography variant="body1">{link}</Typography>
            <CopyToClipboard
                text={link}
                onCopy={() => console.log('Coppied')}>
                <Button>Copy</Button>
            </CopyToClipboard>
            <FacebookMessengerShareButton
                url={link}
                appId="616315589860344"
            >
                <FacebookMessengerIcon size={48} round />
            </FacebookMessengerShareButton>
            <WhatsappShareButton
                url={link}
            >
                <WhatsappIcon size={48} round />
            </WhatsappShareButton>
        </Dialog>
    )
}

export default RequestDialog