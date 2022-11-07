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

const kpiData = [
  {
    title: "Sales",
    metric: "$ 12,699",
    progress: 15.9,
    target: "$ 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  }
];

export default function KpiCard() {
  return (
    <ColGrid
      numColsMd={2}
      numColsLg={3}
      marginTop="mt-6"
      gapX="gap-x-6"
      gapY="gap-y-6"
    >
      {kpiData.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="items-start">
            <Block truncate={true}>
              <Text>{item.title}</Text>
              <Metric truncate={true}>{item.metric}</Metric>
            </Block>
            <BadgeDelta deltaType={item.deltaType} text={item.delta} />
          </Flex>
          <Flex marginTop="mt-4" spaceX="space-x-2">
            <Text truncate={true}>{`${item.progress}% (${item.metric})`}</Text>
            <Text>{item.target}</Text>
          </Flex>
          <ProgressBar percentageValue={item.progress} marginTop="mt-2" />
        </Card>
      ))}
    </ColGrid>
  );
}
