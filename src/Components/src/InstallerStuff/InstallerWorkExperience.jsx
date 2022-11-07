/** @format */

import style from "../InternStuff/Edu.module.css";

import React, { useEffect } from "react";

import { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { checkIfCompleted } from "../../Forms/useFetch";
import EditIcon from "@mui/icons-material/Edit";

const InstallerWorkExperience = ({ moveBackward, moveForward }) => {
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("installerData2") && navigate("/installer");
  }, []);
  const [addNewPublication, setAddNewPublication] = useState(false);
  const [addNewWorkExperience, setAddNewWorkExperience] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState("");
  const [addNewRecommendation, setAddNewRecommendation] = useState(false);
  const [biographyAdded, setBiographyAdded] = useState(true);
  const addNewBiography = () => {
    setInstallerData({ ...installerData, biography: biography });
    setBiographyAdded(false);
  };
  const [message, setMessage] = useState("");
  const [installerData, setInstallerData] = useState(
    JSON.parse(localStorage.getItem("installerData3")) ?? {
      publications_details: [],
      publications_links: [],
      workExperience_names: [],
      workExperience_roles: [],
      workExperience_startDates: [],
      workExperience_endDates: [],
      recommendations: [],
      biography: "",
    }
  );
  const [biography, setBiography] = useState(installerData?.biography ?? "");
  const [currentWorkExperience, setCurrentWorkExperience] = useState({
    workExperience_names: "",
    workExperience_roles: "",
    workExperience_startDates: "",
    workExperience_endDates: "",
  });
  const [currentPublications, setCurrentPublications] = useState({
    publications_details: "",
    publications_links: "",
  });
  // Add New Experience
  const handleCreateNewExperience = () => {
    const statusAll = checkIfCompleted(currentWorkExperience);
    if (!statusAll?.status) {
      setInstallerData({
        ...installerData,
        workExperience_names: [
          ...installerData.workExperience_names,
          currentWorkExperience.workExperience_names,
        ],
        workExperience_roles: [
          ...installerData.workExperience_roles,
          currentWorkExperience.workExperience_roles,
        ],
        workExperience_startDates: [
          ...installerData.workExperience_startDates,
          currentWorkExperience.workExperience_startDates,
        ],
        workExperience_endDates: [
          ...installerData.workExperience_endDates,
          currentWorkExperience.workExperience_endDates,
        ],
      });

      setCurrentWorkExperience({
        workExperience_names: "",
        workExperience_roles: "",
        workExperience_startDates: "",
        workExperience_endDates: "",
      });
      setAddNewWorkExperience(false);
      setMessage("");
    } else {
      setMessage(statusAll.dataNotCompleted);
    }
  };

  // Add New Publications
  const handleCreateNewPublication = () => {
    const statusAll = checkIfCompleted(currentPublications);
    if (!statusAll?.status) {
      setInstallerData({
        ...installerData,
        publications_details: [
          ...installerData.publications_details,
          currentPublications.publications_details,
        ],
        publications_links: [
          ...installerData.publications_links,
          currentPublications.publications_links,
        ],
      });
      setCurrentPublications({
        publications_details: "",
        publications_links: "",
      });
      setAddNewPublication(false);
      setMessage("");
    } else {
      setMessage(statusAll.dataNotCompleted);
    }
  };
  const handleCreateNewRecommendation = () => {
    if (currentRecommendation === "" || !currentRecommendation) {
      setMessage("No Recommendations Filled");
    } else {
      setInstallerData({
        ...installerData,
        recommendations: [
          ...installerData.recommendations,
          currentRecommendation,
        ],
      });
      setCurrentRecommendation("");
      setAddNewRecommendation(false);
      setMessage("");
    }
  };
  const handleDeleteFromPublications = (name) => {
    let itemIndex = installerData.publications_details.indexOf(name);
    let details = installerData.publications_details.filter(
      (item, idx) => idx !== itemIndex
    );
    let links = installerData.publications_links.filter(
      (item, idx) => idx !== itemIndex
    );
    setInstallerData({
      ...installerData,
      publications_details: details,
      publications_links: links,
    });
  };
  const handleDeleteFromWorkExperience = (name) => {
    let itemIndex = installerData.workExperience_names.indexOf(name);
    let workName = installerData.workExperience_names.filter(
      (item, idx) => idx !== itemIndex
    );
    let roles = installerData.workExperience_roles.filter(
      (item, idx) => idx !== itemIndex
    );
    let startDate = installerData.workExperience_startDates.filter(
      (item, idx) => idx !== itemIndex
    );
    let endDate = installerData.workExperience_endDates.filter(
      (item, idx) => idx !== itemIndex
    );
    setInstallerData({
      ...installerData,
      workExperience_names: workName,
      workExperience_roles: roles,
      workExperience_startDates: startDate,
      workExperience_endDates: endDate,
    });
  };
  const handleDeleteFromRecommendations = (name) => {
    let itemIndex = installerData?.recommendations.indexOf(name);
    let recommendationTemp = installerData?.recommendations.filter(
      (item, idx) => idx !== itemIndex
    );
    setInstallerData({
      ...installerData,
      recommendations: recommendationTemp,
    });
  };
  return (
    <div>
      <div
        className={`mb-[2em] ${style.heading}`}
        style={{ marginBottom: "2em" }}>
        <p className="text-[#CDCDCD]">
          Provide the needed qualifications and details needed.
        </p>
        <div className="h-[30px]">
          {message && (
            <h2 className="mb-[1em]  text-red-500 capitalize w-full ">
              {message}
            </h2>
          )}
        </div>
      </div>
      <div>
        <div>
          <h3 className="text-[#CDCDCD] text-xl mt-[2em]">WORK EXPERIENCE </h3>
          <div className="w-[100%] md:flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 ">
            <div className="overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]">
              {installerData.workExperience_names?.map((workExperience) => (
                <div
                  key={workExperience}
                  className="py-[.5em] flex items-center justify-between px-[1.4em] rounded-[10px] bg-[#2DAD00] border-[.2px] border-[#2DAD00]  text-[#FFF]">
                  {`${workExperience?.slice(0, 4)}...`}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      handleDeleteFromWorkExperience(workExperience)
                    }>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[20%] hidden md:block   ">
              <button
                className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={() => setAddNewWorkExperience(!addNewWorkExperience)}>
                {addNewWorkExperience ? "Close" : "Add"}
              </button>
            </div>
          </div>
          <div className="w-[100%] block md:hidden ">
            <button
              className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
              onClick={() => setAddNewWorkExperience(!addNewWorkExperience)}>
              {addNewWorkExperience ? "Close" : "Add"}
            </button>
          </div>
          {addNewWorkExperience && (
            <div className="installer-work-experience">
              <div>
                <label className={`${style.form4Label}`}>
                  Name of Work engagement
                </label>
                <input
                  type="text"
                  value={currentWorkExperience?.workExperience_name}
                  onChange={(e) =>
                    setCurrentWorkExperience({
                      ...currentWorkExperience,
                      workExperience_names: e.target.value,
                    })
                  }
                  placeholder="Name of Work"
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white]`}
                />
              </div>
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>
                  Title Or Job Status
                </label>
                <input
                  type="text"
                  value={currentWorkExperience.workExperience_roles}
                  onChange={(e) =>
                    setCurrentWorkExperience({
                      ...currentWorkExperience,
                      workExperience_roles: e.target.value,
                    })
                  }
                  placeholder="Title"
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white]`}
                />
              </div>
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>Start Date</label>
                <input
                  type="date"
                  value={currentWorkExperience.workExperience_startDates}
                  onChange={(e) =>
                    setCurrentWorkExperience({
                      ...currentWorkExperience,
                      workExperience_startDates: e.target.value,
                    })
                  }
                  placeholder="Start Date"
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] text-gray-500 w-full text-md bg-[white]`}
                />
              </div>
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>End Date</label>
                <input
                  type="date"
                  value={currentWorkExperience.workExperience_endDates}
                  onChange={(e) =>
                    setCurrentWorkExperience({
                      ...currentWorkExperience,
                      workExperience_endDates: e.target.value,
                    })
                  }
                  placeholder="End Date"
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white] text-gray-500`}
                />
              </div>
              <button
                className="text-[1rem] mt-[2em] self-end text-[#fff] p-[1em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={handleCreateNewExperience}>
                Add Experience
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[#CDCDCD] text-xl mt-[2em]">
            Publications & References
          </h3>
          <div className="w-[100%] flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 ">
            <div className="overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]">
              {installerData.publications_details?.map((data) => (
                <div
                  key={data}
                  className="py-[.5em] flex items-center justify-between px-[1.4em] rounded-[10px] bg-[#2DAD00] border-[.2px] border-[#2DAD00]  text-[#FFF]">
                  {`${data?.slice(0, 4)}...`}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDeleteFromPublications(data)}>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[20%] hidden md:block   ">
              <button
                className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={() => setAddNewPublication(!addNewPublication)}>
                {addNewPublication ? "Close" : "Add"}
              </button>
            </div>
          </div>
          <div className="w-[100%] block md:hidden ">
            <button
              className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
              onClick={() => setAddNewPublication(!addNewPublication)}>
              {addNewPublication ? "Close" : "Add"}
            </button>
          </div>
          {addNewPublication && (
            <div className="installer-work-experience">
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>
                  Title of publication
                </label>
                <input
                  type="text"
                  placeholder="Title of publication"
                  value={currentPublications.publications_details}
                  onChange={(e) =>
                    setCurrentPublications({
                      ...currentPublications,
                      publications_details: e.target.value,
                    })
                  }
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white]`}
                />
              </div>
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>
                  Link to Publication
                </label>
                <input
                  type="url"
                  placeholder="Publication Link"
                  value={currentPublications.publications_links}
                  onChange={(e) =>
                    setCurrentPublications({
                      ...currentPublications,
                      publications_links: e.target.value,
                    })
                  }
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white]`}
                />
              </div>

              <button
                className="text-[1rem] mt-[2em] self-end text-[#fff] p-[1em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={handleCreateNewPublication}>
                Add Publication
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[#CDCDCD] text-xl mt-[2em]">Recommendations</h3>
          <div className="w-[100%] flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 ">
            <div className="overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]">
              {installerData.recommendations?.map((data) => (
                <div
                  key={data}
                  className="py-[.5em] flex items-center justify-between px-[1.4em] rounded-[10px] bg-[#2DAD00] border-[.2px] border-[#2DAD00]  text-[#FFF]">
                  {`${data?.slice(0, 4)}...`}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDeleteFromRecommendations(data)}>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[20%] hidden md:block   ">
              <button
                className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={() => setAddNewRecommendation(!addNewRecommendation)}>
                {addNewRecommendation ? "Close" : "Add"}
              </button>
            </div>
          </div>
          <div className="w-[100%] block md:hidden ">
            <button
              className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
              onClick={() => setAddNewRecommendation(!addNewRecommendation)}>
              {addNewRecommendation ? "Close" : "Add"}
            </button>
          </div>
          {addNewRecommendation && (
            <div className="installer-work-experience">
              <div className="mt-[2em]">
                <label className={`${style.form4Label}`}>Recommendation</label>
                <input
                  type="text"
                  placeholder="Recommendation"
                  value={currentRecommendation}
                  onChange={(e) => setCurrentRecommendation(e.target.value)}
                  className={` outline-none px-[1.5em] py-[1em] rounded-[5px] border-2 border-[#2dad00] w-full text-md bg-[white]`}
                />
              </div>

              <button
                className="text-[1rem] mt-[2em] self-end text-[#fff] p-[1em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={handleCreateNewRecommendation}>
                Add Recommendation
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[#CDCDCD] text-xl mt-[2em]">Biography</h3>
          <div className="w-[100%] flex flex-col items-end p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1em] mx-[0] bg-[white]  ">
            <div className="overflow-x-scroll mb-6 w-[100%] overflow-y-hidden flex items-end gap-2 rounded-[10px]">
              <textarea
                rows="6"
                cols="50"
                className="w-full"
                readOnly={!biographyAdded}
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
              {!biographyAdded && <EditIcon className="text-[#2DAD00]" onClick={ () => setBiographyAdded(true)} />}
            </div>
            <div className="w-[20%] hidden md:block   ">
              <button
                className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={addNewBiography}
                disabled={biography === ''}
                >
                {biographyAdded ? "Add" : "Added"}
              </button>
            </div>
            <div className="w-[100%] block md:hidden ">
              <button
                className="text-[1rem] text-[#fff] p-[.5em] bg-[#2DAD00] w-full rounded-[5px]"
                onClick={addNewBiography}
                disabled={biography === ''}
                >
                {biographyAdded ? "Add" : "Added"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-start mt-[2em] md:mt-[3em]">
          <button
            onClick={() => {
              moveBackward();
            }}
            children="Previous"
            className="py-[1em] basis-[50%] md:basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
          />
          <button
            onClick={() => {
              let resp = checkIfCompleted(installerData);
              if (resp?.status) {
                setMessage(resp?.dataNotCompleted);
              } else {
                localStorage.setItem(
                  "installerData3",
                  JSON.stringify(installerData)
                );
                moveForward();
              }
            }}
            className={`py-[1em]  basis-[50%] md:basis-[18%] px-[1.4em] bg-[#2ead0065]  text-[#FFF]`}
            children="Next"
          />
        </div>
      </div>
    </div>
  );
};

export default InstallerWorkExperience;
