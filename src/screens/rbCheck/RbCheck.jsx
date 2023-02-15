import { cachedRaidBossData } from "../raid_list/raidListHelpers";

const RbCheck = () => {
  const addCachedItem = () => {
    cachedRaidBossData
      .setData([{ name: "yo" }])
      .then(() => cachedRaidBossData.getData())
      .then((el) => console.log(el));
  };

  const removeItems = () => {
    cachedRaidBossData
      .setData([])
      .then(() => cachedRaidBossData.getData())
      .then((el) => console.log(el));
  };

  return (
    <div>
      <button
        value={"123"}
        onClick={addCachedItem}
        style={{ height: 100, width: 100, backgroundColor: "blue" }}
      />
      <button
        value={"123"}
        onClick={removeItems}
        style={{ height: 100, width: 100, backgroundColor: "red" }}
      />
    </div>
  );
};

export default RbCheck;
