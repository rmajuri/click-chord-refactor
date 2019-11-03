import React, { useState } from 'react'
import styles from './synth-texture-changer.module.css'
import { Popper, Typography, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        color: `var(--blue)`,
        border: `1px solid var(--blue)`,
        fontFamily: `var(--header-font)`,
        background: `var(--yellow)`,
        marginBottom: `1rem`,
        '&:hover': {
            backgroundColor: `var(--orange)`,
            cursor: `pointer`
        }
    },
    secondaryButton: {
        backgroundColor: `var(--yellow)`,
        fontFamily: `var(--secondary-font)`,
        color: `var(--blue)`,
        padding: `.25rem`,
        border: `1px solid var(--blue)`,
        cursor: `pointer`,
        borderRadius: `3px`,
        '&:hover': {
            backgroundColor: `var(--orange)`,
        }
    }
})

const TextureChanger = ({ handleTextureClick }) => {
    const [anchorEl, setAnhorEl] = useState(null)

    const classes = useStyles()

    const open = Boolean(anchorEl)

    const handleSynthTextureButtonClick = e => {
        if (!anchorEl) {
            setAnhorEl(e.currentTarget)
        } else {
            setAnhorEl(null)
        }
    }
    return (
        <div className={styles.synthTextureButtonArea}>
            <Button
                type="button"
                aria-describedby={'Synth Texture Change Button'}
                className={[styles.synthTextureButton, classes.root].join(' ')}
                onClick={handleSynthTextureButtonClick}
            ><Typography>Change Synth Texture</Typography></Button>
            <Popper
                id={'synthTextureChanger'}
                open={open}
                anchorEl={anchorEl}
                transition
                placement='bottom'
            >
                <Paper className={styles.textureOptionContainer}>
                    <Button
                        className={classes.secondaryButton}
                        type="button"
                        onClick={() => handleTextureClick('Synth')}
                    >
                        <Typography>
                            Synth
                        </Typography>
                    </Button>
                    <Button
                        className={classes.secondaryButton}
                        type="button"
                        onClick={() => handleTextureClick('AMSynth')}
                    >
                        <Typography>
                            AM Synth
                        </Typography>
                    </Button>
                    <Button
                        className={classes.secondaryButton}
                        type="button"
                        onClick={() => handleTextureClick('FMSynth')}
                    >
                        <Typography>
                            FM Synth
                        </Typography>
                    </Button>
                    <Button
                        className={classes.secondaryButton}
                        type="button"
                        onClick={() => handleTextureClick('MonoSynth')}
                    >
                        <Typography>
                            Mono Synth
                        </Typography>
                    </Button>
                </Paper>
            </Popper>
        </div>
    )
}

export default TextureChanger
