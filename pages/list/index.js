import axios from "axios"
import { useState } from 'react'
import { CreateList, ListsList } from "../../components"

const Index = () => {

    return (
        <>
            <CreateList />
            <ListsList />
        </>
    )
}

export default Index