const Big = require("big.js");
const blk = require("./blockchain");
const UniswapV2Pair = require("./abi/IUniswapV2Pair.json");

const ETH_DAI_ADDR = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
const ETH_DAI_NAME = "ETH/DAI";

const USDC_USDT_ADDR = "0x3041cbd36888becc7bbcbc0045e3b1f144466f5f";
const USDC_USDT_NAME = "USDC/USDT";

const ETH_USDT_ADDR = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";
const ETH_USDT_NAME = "ETH/USDT"

const INTERVAL = 1000;

const EthDaiContractWSS = new blk.web3ws.eth.Contract(
    UniswapV2Pair.abi,
    ETH_DAI_ADDR
);

const EthUsdtContractWSS = new blk.web3ws.eth.Contract(
    UniswapV2Pair.abi,
    ETH_USDT_ADDR
);

const UsdcUsdtContractWSS = new blk.web3ws.eth.Contract(
    UniswapV2Pair.abi,
    USDC_USDT_ADDR
);

const state = {
    blockNumber: undefined,
    token0: undefined,
    token1: undefined,
};

const getReserves = async (ContractObj) => {
    const _reserves = await ContractObj.methods.getReserves().call();
    return [Big(_reserves.reserve0), Big(_reserves.reserve1)];
};

const updateState = (data) => {
    state.token0 = Big(data.returnValues.reserve0);
    state.token1 = Big(data.returnValues.reserve1);
    state.blockNumber = data.blockNumber;
};

const mainWSS = async () => {
   
    [state.token0, state.token1] = await getReserves(EthDaiContractWSS);
    state.blockNumber = await blk.web3http.eth.getBlockNumber();
    EthDaiContractWSS.events.Sync({}).on("data", (data) => updateState(data));
    console.log(
        `${state.blockNumber} Price ${ETH_DAI_NAME} : ${state.token0
            .div(state.token1)
            .toString()}`
    );

    [state.token0, state.token1] = await getReserves(UsdcUsdtContractWSS);
    state.blockNumber = await blk.web3http.eth.getBlockNumber();
    UsdcUsdtContractWSS.events.Sync({}).on("data", (data) => updateState(data));
    console.log(
        `${state.blockNumber} Price ${USDC_USDT_NAME} : ${state.token0
            .div(state.token1)
            .toString()}`
    );

    [state.token0, state.token1] = await getReserves(EthUsdtContractWSS);
    state.blockNumber = await blk.web3http.eth.getBlockNumber();
    EthUsdtContractWSS.events.Sync({}).on("data", (data) => updateState(data));
    console.log(
        `${state.blockNumber} Price ${ETH_USDT_NAME} : ${state.token0
            .div(state.token1)
            .toString()}`
    );
};

mainWSS();
