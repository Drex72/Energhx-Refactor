import { useEffect, useRef, useState } from "react";
import { checkIfCompleted, getAllUtilities } from "../../../Forms/useFetch";
import { Dropdown } from "../Form1";
import style from "../Form.module.css";

function UtilityInfoCompSmall({ utilityObject, moveForward, moveBackward }) {
  const secondaryData = JSON.parse(localStorage.getItem("userData"));
  const [selectedUtility, setSelectedUtility] = useState("");
  const msgRef = useRef();
  const [utilityData, setUtilityData] = useState(
    JSON.parse(localStorage.getItem("userData3")) ?? {
      utility: [],
      alternateNumber: "",
      accountNumber: "",
    }
  );
  const [allChecked, setAllChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  const [message, setMessage] = useState("");

  const passInUtility = (name) => {
    setUtilityData({ ...utilityData, utility: [...utilityData.utility, name] });
  };
  /**
   * Validates the Form to make sure everything is filled before moving onto the next page
   * @param {*} e
   */
  const handlePageMove = (e) => {
    e.preventDefault();
    const statusAll = checkIfCompleted(utilityData);
    if (allChecked.checkbox2 && allChecked.checkbox1) {
      if (
        utilityData.alternateNumber.length > 7 &&
        utilityData.alternateNumber.length < 17
      ) {
        if (!statusAll.status) {
          localStorage.setItem("userData3", JSON.stringify(utilityData));
          moveForward();
        } else {
          window.scrollTo(
            msgRef.current?.offsetLeft,
            msgRef.current?.offsetTop
          );

          setMessage(`${statusAll.dataNotCompleted} is not filled`);
        }
      } else {
        window.scrollTo(msgRef.current?.offsetLeft, msgRef.current?.offsetTop);

        setMessage(
          "Alternate Number Should be greater than 7 characters and less than 17 Characters"
        );
      }
    } else {
      window.scrollTo(msgRef.current?.offsetLeft, msgRef.current?.offsetTop);

      setMessage("Utility Information Checkbox is not Filled");
      // window.scrollTo(0,0)
    }
  };

  useEffect(() => {
    setTimeout(() => setMessage(""), 10000);
  }, [message]);
  return (
    <main className="text-white">
      <form className=" py-[3em] bg-[#112518]">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Utility Information
          </h2>
          <p>In addition you agree that: </p>
        </div>

        <div className="flex flex-col gap-[1em] mt-6">
          <div class="form-group">
            <input
              type="checkbox"
              value={allChecked.checkbox1}
              onChange={(e) =>
                setAllChecked({ ...allChecked, checkbox1: e.target.checked })
              }
              required
              id="html"
            />
            <label for="html">
              <span className=" my-[2em]">
                You are either the account holder, or the authorized agent of
                the account holder.
              </span>
            </label>
          </div>
          <div class="form-group">
            <input
              type="checkbox"
              value={allChecked.checkbox2}
              onChange={(e) =>
                setAllChecked({ ...allChecked, checkbox2: e.target.checked })
              }
              required
              id="css"
            />
            <label for="css">
              <span className="my-[2em]">
                You have read and understood the Price Comparison sheet and the
                Disclosure Statement.
              </span>
            </label>
          </div>
        </div>
        {message && (
          <h2 className="mb-[2em]  text-red-500 capitalize w-full text-center">
            {message}
          </h2>
        )}

        <fieldset className="flex flex-col gap-[1em] my-6">
          {utilityObject?.map((item, idx) => {
            return (
              <div>
                <h2 className="category-heading uppercase text-[#49BF5F] mb-4 text-[1.3rem] font-bold">
                  Utilities for {item.name}
                </h2>
                <Dropdown
                  data={selectedUtility}
                  setData={setSelectedUtility}
                  itemList={item.data}
                  field="Utilities"
                  text="Selected Utilities"
                  labelText="Choose your Utility"
                  textColor="text-[#2DAD00]"
                  nameChange="utility"
                  value={utilityData.utility[idx] ?? ""}
                  margin={false}
                  customFunc={passInUtility}
                />
              </div>
            );
          })}
          <div>
            <label htmlFor="accountnumber">Account no</label>
            <input
              type="number"
              value={utilityData.accountNumber}
              required
              id="accountnumber"
              onChange={(event) =>
                setUtilityData({
                  ...utilityData,
                  accountNumber: event.target.value,
                })
              }
              className="form-small-input"
            />
          </div>
          <div>
            <label htmlFor="alternatenumber">Alternate Phone</label>
            <input
              type="number"
              id="alternatenumber"
              required
              value={utilityData.alternateNumber}
              onChange={(event) =>
                setUtilityData({
                  ...utilityData,
                  alternateNumber: event.target.value,
                })
              }
              className="form-small-input"
            />
          </div>
          <div>
            <label htmlFor="streetaddress">Street Address</label>
            <div
              children={secondaryData?.streetName}
              style={{ color: "white" }}
              className="form-small-input bg-[#3A3A3A] text-[white] text-xl border-2 border-[#2dad00]"
            />
          </div>
          <div>
            <label htmlFor="country">City</label>
            <div
              children={secondaryData?.city}
              style={{ color: "white" }}
              className="form-small-input bg-[#3A3A3A] text-[white] text-xl border-2 border-[#2dad00]"
            />
          </div>
          <div>
            <label htmlFor="postal">Postal Code</label>
            <div
              children={secondaryData?.postalCode}
              style={{ color: "white" }}
              className="form-small-input bg-[#3A3A3A] text-[white] text-xl border-2 border-[#2dad00]"
            />
          </div>
        </fieldset>
      </form>
      <div className="flex  my-[1em]">
        <button
          onClick={() => {
            moveBackward();
          }}
          children="Previous"
          className="py-[1em] basis-[50%] md:basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
        />

        <button
          onClick={handlePageMove}
          className={`py-[1em]  basis-[50%] px-[1.4em] bg-[#2ead0065]  text-[#FFF]`}
          children="Next"
        />
      </div>
    </main>
  );
}

export default UtilityInfoCompSmall;
