import { useState, useEffect, useContext } from 'react'

import PageHeader from './AdminDashboard/PageHeader'
import { dashboardCategories } from '../Data/data'
import { FaPlusCircle } from 'react-icons/fa'

import UserAdminCategory from './AdminDashboard/UserAdminCategory'
import InternAdminCategory from './AdminDashboard/InternAdminCategory'
import InstallerAdminCategory from './AdminDashboard/InstallerAdminCategory'
import DashboardCategory from './AdminDashboard/DashboardCategory'
import { AdminContext } from './AdminDashboard/AdminSignUp'

const UserType = () => {
  const [selected, setSelected] = useState(null)
  const [userData, setUserData] = useState(null)
  const [kpiData, setKpiData] = useState(null)
  const [userTypeName, setUserTypeName] = useState(null)

  useEffect(() => {
    getSelectedCategory()

    console.log(selected)
    return () => setSelected(null)
    console.log(selected)
  }, [])

  const getSelectedCategory = categoryIdx => {
    setSelected(categoryIdx)
  }

  return (
    <>
      <PageHeader />
      <main className='container pt-[1em]'>
        <section>
          <h1 className='font-bold text-2xl my-[.5em]'>User Type</h1>
          <p>To add users, click on the add button to create more users </p>
        </section>
        <div className='mt-[2em]'>
          <UserTypeHelper
            selected={selected}
            getSelectedCategory={getSelectedCategory}
            userData={userData}
            kpiData={kpiData}
            userTypeName={userTypeName}
            setUserData={setUserData}
            setUserTypeName={setUserTypeName}
            setKpiData={setKpiData}
          />
        </div>
      </main>
    </>
  )
}

function UserTypeHelper ({
  selected,
  getSelectedCategory,
  userData,
  kpiData,
  userTypeName,
  setKpiData,
  setUserData,
  setUserTypeName
}) {
  if (selected === true) {
    return (
      <DashboardCategory
        tableData={userData}
        kpiData={kpiData}
        userTypeName={userTypeName}
      />
    )
  } else {
    return (
      <UserCategories
        setKpiData={setKpiData}
        setUserData={setUserData}
        setUserTypeName={setUserTypeName}
        getSelectedCategory={getSelectedCategory}
      />
    )
  }
}

function UserCategories ({
  getSelectedCategory,
  setUserData,
  setUserTypeName,
  setKpiData
}) {
    const { adminInfo } = useContext(AdminContext);

  var myHeaders = new Headers()
  myHeaders.append(
    'Authorization',
    `Bearer ${adminInfo.token}`
  )
  const getUserinformation = async (userType) => {
    var raw = "{\r\n    \"type\": \"Normal User\"\r\n}";
     var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }
    fetch('http://localhost:3000/api/v1/user_types', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }
  const handleClick = (userType) => {
    // getSelectedCategory(true)
    setUserTypeName(userType)
    getUserinformation(userType)
  }
  return (
    <>
      <section className='flex gap-[2em]'>
        {dashboardCategories.map((category, categoryIdx) => (
          <article key={category.id} onClick={() => {
            handleClick(category.tableValue)
          }}>
            <div className='card card--1 bg-[#fff] cursor-pointer max-w-[300px]'>
              <p className='card-description pb-[2em]'>
                {category.description}
              </p>
              <div className='py-[.3em]'>
                <img
                  src={category.image__URL}
                  className='icon'
                  alt={category.image_desc}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className='pt-[2em]'>
        <button className='text-[1rem] text-[#fff] px-[1.4em] py-[1em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] flex items-center gap-[.4em] rounded-[5px]'>
          <FaPlusCircle />
          Add User Type
        </button>
      </div>
    </>
  )
}

export default UserType
