import { Box, Container, Grid, styled, Typography } from '@mui/material'
import { Element } from 'react-scroll'
import SingleList, { IListProps } from '../ListsList/SingleList'
import { useInView } from 'react-intersection-observer'
import { Keyframes } from '@emotion/react'

const MainBox = styled(Container)(({theme}) => ({
    //width: '100vw',
    minHeight: '100vh',
    //backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]:{
        paddingBottom: '20px',
        paddingTop: '20px',
    }
}))


const ExampleWrapper = styled(Grid)(({ }) => ({

    transition: '.5s',
    width: '300px',
    height: '500px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
    animation: 'openAnimation 1s infinite',
    //animationDelay: '.3s',
}))

const ExampleGrid = styled(Grid)(({ theme }) => ({
    flex: 2,
    position: 'relative',
    minHeight: '150px',
    minWidth: '400px',
    transform: 'scale(0.8)',
    marginTop: '80px',
    [theme.breakpoints.down('sm')]:{
        minHeight: '350px',
    }
}))

const exampleLists: IListProps = {
    list: {
        _id: 'example-a',
        films: [{
            _id: 'example-a-movie',
            id: 1,
            name: 'a-1',
            type: 'movie',
            addedBy: {
                _id: 'example-a-user',
                name: 'a-user',
            }
        }],
        name: 'example-list',
        private: true,
        users: [{
            _id: 'example-a-user',
            name: 'a-user',
            isAdmin: true,
            isOwner: true,
        }]

    }
}

const InformationPanel = () => {
    const { ref, inView, entry } = useInView({
        delay: 700
    });

    const setRotation = (rotation: number) => {
        return inView ? { transform: `translateX(-50%) rotate(${rotation}deg)` } : { transform: `translateX(-50%) rotate(0deg)` }
    }

    console.log(inView)
    return (
        <Element name="information-panel">
            <MainBox ref={ref}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h3' sx={{ fontSize: 'clamp(2rem, 2.5rem, 3rem)' }}>With our application you can really easy search for your favourite movies or discover new ones</Typography>
                    </Grid>
                    <ExampleGrid item xs={12} sm={6}>
                        <ExampleWrapper container sx={{ left: 'calc(50% - 100px)', top: '-55px', ...setRotation(-25) }}>
                            <SingleList list={exampleLists.list} example />
                        </ExampleWrapper>
                        <ExampleWrapper container sx={{ left: 'calc(50% + 100px)', top: '-85px', ...setRotation(25) }}>
                            <SingleList list={exampleLists.list} example />
                        </ExampleWrapper>
                        <ExampleWrapper container>
                            <SingleList list={exampleLists.list} example />
                        </ExampleWrapper>
                    </ExampleGrid>
                    <Grid item xs={12} sm={6}>
                        <Typography marginTop={10} variant='h4'>Create lists of films with your friends and get random movies from your list to watch</Typography>
                    </Grid>
                </Grid>
            </MainBox>
        </Element >
    )
}

export default InformationPanel