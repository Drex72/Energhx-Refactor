import {
  Block,
  Card,
  ColGrid,
  Flex,
  Metric,
  Text,
} from "@tremor/react";

import DashBoardUser from "../.././Components/src/assets/dashboard_user.svg";
import { useEffect, useState } from "react";

const adminToken = localStorage.getItem("BearerToken");
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${adminToken}`);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
export default function KpiCardGrid() {
  const [userTypes, setUserTypes] = useState([]);
  const getAllUserTypes = async () => {
    try {
      const response = await fetch(
        "https://energyhx-2.herokuapp.com/api/v1/users/types",
        requestOptions
      );
      const responseJson = await response.json();
      setUserTypes(responseJson.data);
      return responseJson.data.name;
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getAllUserTypes();
  }, []);

  return (
    <ColGrid
      numColsMd={2}
      numColsLg={3}
      marginTop="mt-[1em]"
      marginBottom="mb-4"
      gapX="gap-x-6"
      gapY="gap-y-6"
    >
      {userTypes.map((item) => {
        return (
          <div className="mb-[2em]" key={item.id}>
            <Card>
              <Flex alignItems="items-start">
                <Block truncate={true}>
                  <Text>{`No of ${item.name}`}</Text>
                  <Metric truncate={true}>1</Metric>
                </Block>
                <img src={DashBoardUser} alt="category" />
              </Flex>
              <Flex marginTop="mt-4" spaceX="space-x-2">
                <div></div>
                <Text>2000</Text>
              </Flex>
            </Card>
          </div>
        );
      })}
      </ColGrid>
      )
     }
