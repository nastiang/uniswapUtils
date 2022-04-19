const Big = require("big.js");
const blk = require("./blockchain");
const UniswapV2Pair = require("./abi/IUniswapV2Pair.json");

const ETH_DAI_ADDR = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
const ETH_DAI_NAME = "ETH/DAI";

const USDC_USDT_ADDR = "0x3041cbd36888becc7bbcbc0045e3b1f144466f5f";
const USDC_USDT_NAME = "USDC/USDT";

const ETH_USDT_ADDR = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";
const ETH_USDT_NAME = "ETH/USDT"


const ROUTER_ADDR = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
const UNISWAP_DAI_ADDR = "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667"
const UNISWAP_WETH_ADDR = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const UniswapRouterV2 = require("./abi/UniswapV2Router02.json")


/*

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
}; */

const RouterWSS = new blk.web3ws.eth.Contract(
    UniswapRouterV2.abi,
    ROUTER_ADDR
)
const getAmountsOut = async (ContractObj) => {
    const _amounts = await ContractObj.methods.getAmountsOut(1000,[UNISWAP_WETH_ADDR, UNISWAP_DAI_ADDR]).call();
    return _amounts;
};

const mainWSS = async () => {

    const amountsOut = await getAmountsOut(RouterWSS);
    console.log(
        `amount out: ${amountsOut}`
    );

    /*
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
    ); */
};

mainWSS();
