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
  sew: []
});

export default class Part2Store extends Container {
  name = "Part2Store";

  state = initialState();

  linkedStores = {};

  init = async () => {
    await this.computeLambdaByL();

    await this.computeLambda();

    await this.computeTimePeriod();

    await this.computeW();

    await this.computeWSteps();

    await this.computeSW();
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
          min: w_sorted[0],
        }
      }
    });
  };

  computeWSteps = async () => {
    const {
      config: {
        w: { min: start, max, stepSize },
        Fn,
        L,
        g,
        b
      }
    } = this.state;

    const wSteps = (() => {
      let value = start;
      let result = [];

      while (value <= max) {
        result.push(value);
        value += stepSize;
      }

      return result;
    })();

    const cosB = Math.cos((b * Math.PI) / 180);
    const v = Fn * Math.sqrt(g * L);

    const weSteps = wSteps.map(value => 1 - (value * 2 * v * cosB) / g);

    await this.setState({ wSteps, weSteps });
  };

  computeSW = async () => {
    const {
      config: { t1, h1By3 },
      wSteps,
      weSteps
    } = this.state;

    const sw = wSteps.map(value => {
      const wt1By2PI = (value * t1) / (2 * Math.PI);
      return (
        Math.pow(h1By3 / t1, 2) *
        Math.pow(wt1By2PI, -5) *
        Math.exp(-0.44 * Math.pow(wt1By2PI, -4))
      );
    });

    const sew = sw.map((value, index) => value / weSteps[index]);

    await this.setState({ sw, sew });
  };

  updateConfig = config => this.setState({ config });

  bindStore = store => {
    this.linkedStores[store.name] = store;
  };
}
