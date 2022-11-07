/** @format */

import axios from 'axios'

const BASE_URL = 'https://energyhx-2.herokuapp.com/api/v1'

export const getAllCommodities = async setter => {
  try {
    const response = await fetch(`${BASE_URL}/commodities`)
    const responseJson = await response.json()
    setter && setter(false)
    return responseJson.data
  } catch (error) {
    console.error(error)
  }
}
export const getAllEnvelopes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/buildings`)
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
  }
}

export const getAllCountries = async setter => {
  try {
    const response = await fetch(`${BASE_URL}/countries`)
    const responseJson = await response.json()
    setter(false)
    return responseJson.data
  } catch (error) {
    console.error(error)
  }
}
export const getAllInterests = async setter => {
  try {
    const response = await fetch(`${BASE_URL}/interests`)
    const responseJson = await response.json()
    setter(false)
    return responseJson.data
  } catch (error) {
    console.error(error)
  }
}
export const getAllStates = async (countryName, setter) => {
  if (countryName) {
    try {
      const response = await fetch(
        `${BASE_URL}/countries/${countryName}/states`
      )
      const responseJson = await response.json()
      setter(false)
      return responseJson.data?.States_Provinces
    } catch (error) {
      console.error(error)
    }
  }
}
export const getAllUtilities = async (commodity, countryName, setter) => {
  try {
    const response = await fetch(
      `${BASE_URL}/commodities/${commodity}/countries/${countryName}/utilities`
    )
    const responseJson = await response.json()

    setter && setter(false)
    return responseJson.data
  } catch (error) {
    console.error(error)
  }
}
export const getBuildingsAndSubtypes = async setter => {
  try {
    const response = await fetch(`${BASE_URL}/buildings`)
    const responseJson = await response.json()
    setter && setter(false)
    return responseJson.data
  } catch (error) {
    console.log(error, 'error')
  }
}

export const getEnrollmentTypes = async setter => {
  try {
    const response = await fetch(`${BASE_URL}/enrollments`)
    const responseJson = await response.json()
    setter && setter(false)
    return responseJson.data
  } catch (error) {
    console.log(error, 'error')
  }
}
export const sendData = async (data, customFunc, setter) => {
  const options = {
    url: `${BASE_URL}/auth/users`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  }
  try {
    const response = await axios(options)
    setter(false)
    customFunc()
    localStorage.clear()
  } catch (error) {
    setter(false)
    return `${error.response.data.message} `
  }
}
export const urlPatternValidation = (url) => {
  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return regex.test(url);
};
export const convertToFormData = data => {
  const formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }
  return formData
}
export const createInstaller = async (data, customFunc) => {
  let formData = convertInstallerFilesToFormData(data)
  var myHeaders = new Headers()
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(
      'https://energyhx-2.herokuapp.com/api/v1/auth/installers',
      requestOptions
    )
    const responseJson = await response.json()
    if (responseJson?.statusCode === 201) {
      customFunc()
      localStorage.clear()
    } else {
      return responseJson.message
    }
  } catch (error) {
    console.log(error)
    return error
  }
}
export const createIntern = async (data, customFunc) => {
  let formData = convertInternFilesToFormData(data)
  var myHeaders = new Headers()
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(
      'https://energyhx-2.herokuapp.com/api/v1/auth/interns',
      requestOptions
    )
    const responseJson = await response.json()
    if (responseJson?.statusCode === 201) {
      customFunc()
      localStorage.clear()
    } else {
      return responseJson.message
    }
  } catch (error) {
    console.log(error)
    return error
  }
}
export const checkIfCompleted = dataObject => {
  for (let key in dataObject) {
    if (key !== 'undefined') {
      if (dataObject[key]?.length === 0) {
        return { dataNotCompleted: `${key} is not filled`, status: true }
      } else if (
        dataObject?.password?.length < 8 ||
        dataObject?.password?.length > 12
      ) {
        return {
          dataNotCompleted:
            'Password  must be longer than 8 characters and shorter than 12 characters',
          status: true
        }
      } else if (!dataObject?.email.includes('@')) { 
        return {
          dataNotCompleted:
            'Email is not Valid',
          status: true
        }
      } else if (
        dataObject?.phoneNumber?.length < 7 ||
        dataObject?.phoneNumber?.length > 17
      ) {
        return {
          dataNotCompleted:
            'Phone Number  must be longer than 7 characters and shorter than 17 characters',
          status: true
        }
      }
    }
  }
  return false
}
export const checkIfAllIsCompleted = dataObject => {
  for (let key in dataObject) {
    if (dataObject[key] === '' || dataObject[key]?.length === 0) {
      continue
    } else {
      return true
    }
  }
  return false
}

export const getUser = async (userId, adminToken) => {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${adminToken}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  try {
    const response = await fetch(
      `https://energyhx-2.herokuapp.com/api/v1/admins/unverified_users/${userId}`,
      requestOptions
    )
    const responseJson = await response.json()
    return responseJson.data
  } catch (error) {
    console.error(error)
  }
}
export function getPassportPhotograph () {
  var base64 = localStorage['passportPhotograph']
  var base64Parts = base64.split(',')
  var fileFormat = base64Parts[0].split(';')[1]
  var fileContent = base64Parts[1]
  var file = new File(
    [fileContent],
    localStorage.getItem('passportPhotographName'),
    { type: fileFormat }
  )
  return file
}
export const getQualificationDocs = element => {
  if (element !== '') {
    let base64 = localStorage.getItem(element)
    var base64Parts = base64?.split(',')
    var fileFormat = base64Parts[0]?.split(';')[1]
    var fileContent = base64Parts[1]
    console.log(fileContent)

    var file = new File([fileContent], element, {
      type: fileFormat
    })
    return file
  }
}
export const convertDataUrlToFile = fileObject => {
  const { dataUrl, name, type } = fileObject
  var byteString = atob(dataUrl.split(',')[1])
  var mimeString = dataUrl
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const filess = new Blob([ab], { type: mimeString })
  const newFile = new File([filess], name, {
    type: type,
    lastModified: new Date()
  })
  return newFile
}

