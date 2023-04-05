import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from '../../context';
import { Credits, Details, LoadingAnimation } from '../../components';

const People = ({ }) => {

    const router = useRouter()
    const { id } = router.query
    const [AppContext, setAppContext, openSnackbar] = useAppContext()
    const [Data, setData] = useState({ ready: false })
    useEffect(() => {
        setData({ ...Data, ready: false })
        if (router.isReady) {
            axios.get(`/api/people/${id}?language=${AppContext.language}`).then(res => {
                setData({ ...res.data, ready: true })
            }).catch(err => {
                router.push('/404')
            })
        }
    }, [id])


    return (
        <>{Data.ready ?
            <>
                {Data.details &&
                    <Details data={Data.details} />
                }
                {Data.credits &&
                    <Credits tv={Data.credits.tv} movies={Data.credits.movie} />
                }
            </>
            : <LoadingAnimation center/>
        }
        </>
    )
}

export default People