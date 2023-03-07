import Column from "../../../components/column";
import ServerSettings from "../../../components/spownDelay";

const RaidBossSettings = () => {
  return (
    <Column
      headContent={<h2>Boss Respown Timers</h2>}
      bodyContent={<ServerSettings />}
    />
  );
};

export default RaidBossSettings;
