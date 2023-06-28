import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppContext } from "../context";
import { useAppSelector } from "../redux/hooks";

const FavouriteButton = ({id, type}) => {

    const {context, setContext} = useAppContext()
    const user = useAppSelector(state => state.User)

    let addToFavourite = () => {
        if (!user.id) {
            setContext({...context, loginOpen: true})
        }
        else {
            axios.post(`/api/user/${user.id}/favourite?token=${user.token}`, {newId: id, type: type}).then(res => {
                console.log(res)
            })
        }
    }

    return (
        <Button onClick={addToFavourite}>Add To Favourite</Button>
    )
}

export default FavouriteButton