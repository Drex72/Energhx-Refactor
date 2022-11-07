import { useState } from "react";

import { Link } from "react-router-dom";


function UserLogInCompLarge({ AdminData, setAdminData, sendData, formError }) {
      const [error, setError] = useState(false);
      const [errMessage, setErrMessage] = useState("");
      const handleChange = (e) => {
        setAdminData({ ...AdminData, password: e.target.value });
        if (AdminData.password.length < 7) {
          setError(true);
          setErrMessage("Password must be 8 characters or more");
        } else {
          setError(false);
        }
      };
  return (
    <main className="text-white py-[4em]">
      <form className=" container p-[3em] user-form-big">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            User Login
          </h2>
        </div>
        {formError.length > 2 && (
          <div className="mt-2 text-red-500">*{formError}</div>
        )}
        <fieldset className="my-[2em]">
          <section className="my-[1.4em]">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={AdminData?.email}
                required
                onChange={(event) =>
                  setAdminData({ ...AdminData, email: event.target.value })
                }
                className="block my-[.9em]  w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
              />
            </div>
          </section>
        </fieldset>
        {error && <div className="text-red-500">*{errMessage}</div>}
        <fieldset className="my-[2em]">
          <div>
            <label htmlFor="province">Password</label>
            <input
              type="password"
              id="suite"
              required
              value={AdminData?.password}
              onChange={(event) =>
                setAdminData({ ...AdminData, password: event.target.value })
              }
              className="block my-[.9em]  w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
            />
          </div>
        </fieldset>

        <div className="flex  my-[1em]">
          <button className="py-[1em] basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]">
            <Link to="/">Cancel</Link>
          </button>

          <button
            type="submit"
            onClick={sendData}
            className="py-[1em] basis-[15%] px-[1.4em] bg-[#2DAD00]  text-[#fff]"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default UserLogInCompLarge;
