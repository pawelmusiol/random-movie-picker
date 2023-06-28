import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from '../../context';
import { Credits, Details, LoadingAnimation } from '../../components';

interface IData {
    credits?: {
        movie: {
            results: personCredit[],
            voteAverage: number,
        },
        tv: {
            results: personCredit[],
            voteAverage: number,
        },
    },
    details?: personDetails
    ready: boolean,
}

const People = ({ }) => {

    const router = useRouter()
    const { id } = router.query
    const { context } = useAppContext()
    const [Data, setData] = useState<IData>({ ready: false })
    useEffect(() => {
        setData({ ...Data, ready: false })
        if (router.isReady) {
            axios.get(`/api/people/${id}?language=${context.language}`).then(res => {
                console.log(res.data)
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
            : <LoadingAnimation center />
        }
        </>
    )
}

export default People