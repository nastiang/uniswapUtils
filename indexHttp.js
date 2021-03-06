
const ETH_DAI_ADDR = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
const ETH_DAI_NAME = "ETH/DAI";

const USDC_USDT_ADDR = "0x3041cbd36888becc7bbcbc0045e3b1f144466f5f";
const USDC_USDT_NAME = "USDC/USDT";

const ETH_USDT_ADDR = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";
const ETH_USDT_NAME = "ETH/USDT"

const INTERVAL = 1000;

const EthDaiContractHTTP = new blk.web3http.eth.Contract(
    UniswapV2Pair.abi,
    ETH_DAI_ADDR
);

const EthUsdtContractHTTP = new blk.web3http.eth.Contract(
    UniswapV2Pair.abi,
    ETH_USDT_ADDR
);

const UsdcUsdtContractHTTP = new blk.web3http.eth.Contract(
    UniswapV2Pair.abi,
    USDC_USDT_ADDR
);

const getReserves = async (ContractObj) => {
    const _reserves = await ContractObj.methods.getReserves().call();

    return [Big(_reserves.reserve0), Big(_reserves.reserve1)];
};

const sleep = (timeInMs) =>
    new Promise((resolve) => setTimeout(resolve, timeInMs));

const mainHTTP = async () => {
    while (true) {

        const [amtToken0, amtToken1] = await getReserves(EthDaiContractHTTP);

        console.log(
            `Price ${ETH_DAI_NAME} : ${amtToken0.div(amtToken1).toString()}`
        );

        const [amtToken0, amtToken1] = await getReserves(UsdcUsdtContractHTTP);

        console.log(
            `Price ${USDC_USDT_NAME} : ${amtToken0.div(amtToken1).toString()}`
        );

        await sleep(INTERVAL);

        const [amtToken0, amtToken1] = await getReserves(EthUsdtContractHTTP);

        console.log(
            `Price ${ETH_USDT_NAME} : ${amtToken0.div(amtToken1).toString()}`
        );

        await sleep(INTERVAL);
    }
};

mainHTTP();
