import { Block, Card, ColGrid, Flex, Text } from "@tremor/react";
export default function AddCountryCards({
  countries,
  setCountrySelected,
  setIsCountrySelected,
}) {
  const handleSelectBuilding = (item) => {
    setIsCountrySelected(true);
    setCountrySelected(item);
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
      {countries?.map((item) => {
        console.log(item)
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
