import { useTranslation } from "react-i18next";
import Column from "../../../components/column";
import ServerSettings from "../../../components/spownDelay";

const RaidBossSettings = () => {
  const { t } = useTranslation();
  return (
    <Column
      headContent={<h2>{t("server_settings.name")}</h2>}
      bodyContent={<ServerSettings />}
    />
  );
};

export default RaidBossSettings;
