import MultiStepProgressBar from '.././src/GeneralStuff/ProgressBar'
import style from './MultiStepper.module.css'
import InstallerEduAndPro from '../src/InstallerStuff/InstallerEduAndPro'
import InstallerVerify from '../src/InstallerStuff/InstallerVerify'
import InstallerWorkExperience from '../src/InstallerStuff/InstallerWorkExperience'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { UserThankYouButton } from '../src/GeneralStuff/FullButtons'

const completedImg =
  'https://s3-alpha-sig.figma.com/img/0253/ee48/5385f98e8e57394e6f5df06e53e9ed23?Expires=1667779200&Signature=dmyO7phfwVYKjWc9iZ2oty7GoldA1sS~-wSw8Z0uQmMjYY4HvCpws5HNQ-KdXZ2aTm5T7btEWKp-nabxz27O~Q1Z-iMQa7W1ZNkVHxHLcaCTxWorHkEhgvWJpIlzKqDLowYo8wEZDGytGIO0QRdsXnmr0ad3QsbCI0I6fsuijzyvJVWVEx~hBKUuubhwHjqy8sAcNqFSJC4fuw8UDMCsSjIKsUM~-nBxxdy0OOEyOEv1BVJGVRUuLbASc6gPgdS~yhHlM58x08vu4brwspDhRRJj-L7qadwY~GNUFCuWNTLcoi6aVBwQOszSkxIb4n38jdP9pSq3G4R9770r~ud6iw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

export default function InstallerMultiStepperHelper () {
  const [selectedStep, setSelectedStep] = useState(1)
  const navigate = useNavigate()

  const moveStepForward = () => {
    setSelectedStep(i => {
      if (i >= 4) return i
      return i + 1
    })
  }
  const moveStepBackward = () => {
    setSelectedStep(i => {
      if (i === 0) return i
      return i - 1
    })
  }
  useEffect(() => {
    selectedStep === 4 && setTimeout(() => navigate('/'), 3000)
  }, [selectedStep])

  const RenderedStep = () => {
    switch (selectedStep) {
      case 1:
        return (
          <InstallerEduAndPro
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        )
      case 2:
        return (
          <InstallerWorkExperience
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        )
      case 3:
        return (
          <InstallerVerify
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        )
    }
  }

  return (
    <div className={`multi-step ${style.multi}`}>
      {selectedStep === 4 ? (
        <div className='flex flex-col gap-[3em] items-center justify-center'>
          <img src={completedImg} alt='completed' />
          <UserThankYouButton />
        </div>
      ) : (
        <>
          <MultiStepProgressBar currentStep={selectedStep + 1} />
          <RenderedStep />
        </>
      )}
    </div>
  )
}
