import { Block, Card, ColGrid, Flex, Text } from "@tremor/react";
export default function AddBuildingCards({
  buildings,
  setBuildingSelected,
  setIsBuildingSelected,
}) {
  const handleSelectBuilding = (item) => {
    setIsBuildingSelected(true);
    setBuildingSelected(item);
  };

  return (
    <ColGrid
      numColsMd={2}
      numColsLg={3}
      marginTop="mt-[1em]"
      marginBottom="mb-4"
      gapX="gap-x-6"
      gapY="gap-y-6"
    >
      {buildings?.map((item) => {
        return (
          <div
            onClick={() => handleSelectBuilding(item)}
            className="mb-[2em] cursor-pointer"
            key={item.id}

          >
            <Card>
              <Flex alignItems="items-start">
                <Block truncate={true}>
                  <Text>{item.name}</Text>
                </Block>
              </Flex>
            </Card>
          </div>
        );
      })}
    </ColGrid>
  );
}
