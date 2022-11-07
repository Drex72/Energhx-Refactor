import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useState } from "react";
import { getUser } from "../../Components/Forms/useFetch";

export default function TableView({ setData,setModalIsOpen,users, statusMessage, setStatusMessage }) {
  const [danger, setDanger] = useState('')
  const adminToken = localStorage.getItem("BearerToken");
  const handleVerify = (email) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", 'application/json');
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email,
      }),
      redirect: "follow",
    };

    fetch("https://energyhx-2.herokuapp.com/api/v1/admins/verify", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDanger(false)
        setStatusMessage('Mail sent Successfully')
      })
      .catch((error) => {
        setDanger(true)
        setStatusMessage(error.message)
      });
  };
  const getUserInfo = async (id) => {
    setData([])
    const information = await getUser(id, adminToken)
    setData(information)
  }

  return (
    <Card>
      <h2 className={`w-full text-center ${danger ? 'text-red-300' : 'text-green-300'}`}>{statusMessage}</h2>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>No</TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              First name
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Last name
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              User Type
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell textAlignment="text-left">{item.firstname}</TableCell>
              <TableCell textAlignment="text-left">{item.lastname}</TableCell>
              <TableCell textAlignment="text-left">{item.type[0]}</TableCell>
              <TableCell textAlignment="text-left">
                <button className="py-3 px-5 w-full rounded bg-red-200" onClick={() => {
                  setModalIsOpen(true)
                  getUserInfo(item.id)
                }}>
                  View
                </button>
              </TableCell>
              <TableCell textAlignment="text-right">
                <button
                  className="py-3 px-5 w-full rounded bg-green-200"
                  onClick={() => handleVerify(item.email)}
                >
                  Verify
                </button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </Card>
  );
}
