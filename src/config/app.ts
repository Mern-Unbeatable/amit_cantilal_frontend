import packageJson from "../../package.json";

interface AppConfigProps {
  name: string;
  version: string;
  developer: string;
  copyright: string;
}

const currentYear = new Date().getFullYear();

export const appConfig: AppConfigProps = {
  name: "Elite-ride-app",
  version: packageJson.version,
  developer: "Demmy",
  copyright: `© ${currentYear}.`,
}