export const convertInternFilesToFormData = data => {
  var formdata = new FormData()
  formdata.append('firstname', data?.firstname)
  formdata.append('lastname', data?.lastname)
  formdata.append('othername', data?.othername)
  formdata.append('email', data?.email)
  formdata.append('streetName', data?.streetName)
  formdata.append('streetNumber', data?.streetNumber)
  formdata.append('accountNumber', data?.accountNumber)
  formdata.append('sex', data?.sex)
  formdata.append('password', data?.password)
  formdata.append('city', data?.city)
  formdata.append('province', data?.province)
  formdata.append('country', data?.country)
  formdata.append('postalCode', data?.postalCode)
  formdata.append('phoneNumber', data?.phoneNumber)
  formdata.append('alternateNumber', data?.alternateNumber)

  data?.recommendations?.map(elem => {
    formdata.append('recommendations[]', elem)
  })
  data?.qualifications_docs?.map(elem => {
    formdata.append(
      'qualifications_docs[]',
      elem,
      'CourseRegistration Dada David.pdf'
    )
  })
  data?.qualification_types?.map(elem => {
    formdata.append('qualifications_types[]', elem)
  })
  data?.qualifications?.map(elem => {
    formdata.append('qualifications[]', elem)
  })
  data?.publications_details?.map(elem => {
    formdata.append('publications_details[]', elem)
  })
  data?.publications_links?.map(elem => {
    formdata.append('publications_links[]', elem)
  })
  data?.workExperience_names?.map(elem => {
    formdata.append('workExperience_names[]', elem)
  })
  data?.workExperience_roles?.map(elem => {
    formdata.append('workExperience_roles[]', elem)
  })
  data?.workExperience_startDates?.map(elem => {
    formdata.append('workExperience_startDates[]', elem)
  })
  data?.workExperience_endDates?.map(elem => {
    formdata.append('workExperience_endDates[]', elem)
  })
  data?.interests?.map(elem => {
    formdata.append('interests[]', elem)
  })
  formdata.append('passport', data?.passport)
  return formdata
}
export const convertInstallerFilesToFormData = data => {
  var formdata = new FormData()
  formdata.append('firstname', data?.firstname)
  formdata.append('lastname', data?.lastname)
  formdata.append('othername', data?.othername)
  formdata.append('email', data?.email)
  formdata.append('streetName', data?.streetName)
  formdata.append('streetNumber', data?.streetNumber)
  formdata.append('accountNumber', data?.accountNumber)
  formdata.append('sex', data?.sex)
  formdata.append('password', data?.password)
  formdata.append('enrolment_type', data?.enrolment_type)
  formdata.append('city', data?.city)
  formdata.append('province', data?.province)
  formdata.append('country', data?.country)
  formdata.append('postalCode', data?.postalCode)
  formdata.append('phoneNumber', data?.phoneNumber)
  formdata.append('alternateNumber', data?.alternateNumber)
  formdata.append('biography', data?.biography)

  data?.recommendations?.map(elem => {
    formdata.append('recommendations[]', elem)
  })
  data?.qualifications_docs?.map(elem => {
    formdata.append(
      'qualifications_docs[]',
      elem,
      'CourseRegistration Dada David.pdf'
    )
  })
  data?.qualification_types?.map(elem => {
    formdata.append('qualifications_types[]', elem)
  })
  data?.qualifications?.map(elem => {
    formdata.append('qualifications[]', elem)
  })
  data?.publications_details?.map(elem => {
    formdata.append('publications_details[]', elem)
  })
  data?.publications_links?.map(elem => {
    formdata.append('publications_links[]', elem)
  })
  data?.workExperience_names?.map(elem => {
    formdata.append('workExperience_names[]', elem)
  })
  data?.workExperience_roles?.map(elem => {
    formdata.append('workExperience_roles[]', elem)
  })
  data?.workExperience_startDates?.map(elem => {
    formdata.append('workExperience_startDates[]', elem)
  })
  data?.workExperience_endDates?.map(elem => {
    formdata.append('workExperience_endDates[]', elem)
  })
  data?.interests?.map(elem => {
    formdata.append('interests[]', elem)
  })
  formdata.append('passport', data?.passport)
  return formdata
}
