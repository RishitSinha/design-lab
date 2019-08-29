import { Container } from "unstated";
import { roundToPrecision } from "../../../Helpers/Misc";
import { linear } from "everpolate";
import simpson from "integrate-simpson";

window.simpson = simpson;

const initialState = () => ({
  config: {
    lambdaByL: {
      stepSize: 0.25,
      start: 0.5,
      max: 4
    },
    L: 100,
    w: {
      min: 0,
      max: 2,
      stepSize: 0.1
    },
    Fn: 0.19,
    g: 9.81,
    b: 180,
    t1: 10,
    h1By3: 4
  },
  lambdaByL: [],
  lambda: [],
  timePeriod: [],
  w: [],
  wSteps: [],
  weSteps: [],
  sw: [],
  sew: [],
  rao: [],
  srw: [],
  moments: {
    sw: 0,
    sew: 0,
    srw: 0,
    m2: 0
  }
});

export default class Part2Store extends Container {
  name = "Part2Store";

  state = initialState();

  linkedStores = {};

  init = async () => {
    console.log("init called");
    const { w, rao, wSteps } = this.state;

    if (!w.length || !rao.length || !wSteps.length) {
      return;
    }

    // await this.computeLambdaByL();

    // await this.computeLambda();

    // await this.computeTimePeriod();

    // await this.computeW();

    await this.computeWSteps();

    await this.computeSW();

    await this.computeSrWe();

    await this.computeMoments();
  };

  computeLambdaByL = async () => {
    const {
      config: { lambdaByL: config }
    } = this.state;

    const { stepSize, start, max } = config;

    const lambdaByL = (() => {
      let value = start;
      let result = [];

      while (value <= max) {
        result.push(roundToPrecision(value, 0.0001));
        value += stepSize;
      }

      return result;
    })();

    await this.setState({ lambdaByL });
  };

  computeLambda = async () => {
    const {
      config: { L },
      lambdaByL
    } = this.state;

    const lambda = lambdaByL.map(value => value * L);

    await this.setState({ lambda });
  };

  computeTimePeriod = async () => {
    const { lambda } = this.state;

    const timePeriod = lambda.map(value => Math.sqrt(value / 1.56));

    await this.setState({ timePeriod });
  };

  computeW = async () => {
    const { timePeriod } = this.state;

    const w = timePeriod.map(value => (2 * Math.PI) / value);

    const w_sorted = w.sort();

    await this.setState({
      w,
      config: {
        ...this.state.config,
        w: {
          ...this.state.config.w,
          min: w_sorted[0]
        }
      }
    });
  };

  computeWSteps = async () => {
    const {
      config: {
        // w: { min: start, max, stepSize },
        Fn,
        L,
        g,
        b
      },
      w
    } = this.state;

    // const wSteps = (() => {
    //   let value = start;
    //   let result = [];
    //
    //   while (value <= max) {
    //     result.push(value);
    //     value += stepSize;
    //   }
    //
    //   return result;
    // })();

    const wSteps = w;

    const cosB = Math.cos((b * Math.PI) / 180);
    const v = Fn * Math.sqrt(g * L);

    const weSteps = wSteps.map(
      value => value - (Math.pow(value, 2) * v * cosB) / g
    );

    await this.setState({ wSteps, weSteps });
  };

  computeSW = async () => {
    const {
      config: { t1, h1By3, Fn, b, L, g },
      wSteps
    } = this.state;

    const sw = wSteps.map(value => {
      const wt1By2PI = (value * t1) / (2 * Math.PI);
      return (
        (0.11 / (2 * Math.PI)) *
        Math.pow(h1By3, 2) *
        t1 *
        Math.pow(wt1By2PI, -5) *
        Math.exp(-0.44 * Math.pow(wt1By2PI, -4))
      );
    });

    const cosB = Math.cos((b * Math.PI) / 180);
    const v = Fn * Math.sqrt(g * L);

    const sew = sw.map(
      (value, index) => value / (1 - (wSteps[index] * 2 * v * cosB) / g)
    );

    await this.setState({ sw, sew });
  };

  readRaoInput = async rawInput => {
    const input = rawInput.sort((a, b) => a.w - b.w);
    const rao = input.map(({ rao }) => rao);

    const w = input.map(({ w }) => w);

    const inputW = Array.from({ length: 750 }).map((_, i) => i * 0.002);

    // const interpolatedRao = polynomial(inputW, w, rao);
    const interpolatedRao = linear(inputW, w, rao);

    // await this.setState({ rao, w, wSteps: w });
    await this.setState({ rao: interpolatedRao, w: inputW, wSteps: inputW });

    await this.init();
  };

  computeSrWe = async () => {
    const { rao, sew } = this.state;

    const srw = sew.map((value, index) => value * rao[index] * rao[index]);

    await this.setState({ srw });
  };

  getArea = (curve, ref = "wSteps") => {
    const { wSteps, weSteps } = this.state;

    const refs = {
      wSteps,
      weSteps
    };

    const area = curve.reduce((sum, current, index, self) => {
      const x1 = roundToPrecision(current || 0, 0.0001);
      const x2 = roundToPrecision(self[index + 1] || 0, 0.0001);
      const y = refs[ref][index + 1] - refs[ref][index];
      return index !== self.length - 1 ? sum + ((x1 + x2) * y) / 2 : sum;
    }, 0);

    return roundToPrecision(area, 0.0001).toFixed(4);
  };

  getMoment = (curve, ref = "wSteps", k = 0) => {
    const { wSteps, weSteps } = this.state;

    const refs = {
      wSteps,
      weSteps
    };

    const area = curve.reduce((sum, current, index, self) => {
      const x1 = roundToPrecision(current || 0, 0.0001);
      const x2 = roundToPrecision(self[index + 1] || 0, 0.0001);
      const y = refs[ref][index + 1] - refs[ref][index];

      return index !== self.length - 1
        ? sum + (Math.pow(refs[ref][index], k) * ((x1 + x2) * y)) / 2
        : sum;
    }, 0);

    return roundToPrecision(area, 0.0001).toFixed(4);
  };

  updateConfig = config => this.setState({ config });

  computeMoments = async () => {
    const { sew, srw, sw } = this.state;

    await this.setState({
      moments: {
        sew: this.getMoment(sew, "weSteps"),
        srw: this.getMoment(srw, "weSteps"),
        sw: this.getMoment(sw),
        m2: this.getMoment(sw, "wSteps", 2)
      }
    });
  };

  bindStore = store => {
    this.linkedStores[store.name] = store;
  };
}
