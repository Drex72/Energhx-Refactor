import {
  BadgeDelta,
  Block,
  Card,
  ColGrid,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";

import DashBoardUser from "../.././Components/src/assets/dashboard_user.svg";
import DashBoardIntern from "../.././Components/src/assets/dashboard_intern.svg";
import DashBoardInstaller from "../.././Components/src/assets/dashboard_installer.svg";


const kpiData = [
  {
    title: "Energy User",
    metric: "User",
    progress: 15.9,
    target: "$ 80,000",
    delta: DashBoardUser,
    deltaType: "moderateIncrease",
  },
];

export default function UserKpiCardGrid() {
  return (
    <ColGrid
      numColsMd={2}
      numColsLg={3}
      marginTop="mt-[1em]"
      marginBottom = "mb-4"
      gapX="gap-x-6"
      gapY="gap-y-6"
    >
      {kpiData.map((item) => (
        <div className="mb-[2em]" key={item.title}>
          <Card key={item.title}>
            <Flex alignItems="items-start">
              <Block truncate={true}>
                <Text>{item.title}</Text>
                <Metric truncate={true}>{item.metric}</Metric>
              </Block>
              <img src={item.delta} alt="category" />
            </Flex>
            <Flex marginTop="mt-4" spaceX="space-x-2">
               <div></div>
              <Text>{item.target}</Text>
            </Flex>
          </Card>
        </div>
      ))}
    </ColGrid>
  );
}
