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

inSim.connect({
  IName: "Node InSim App",
  Host: "127.0.0.1",
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: "",
  Flags: InSimFlags.ISF_LOCAL,
});

inSim.on(PacketType.ISP_VER, (packet) => {
  console.log(`Connected to LFS ${packet.Product} ${packet.Version}`);

  setInterval(() => {
    inSim.send(
      new IS_SMALL({
        SubT: SmallType.SMALL_LCL,
        UVal: LocalCarLights.LIGHTS_OFF,
      }),
    );
  }, 2000);

  setTimeout(() => {
    setInterval(() => {
      inSim.send(
        new IS_SMALL({
          SubT: SmallType.SMALL_LCL,
          UVal: LocalCarLights.LIGHTS_HIGH,
        }),
      );
    }, 2000);
  }, 1000);
});

process.on("uncaughtException", (error) => {
  console.log(error);
});
