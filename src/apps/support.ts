import semver from "semver";
import { shouldUseTrustedInputForSegwit } from "@ledgerhq/hw-app-btc/lib/shouldUseTrustedInputForSegwit";
import type { DeviceModelId } from "@ledgerhq/devices";
import { getDependencies } from "./polyfill";
import { getEnv } from "../env";

export function shouldUpgrade(
  deviceModel: DeviceModelId,
  appName: string,
  appVersion: string
): boolean {
  if (getEnv("DISABLE_APP_VERSION_REQUIREMENTS")) return false;
  const deps = getDependencies(appName);

  if (
    (deps.includes("Bitcoin") &&
      shouldUseTrustedInputForSegwit({
        name: appName,
        version: "1.4.0",
      })) ||
    appName === "Bitcoin"
  ) {
    // https://donjon.ledger.com/lsb/010/
    return !semver.satisfies(semver.coerce(appVersion), ">= 1.4.0");
  }

  return false;
}
const appVersionsRequired = {
  Cosmos: ">= 2.14",
  Algorand: ">= 1.2.9",
  Polkadot: ">= 10.9160.1",
  Elrond: ">= 1.0.11",
  Ethereum: ">= 1.9.17",
};
export function mustUpgrade(
  deviceModel: DeviceModelId,
  appName: string,
  appVersion: string
): boolean {
  if (getEnv("DISABLE_APP_VERSION_REQUIREMENTS")) return false;
  const range = appVersionsRequired[appName];

  if (range) {
    return !semver.satisfies(appVersion, range);
  }

  return false;
}
