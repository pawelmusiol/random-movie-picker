import { Box, Button, Dialog } from '@mui/material'
import { useEffect, useState } from 'react'
import { SingleFilm } from '../'





const Picker = ({ selectedFilms, addToQueue }) => {


    const [SelectedFilm, setSelectedFilm] = useState({
        left: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } },
        main: { film: {}, sx: { transition: '.5s', transform: 'scale(1)', zIndex: 2 } },
        right: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } }
    })
    const [FilmsToChoose, setFilmsToChoose] = useState([])
    const [ButtonDisabled, setButtonDisabled] = useState(true)
    const [Picking, setPicking] = useState(false)
    const [DialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        let midFilms = selectedFilms.map(film => {
            let retFilm = []
            for (let i = 0; i < film.priority; i++) {
                retFilm.push(film)
            }
            return retFilm
        })
        let finalFilms = []
        for (let i = 0; i < midFilms.length; i++) {
            finalFilms = [...finalFilms, ...midFilms[i]]
        }
        setFilmsToChoose(finalFilms)

        if (Picking) setButtonDisabled(true)
        else if (!selectedFilms.length) setButtonDisabled(true)
        else setButtonDisabled(false)
    }, [selectedFilms, Picking])

    const getOne = () => {
        setSelectedFilm(Films => {
            return {
                left: { ...Films.left, sx: { ...Films.left.sx, transform: 'scale(.7)' } },
                main: { ...Films.left, sx: { ...Films.main.sx, transform: 'scale(1)' } },
                right: { ...Films.left, sx: { ...Films.right.sx, transform: 'scale(.7)' } }
            }
        })

        for (let i = 0; i < 60; i++) {
            setPicking(true)
            setDialogOpen(true)
            setTimeout(() => {

                if (i === 59) {
                    setPicking(false)
                    setSelectedFilm(Films => {
                        return {
                            left: { sx: { ...Films.left.sx, transform: 'scale(.5)' }, film: FilmsToChoose[Math.floor(Math.random() * FilmsToChoose.length)] },
                            main: { sx: { ...Films.main.sx, transform: 'scale(1.2)' }, film: Films.left.film },
                            right: { sx: { ...Films.right.sx, transform: 'scale(.5)' }, film: Films.main.film },
                        }
                    })
                }
                setSelectedFilm(Films => {
                    return {
                        left: { ...Films.left, film: FilmsToChoose[Math.floor(Math.random() * FilmsToChoose.length)] },
                        main: { ...Films.main, film: Films.left.film },
                        right: { ...Films.right, film: Films.main.film },
                    }
                })
            }, 100 * Math.pow(1 + i / 10, 2))
        }
    }



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button disabled={ButtonDisabled} variant='contained' onClick={getOne} sx={{ maxWidth: 'fit-content' }}>Get Movie</Button>
            <Dialog
                onClick={e => {
                    if (!['left-film', 'main-film', 'right-film'].includes(e.target.parentNode.id)) {
                        addToQueue(SelectedFilm.main.film)
                        setDialogOpen(false)
                    }
                }
                }
                open={DialogOpen}
                onClose={() => {
                    addToQueue(SelectedFilm.main.film)
                    setDialogOpen(false)
                }}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        maxHeight: '90vh',
                        minWidth: '90vw',
                        minHeight: '90vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}>
                {SelectedFilm.left.film.name &&
                    <Box sx={{ transition: '.5s', display: 'flex', flexDirection: 'row', maxHeight: '70vw' }} >
                        <SingleFilm id='left-film' noAction film={SelectedFilm.left.film} width={250} sx={SelectedFilm.left.sx} />
                        <SingleFilm id='main-film' noAction film={SelectedFilm.main.film} width={250} sx={SelectedFilm.main.sx} />
                        <SingleFilm id='right-film' noAction film={SelectedFilm.right.film} width={250} sx={SelectedFilm.right.sx} />
                    </Box>
                }
            </Dialog>
        </Box>
    )
}


export default Picker