import { useState, useEffect } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@mui/icons-material'
import {  checkIfCompleted } from '../../Forms/useFetch'
import style from "../InternStuff/Edu.module.css"

const InstallerEduAndPro = ({moveForward}) => {
   const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [fileUploading, setFileUploading] = useState(false)
  const [openQualifications, setOpenQualifications] = useState('')
  const [educationalQualifications, setEducationalQualifications] = useState({
    name: '',
    file: '',
    type: 'Educational'
  })
  const [professionalQualification, setProfessionalQualification] = useState({
    name: '',
    file: '',
    type: 'Professional'
  })
  const [installerData2, setnstallerData2] = useState(
    JSON.parse(localStorage.getItem('installerData2')) ?? {
      qualifications: [],
      qualification_types: [],
      qualifications_docs: [],
      passport: ''
    }
  )
    const [passportPhotographName, setPassportPhotographName] = useState(installerData2?.passport?.name ?? '')


  useEffect(() => {
    !localStorage.getItem("installerData") && navigate("/energy-installer");
  }, []);

  // Adds the Passport Photograph File to the Local Storage
    const handleAddPassportPhotograph = (e) => {
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
    const file = e.target.files[0];
    if (file.size > 2097152) {
      alert("File is too big!");
    } else if (!fileTypes.includes(file?.type)) {
      alert("File must be of Type Jpg, Jpeg or Png");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const obj = {
          dataUrl: reader.result,
          name: file.name,
          type: file.type,
        };
        setnstallerData2({
        ...installerData2,
        passport: obj
      })
        setPassportPhotographName(file?.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Deletes the Passport Photograph from the Local Storage
  const handleDeletePassportPhotograph = () => {
    setnstallerData2({
      ...installerData2,
      passport: null
    })
    setPassportPhotographName('')
  }
  // Adds the Qualification Documents
  const handleAddQualificationDocuments = (file, type, name) => {
    
    setFileUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      const obj = {
        dataUrl: reader.result,
        name: file.name,
        type: file.type
      }
      setnstallerData2({
        ...installerData2,
        qualifications: [...installerData2.qualifications, name],
        qualification_types: [...installerData2.qualification_types, type],
        qualifications_docs: [...installerData2.qualifications_docs, obj]
      })
      setFileUploading(false)
    }
    reader.readAsDataURL(file)
  }

  // Adds the Name for the Input Field for the Educational Qualification
  const handleAddEducational = e => {
    setEducationalQualifications({
      ...educationalQualifications,
      name: e.target.value
    })
  }
  // Adds the File for the Input Field for the Educational Qualification
  const handleAddEducationalFile = e => {
   const file = e.target.files[0]

    const fileTypes = [
      "application/pdf",
      "application/doc",
      "application/docx",
    ];
    if (file.size > 2097152) {
      alert("File is too big!");
    } else if (!fileTypes.includes(file?.type)) {
      alert("File must be of Type Pdf, Doc or Docx");
    } else {
      setEducationalQualifications({
        ...educationalQualifications,
        file: e.target.files[0]
      })
      
    }
  }
  // Runs when the User Clicks the Add Button
  const handleAddEducationalData = async () => {
    const statusAll = checkIfCompleted(educationalQualifications)
    if (!statusAll.status && !fileUploading) {
      const { name, file, type } = educationalQualifications
      handleAddQualificationDocuments(file, type, name)
      setEducationalQualifications({
        name: '',
        file: '',
        type: 'Educational'
      })
      setMessage('')
      setOpenQualifications('')
    } else {
      setMessage(statusAll.dataNotCompleted)
    }
  }
  // Adds the Name for the Input Field for the Professional Qualification
  const handleAddProfessional = e => {
    setProfessionalQualification({
      ...professionalQualification,
      name: e.target.value
    })
  }
  // Adds the File for the Input Field for the Professional Qualification
  const handleAddProfessionalFile = e => {
    const file = e.target.files[0]

    const fileTypes = [
      "application/pdf",
      "application/doc",
      "application/docx",
    ];
    if (file.size > 2097152) {
      alert("File is too big!");
    } else if (!fileTypes.includes(file?.type)) {
      alert("File must be of Type Pdf, Doc or Docx");
    } else {
      setProfessionalQualification({
        ...professionalQualification,
        file: e.target.files[0]
      })
    }
  }
  // Runs when the User Clicks the Add Button
  const handleAddProfessionalData = () => {
    const statusAll = checkIfCompleted(professionalQualification)
    if (!statusAll.status && !fileUploading) {
      const { name, file, type } = professionalQualification
      handleAddQualificationDocuments(file, type, name)
      setProfessionalQualification({
        name: '',
        file: '',
        type: 'Professional'
      })
      setMessage('')
      setOpenQualifications('')
    } else {
      setMessage(statusAll.dataNotCompleted)
    }
  }
  // Removes an Element from the Qualification Array
  const handleRemoveQualificationData = name => {
    const idx = installerData2?.qualifications?.indexOf(name)
    const qualify = installerData2?.qualifications.filter(
      (item, elemIndex) => elemIndex !== idx
    )
    const qualify_docs = installerData2?.qualifications_docs.filter(
      (item, elemIndex) => elemIndex !== idx
    )
    const qualify_types = installerData2?.qualification_types.filter(
      (item, elemIndex) => elemIndex !== idx
    )
    setnstallerData2({
      ...installerData2,
      qualifications: qualify,
      qualification_types: qualify_types,
      qualifications_docs: qualify_docs
    })
  }
  // Error Message Clears every 10 Seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage('')
    }, 10000)
    return () => clearTimeout(timeoutId)
  }, [message])

  return (
    <div>
      <div className={` ${style.heading}`}>
        <h2 className={style.formOneHeading}>EDUCATIONAL & PROFESSIONAL QUALIFICATIONS</h2>
        <p className='text-[#CDCDCD] text-md'>
          Provide the needed qualifications and details needed
        </p>
      </div>
      <div className='h-[30px]'>
        {message && (
          <h2 className='mb-[1em]  text-red-500 capitalize w-full '>
            {message}
          </h2>
        )}
      </div>
      <div>
        {/* Academic Qualifications */}
        <div>
          <h3 className='text-[#CDCDCD] text-xl mt-[2em]'>
            Educational Qualifications
          </h3>

          <div className='w-[100%] md:flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 '>
            <div className='overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]'>
              {installerData2?.qualifications
                .filter(
                  (item, index) =>
                    installerData2?.qualification_types[index] === 'Educational'
                )
                ?.map((qualification, idx) => (
                  <div key={qualification}>
                    <EduKpi
                      content={qualification}
                      handleRemove={elem =>
                        handleRemoveQualificationData(elem, idx)
                      }
                    />
                  </div>
                ))}
            </div>
            <div className='w-[20%] hidden md:block   '>
              <button
                className='text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]'
                onClick={() =>
                  setOpenQualifications(prevState =>
                    prevState === 'educational' ? '' : 'educational'
                  )
                }
              >
                {openQualifications === 'educational' ? 'Close' : 'Add'}
              </button>
            </div>
          </div>
          <div className='w-[100%] block md:hidden '>
            <button
              className='text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]'
              onClick={() =>
                setOpenQualifications(prevState =>
                  prevState === 'educational' ? '' : 'educational'
                )
              }
            >
              {openQualifications === 'educational' ? 'Close' : 'Add'}
            </button>
          </div>
          {openQualifications === 'educational' && (
            <div className='md:flex items-end gap-10'>
              {/* Input Field for the Educational Qualifications Page */}
              <div>
                <label className={`${style.form4Label}`}>
                  Academic/ Educational Qualifications
                </label>
                <input
                  type='text'
                  value={educationalQualifications.name}
                  onChange={handleAddEducational}
                  placeholder='Enter qualifications'
                  className={` outline-none px-[1.5em] py-[1em] w-full md:min-w-[400px] rounded-[5px] border-2 border-[#2dad00]  text-md bg-[white]`}
                />
              </div>

              {/* File Field for the Educational Qualifications Page */}
              {educationalQualifications?.file ? (
                <div className='border-2 border-[#2DAD00] mt-[1em] min-w-[240px] text-center px-[2em] py-[1em] text-[#2DAD00] rounded-[5px]'>
                  {`${educationalQualifications.file?.name.slice(0, 15)}...`}
                </div>
              ) : (
                <FileField
                  name='middleInitial'
                  labelName='Upload Document:'
                  accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'
                  handleChange={handleAddEducationalFile}
                />
              )}

              {/* Button to Add a Educational Qualififcations */}
              <button
                className='text-[1rem] mt-[1em] w-full md:w-[20%] text-[#fff] px-[2em] py-[1em] bg-[#2DAD00] rounded-[5px]'
                onClick={handleAddEducationalData}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className='text-[#CDCDCD] text-xl mt-[2em]'>
            Professional Qualifications
          </h3>

          <div className='w-[100%] md:flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 '>
            <div className='overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]'>
              {installerData2.qualifications
                .filter(
                  (item, index) =>
                    installerData2?.qualification_types[index] === 'Professional'
                )
                ?.map((qualification, idx) => (
                  <div key={qualification}>
                    <EduKpi
                      content={qualification}
                      handleRemove={elem =>
                        handleRemoveQualificationData(elem, idx)
                      }
                    />
                  </div>
                ))}
            </div>
            <div className='w-[20%] hidden md:block   '>
              <button
                className='text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]'
                onClick={() =>
                  setOpenQualifications(prevState =>
                    prevState === 'professional' ? '' : 'professional'
                  )
                }
              >
                {openQualifications === 'professional' ? 'Close' : 'Add'}
              </button>
            </div>
          </div>
          <div className='w-[100%] block md:hidden '>
            <button
              className='text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]'
              onClick={() =>
                setOpenQualifications(prevState =>
                  prevState === 'professional' ? '' : 'professional'
                )
              }
            >
              {openQualifications === 'professional' ? 'Close' : 'Add'}
            </button>
          </div>
          {openQualifications === 'professional' && (
            <div className='md:flex items-end gap-10'>
              {/* Input Field for the Professional Qualifications Page */}

              <div>
                <label className={`${style.form4Label}`}>
                  Professional Qualification{' '}
                </label>
                <input
                  type='text'
                  value={professionalQualification.name}
                  onChange={handleAddProfessional}
                  placeholder='Enter qualifications'
                  className={` outline-none px-[1.5em] py-[1em] w-full md:min-w-[400px] rounded-[5px] border-2 border-[#2dad00] text-md bg-[white]`}
                />
              </div>

              {/* File Field for the Professional Qualifications Page */}
              {professionalQualification?.file ? (
                <div className='border-2 border-[#2DAD00] mt-[1em]  min-w-[240px] text-center px-[2em] py-[1em] text-[#2DAD00] rounded-[5px]'>
                  {`${professionalQualification.file?.name.slice(0, 15)}...`}
                </div>
              ) : (
                <FileField
                  name='middleInitial'
                  accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'
                  labelName='Upload Document:'
                  handleChange={handleAddProfessionalFile}
                />
              )}

              {/* Button to Add a Professional Qualififcations */}
              <button
                className='text-[1rem] mt-[1em] w-full md:w-[20%] text-[#fff] px-[2em] py-[1em] bg-[#2DAD00] rounded-[5px]'
                onClick={handleAddProfessionalData}
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Professional Qualifications */}

        {/* Upload Photograph */}
        <div className='w-[300px] mt-[2em]'>
          <label className={`${style.form4Label}`}>Passport Photograph</label>
          {passportPhotographName ? (
            <div className=' flex items-center justify-between border-2  border-[#2DAD00] min-w-[240px] text-center px-[2em] py-[1em] text-[#2DAD00] rounded-[5px]'>
              {`${passportPhotographName?.slice(0, 15)}...`}
              <span
                className='cursor-pointer'
                onClick={() => handleDeletePassportPhotograph()}
              >
                <CloseOutlined />
              </span>
            </div>
          ) : (
            <div className='w-[85%]'>
              <FileField
                name='passport'
                accept='image/*'
                labelName='Upload Passport'
                handleChange={handleAddPassportPhotograph}
              />
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center md:justify-start mt-[2em] md:mt-[3em]'>
        <button
          onClick={() => {
            navigate('/energy-installer')
          }}
          children='Previous'
          className='py-[1em] basis-[50%] md:basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]'
        />

        <button
          onClick={() => {
            let resp = checkIfCompleted(installerData2)
            if (resp?.status) {
              setMessage(resp?.dataNotCompleted)
            } else {
              localStorage.setItem('installerData2', JSON.stringify(installerData2))
              moveForward()
            }
          }}
          className={`py-[1em]  basis-[50%] md:basis-[18%] px-[1.4em] bg-[#2ead0065]  text-[#FFF]`}
          children='Next'
        />
      </div>
    </div>
  )
}

function FileField (props) {
  const { value, handleChange, labelName, styles, className, accept } = props
  const style = {
    color: '#2DAD00',
    width: '2em',
    height: '1em'
  }

  return (
    <div>
      <p className='text-[#2DAD00] mb-[1rem] text-center'>{props.labeller}</p>
      <label style={styles} className={`cursor-pointer  ${style.form4Label}`}>
        <div className=' border-2 border-[#2DAD00] px-[1em] py-[1em] flex gap-[.5em] justify-center items-center text-[#2DAD00] rounded-[5px]'>
          <FaCloudUploadAlt style={style} />
          {labelName}
          <input
            type='file'
            value={value}
            onChange={handleChange}
            hidden
            accept={accept}
            className={`${className}`}
          />
        </div>
      </label>
    </div>
  )
}
function EduKpi ({ content, handleRemove }) {
  return (
    <span className='py-3 px-4 bg-[#2DAD00] flex items-center gap-[1em] rounded-[5px] text-[white]'>
      {content}
      <span
        className='cursor-pointer'
        onClick={() => handleRemove && handleRemove(content)}
      >
        <CloseOutlined />
      </span>
    </span>
  )
}

export default InstallerEduAndPro
