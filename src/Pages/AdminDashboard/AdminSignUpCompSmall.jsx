import { useState } from "react";

import { Link } from "react-router-dom";

function AdminSignUpCompSmall({ AdminData, setAdminData, sendData }) {
  return (
    <main className="text-white">
      <form className="user-form p-[3em] py-[2em]  bg-[#112518]">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Admin Sign Up
          </h2>
        </div>
        <fieldset className="my-[2em]">
          <section className="my-[1.4em]">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              required
              onChange={(event) =>
                setAdminData({ ...AdminData, firstname: event.target.value })
              }
              id="firstname"
              value={AdminData?.firstname}
              className="block my-[.9em] w-[100%] max-w-[400px] p-[.8em] rounded-[10px] text-black"
            />
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              name="lastname"
              required
              value={AdminData?.lastname}
              onChange={(event) =>
                setAdminData({ ...AdminData, lastname: event.target.value })
              }
              className="block my-[.9em] w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
            />
            <label htmlFor="othername">Other name</label>
            <input
              type="text"
              id="othername"
              required
              value={AdminData?.othername}
              onChange={(event) =>
                setAdminData({ ...AdminData, othername: event.target.value })
              }
              className="block my-[.9em] w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
            />
          </section>

          <section className="my-[1.4em]">
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
            <label htmlFor="phonenumber">Phone(Mobile)</label>
            <input
              type="tel"
              id="phonenumber"
              required
              value={AdminData?.phoneNumber}
              onChange={(event) =>
                setAdminData({ ...AdminData, phoneNumber: event.target.value })
              }
              className="block my-[.9em] w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
            />
          </section>
        </fieldset>

        <section className="my-[2em] mb-[4em]">
          <label htmlFor="suite">Password</label>
          <input
            type="password"
            id="suite"
            required
            value={AdminData?.password}
            onChange={(event) =>
              setAdminData({ ...AdminData, password: event.target.value })
            }
            className="block my-[.9em] w-[100%] max-w-[400px] p-[.8em] rounded-[10px]  text-black"
          />
        </section>

        <div className="flex justify-center my-[2em]">
          <button className="py-[1em] basis-[50%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]">
            <Link to="/">Cancel</Link>
          </button>

          <button
            type="submit"
            onClick={() => sendData()}
            className="py-[1em] basis-[50%] px-[1.4em] bg-[#2DAD00]  text-[#fff]"
          >
            <Link to="/admin">Submit</Link>
          </button>
        </div>
      </form>
    </main>
  );
}

export default AdminSignUpCompSmall;
