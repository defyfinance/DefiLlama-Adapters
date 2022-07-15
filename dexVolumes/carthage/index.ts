import { DexBreakdownAdapter } from "../dexVolume.type";

const {
  getChainVolume,
  DEFAULT_DAILY_VOLUME_FACTORY,
  DEFAULT_TOTAL_VOLUME_FIELD,
} = require("../helper/getUniSubgraphVolume");

const { CANDLE } = require("../helper/chains");

const { getStartTimestamp } = require("../helper/getStartTimestamp");


const v3Endpoints = {
  [ETHEREUM]: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  [OPTIMISM]:
    "https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis",
  [CANDLE]:
    "https://thegraph.cndlchain.com/subgraphs/name/ianlapham/uniswap-v3",
  [POLYGON]:
    "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
};

const VOLUME_USD = "volumeUSD";

const v3Graphs = getChainVolume({
  graphUrls: {
    ...v3Endpoints,
  },
  totalVolume: {
    factory: "factories",
    field: DEFAULT_TOTAL_VOLUME_FIELD,
  },
  dailyVolume: {
    factory: DEFAULT_DAILY_VOLUME_FACTORY,
    field: VOLUME_USD,
  },
});

const adapter: DexBreakdownAdapter = {
  breakdown: {
    v3: {
      [CANDLE]: {
        fetch: v3Graphs(CANDLE),
        start: getStartTimestamp({
          endpoints: v3Endpoints,
          chain: CANDLE,
          volumeField: VOLUME_USD,
        })
      }
    },
  },
};

export default adapter;
