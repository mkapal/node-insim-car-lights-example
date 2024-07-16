import { InSim } from "node-insim";
import {
  InSimFlags,
  IS_ISI_ReqI,
  IS_SMALL,
  LocalCarLights,
  PacketType,
  SmallType,
} from "node-insim/packets";

const inSim = new InSim();

const COMMAND_PREFIX = "!";

inSim.connect({
  IName: "Node InSim App",
  Host: "127.0.0.1",
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: "",
  Flags: InSimFlags.ISF_LOCAL,
  Prefix: COMMAND_PREFIX,
});

inSim.on(PacketType.ISP_VER, (packet) => {
  console.log(`Connected to LFS ${packet.Product} ${packet.Version}`);

  // Handle typed commands
  inSim.on(PacketType.ISP_MSO, (packet) => {
    if (packet.Msg.startsWith(COMMAND_PREFIX)) {
      switch (packet.Msg.slice(1)) {
        case "high":
          {
            inSim.send(
              new IS_SMALL({
                SubT: SmallType.SMALL_LCL,
                UVal: LocalCarLights.LIGHTS_HIGH,
              }),
            );
          }
          break;
        case "off":
          {
            inSim.send(
              new IS_SMALL({
                SubT: SmallType.SMALL_LCL,
                UVal: LocalCarLights.LIGHTS_OFF,
              }),
            );
          }
          break;
      }
    }
  });
});

process.on("uncaughtException", (error) => {
  console.log(error);
});
