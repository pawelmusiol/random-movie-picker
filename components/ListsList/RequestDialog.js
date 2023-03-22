import { Button, Dialog, Box, DialogTitle, Typography } from "@mui/material"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share"

const RequestDialog = ({ open, setOpen, link }) => {

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Send this link to your friends</DialogTitle>
            {/* <Typography variant="body1">{link}</Typography> */}
            <CopyToClipboard
                text={link}
                onCopy={() => console.log('Coppied')}>
                <Button>Copy Link</Button>
            </CopyToClipboard>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <FacebookShareButton
                    url={link}
                >
                    <FacebookIcon size={48} round />
                </FacebookShareButton>
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
                <TwitterShareButton
                    url={link}
                >
                    <TwitterIcon size={48} round />
                </TwitterShareButton>
            </Box>
        </Dialog>
    )
}

export default RequestDialog