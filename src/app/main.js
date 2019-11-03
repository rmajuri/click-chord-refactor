import React, { useState, useEffect } from 'react'
import { majorScaleChords, buildChords } from '../chords/chords'
import styles from './main.module.css'
import Tone from 'tone'
import SynthBoxContainer from '../synth-box-container/synth-box-container'
import KeyChanger from '../key-changer/key-changer'
import RhythmGrid from '../rhythm-grid/rhythm-grid'
import { Typography } from '@material-ui/core'

const App = () => {
  const [keyOptions] = useState(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
  const [currentSynthTexture, setCurrentSynthTexture] = useState('')
  const [currentKey, setCurrentKey] = useState('')
  const [currentChord, setCurrentChord] = useState('')

  useEffect(() => {
    buildChords('Synth')
    setCurrentSynthTexture('Synth')
    setCurrentKey('C')
  }, [])

  const changeTexture = synthTexture => {
    if (!currentChord && currentSynthTexture !== synthTexture) {
      buildChords(synthTexture)
      setCurrentSynthTexture(synthTexture)
    }
  }

  const handleSynthBoxClick = (chord) => {
    if (!currentChord) {
      majorScaleChords[currentKey][chord].start()
      setCurrentChord(chord)
      const chordPlaying = document.getElementById(chord)
      chordPlaying.classList.add('synthBoxPlaying')
    }

    if (currentChord === chord) {
      majorScaleChords[currentKey][chord].stop()
      setCurrentChord('')
      const chordPlaying = document.getElementById(chord)
      chordPlaying.classList.remove('synthBoxPlaying')
    }

    if (currentChord && currentChord !== chord) {
      majorScaleChords[currentKey][currentChord].stop()
      const chordPlaying = document.getElementById(currentChord)
      chordPlaying.classList.remove('synthBoxPlaying')
      majorScaleChords[currentKey][chord].start()
      const newChord = document.getElementById(chord)
      newChord.classList.add('synthBoxPlaying')
      setCurrentChord(chord)
    }
  }

  const startDrumSequencer = count => {
    const kick = new Tone.Player('./kick-deep.wav').toMaster()
    const snare = new Tone.Player('./snare-analog.wav').toMaster()
    const hat = new Tone.Player('./hihat-808.wav').toMaster()
    const crash = new Tone.Player('./crash-noise.wav').toMaster()
    let index = 0

    const repeat = () => {
      let step = index % count
      let kickInputs = document.querySelector(`#kick${step}`)
      let snareInputs = document.querySelector(`#snare${step}`)
      let hatInputs = document.querySelector(`#hat${step}`)
      let crashInputs = document.querySelector(`#crash${step}`)
      if (kickInputs.checked) {
        kick.start()
      }
      if (snareInputs.checked) {
        snare.start()
      }
      if (hatInputs.checked) {
        hat.start()
      }
      if (crashInputs.checked) {
        crash.start()
      }
      index++
    }

    Tone.Transport.scheduleRepeat(repeat, `${count}n`)
    Tone.Transport.start()
  }

  const stopDrumSequencer = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    Tone.Transport.clear()
  }

  const changeBpm = bpm => {
    Tone.Transport.bpm.value = bpm
  }

  const changedKeyHandler = direction => {
    if (currentChord) {
      majorScaleChords[currentKey][currentChord].stop()
      const chordPlaying = document.getElementById(currentChord)
      chordPlaying.className = 'synthBox'
      setCurrentChord('')
    }
    let currentKeyIndex = keyOptions.indexOf(currentKey)
    if (direction === 'up') {
      if (currentKeyIndex + 1 === keyOptions.length) {
        setCurrentKey('C')
      } else {
        setCurrentKey(keyOptions[currentKeyIndex + 1])
      }
    } else {
      if (currentKeyIndex - 1 < 0) {
        setCurrentKey('B')
      } else {
        setCurrentKey(keyOptions[currentKeyIndex - 1])
      }
    }
  }

  let synthChords
  if (Object.keys(majorScaleChords).length) {
    synthChords = Object.keys(majorScaleChords[currentKey])
  }

  return Object.keys(majorScaleChords).length ? (
    <div className={styles.app}>
      <header>
        <Typography>
          <h1 className={styles.appHeader}>CLICK-CHORD</h1>
        </Typography>
      </header>

      <RhythmGrid handleTextureClick={changeTexture} />

      <div className={styles.appContainerCenter}>

        <KeyChanger
          changedKeyHandler={changedKeyHandler}
          currentKey={currentKey}
        />

        <SynthBoxContainer
          synthChords={synthChords}
          handleSynthBoxClick={handleSynthBoxClick}
        />

      </div>

    </div >
  ) : null
}

export default App
