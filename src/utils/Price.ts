import {
  UNI_CLAM_MAI_PAIR,
  UNI_MAI_USDC_PAIR,
  USDC_MATIC_AGGREGATOR,
  UNI_QI_WMATIC_PAIR,
  UNI_QUICK_WMATIC_PAIR,
} from './Constants'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { UniswapV2Pair } from '../../generated/OtterTreasury/UniswapV2Pair'
import { AggregatorV3InterfaceABI } from '../../generated/OtterTreasury/AggregatorV3InterfaceABI'
import { toDecimal } from './Decimals'

let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')
let BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export function getwMaticUsdRate(): BigDecimal {
  let pair = AggregatorV3InterfaceABI.bind(Address.fromString(USDC_MATIC_AGGREGATOR))
  let wmaticPrice = pair.latestRoundData()
  return toDecimal(wmaticPrice.value1, 8)
}

export function getQiUsdRate(): BigDecimal {
  let lp = UniswapV2Pair.bind(Address.fromString(UNI_QI_WMATIC_PAIR))
  let wmatic = toDecimal(lp.getReserves().value0, 18)
  let qi = toDecimal(lp.getReserves().value1, 18)
  let wmaticPerQi = wmatic.div(qi)
  let usdPerQi = wmaticPerQi.times(getwMaticUsdRate())
  log.debug('wmatic = {}, qi = {}, 1 qi = {} wmatic = {} USD', [
    wmatic.toString(),
    qi.toString(),
    wmaticPerQi.toString(),
    usdPerQi.toString(),
  ])
  return usdPerQi
}

export function getQuickUsdRate(): BigDecimal {
  let lp = UniswapV2Pair.bind(Address.fromString(UNI_QUICK_WMATIC_PAIR))
  let reserves = lp.getReserves()
  let wmatic = toDecimal(reserves.value0, 18)
  let quick = toDecimal(reserves.value1, 18)
  let wmaticPerQuick = wmatic.div(quick)
  let usdPerQuick = wmaticPerQuick.times(getwMaticUsdRate())
  log.debug('wmatic = {}, quick = {}, 1 quick = {} wmatic = {} USD', [
    wmatic.toString(),
    quick.toString(),
    wmaticPerQuick.toString(),
    usdPerQuick.toString(),
  ])
  return usdPerQuick
}

export function getClamUsdRate(): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(UNI_CLAM_MAI_PAIR))

  let reserves = pair.getReserves()
  let clam = reserves.value1.toBigDecimal()
  let mai = reserves.value0.toBigDecimal()
  log.debug('pair reserve0 {}, reserve1 {}', [clam.toString(), mai.toString()])

  if (clam.equals(BigDecimal.zero())) {
    log.debug('getCLAMUSDRate div {}', [clam.toString()])
    return BigDecimal.zero()
  }

  let clamRate = mai.div(clam).div(BIG_DECIMAL_1E9)
  log.debug('CLAM rate {}', [clamRate.toString()])

  return clamRate
}

//(slp_treasury/slp_supply)*(2*sqrt(lp_dai * lp_ohm))
export function getDiscountedPairUSD(lp_amount: BigInt, pair_address: string): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(pair_address))

  let total_lp = pair.totalSupply()
  let lp_token_1 = toDecimal(pair.getReserves().value1, 9)
  let lp_token_2 = toDecimal(pair.getReserves().value0, 18)
  let kLast = lp_token_1.times(lp_token_2).truncate(0).digits

  let part1 = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))
  let two = BigInt.fromI32(2)

  let sqrt = kLast.sqrt()
  let part2 = toDecimal(two.times(sqrt), 0)
  let result = part1.times(part2)
  return result
}

export function getPairUSD(lp_amount: BigInt, pair_address: string): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(pair_address))
  let total_lp = pair.totalSupply()
  let lp_token_0 = pair.getReserves().value1
  let lp_token_1 = pair.getReserves().value0
  let ownedLP = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))
  let ohm_value = toDecimal(lp_token_0, 9).times(getClamUsdRate())
  let total_lp_usd = ohm_value.plus(toDecimal(lp_token_1, 18))

  return ownedLP.times(total_lp_usd)
}

export function getPairWMATIC(lp_amount: BigInt, pair_adress: string): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(pair_adress))
  let total_lp = pair.totalSupply()
  let lp_token_0 = pair.getReserves().value1
  let lp_token_1 = pair.getReserves().value0
  let ownedLP = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))
  let clam_value = toDecimal(lp_token_0, 9).times(getClamUsdRate())
  let matic_value = toDecimal(lp_token_1, 18).times(getwMaticUsdRate())
  let total_lp_usd = clam_value.plus(matic_value)

  return ownedLP.times(total_lp_usd)
}
