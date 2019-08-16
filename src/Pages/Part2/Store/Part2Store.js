import { Container } from "unstated";
import { roundToPrecision } from "../../../Helpers/Misc";

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
    t1: 6.9,
    h1By3: 6.9
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
  srw: []
});

export default class Part2Store extends Container {
  name = "Part2Store";

  state = initialState();

  linkedStores = {};

  init = async () => {
    console.log("init called");
    const { w, rao, wSteps } = this.state;

    console.log({ w, rao, wSteps });
    if (!w.length || !rao.length || !wSteps.length) {
      return;
    }

    // await this.computeLambdaByL();

    // await this.computeLambda();

    // await this.computeTimePeriod();

    // await this.computeW();

    await this.computeWSteps();

    await this.computeSW();

    await this.computeRao();

    await this.computeSrWe();
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
        Math.pow(h1By3 / t1, 2) *
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

  readRaoInput = async input => {
    const rao = input.map(({ rao }) => rao);

    const w = input.map(({ w }) => w);

    await this.setState({ rao, w, wSteps: w });

    await this.init();
  };

  computeRao = async () => {
    await this.setState({
      rao
    });
  };

  computeSrWe = async () => {
    const { rao, sew } = this.state;

    const srw = sew.map((value, index) => value * rao[index]);

    await this.setState({ srw });
  };

  updateConfig = config => this.setState({ config });

  bindStore = store => {
    this.linkedStores[store.name] = store;
  };
}

const rao = [
  0.130479499,
  0.177688629,
  0.725428995,
  0.885213609,
  1.031565086,
  1.079622801,
  1.089316397,
  1.143157635,
  1.161388366,
  1.140122863,
  1.132545503,
  1.114350672,
  1.089934069,
  1.063594864,
  1.042350095
];
