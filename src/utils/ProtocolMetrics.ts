import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { ClamCirculatingSupply } from '../../generated/OtterTreasury/ClamCirculatingSupply'
import { dQuick } from '../../generated/OtterTreasury/dQuick'
import { ERC20 } from '../../generated/OtterTreasury/ERC20'
import { OtterClamERC20V2 } from '../../generated/OtterTreasury/OtterClamERC20V2'
import { OtterLake } from '../../generated/OtterTreasury/OtterLake'
import { OtterPearlERC20 } from '../../generated/OtterTreasury/OtterPearlERC20'
import { OtterQiDAOInvestment } from '../../generated/OtterTreasury/OtterQiDAOInvestment'
import { OtterQuickSwapInvestment } from '../../generated/OtterTreasury/OtterQuickSwapInvestment'
import { OtterStaking } from '../../generated/OtterTreasury/OtterStaking'
import { OtterStakingDistributor } from '../../generated/OtterTreasury/OtterStakingDistributor'
import { UniswapV2Pair } from '../../generated/OtterTreasury/UniswapV2Pair'
import { ProtocolMetric, Transaction } from '../../generated/schema'
import { StakedOtterClamERC20V2 } from '../../generated/StakedOtterClamERC20V2/StakedOtterClamERC20V2'
import {
  CIRCULATING_SUPPLY_CONTRACT,
  CIRCULATING_SUPPLY_CONTRACT_BLOCK,
  CLAM_ERC20_CONTRACT,
  DAI_ERC20_CONTRACT,
  DQUICK_CONTRACT,
  FRAX_ERC20_CONTRACT,
  MAI_ERC20_CONTRACT,
  MATIC_ERC20_CONTRACT,
  OCQI_CONTRACT,
  QCQI_START_BLOCK,
  OTTER_LAKE_ADDRESS,
  PEARL_CHEST_BLOCK,
  PEARL_ERC20_CONTRACT,
  QI_ERC20_CONTRACT,
  SCLAM_ERC20_CONTRACT,
  STAKING_CONTRACT,
  STAKING_DISTRIBUTOR_CONTRACT,
  TREASURY_ADDRESS,
  UNI_CLAM_FRAX_PAIR,
  UNI_CLAM_FRAX_PAIR_BLOCK,
  UNI_CLAM_MAI_PAIR,
  UNI_CLAM_WMATIC_PAIR,
  UNI_CLAM_WMATIC_PAIR_BLOCK,
  UNI_MAI_CLAM_DQUICK_INVESTMENT_PAIR,
  UNI_MAI_CLAM_DQUICK_INVESTMENT_PAIR_BLOCK,
  UNI_MAI_USDC_PAIR,
  UNI_MAI_USDC_PAIR_BLOCK,
  UNI_MAI_USDC_QI_INVESTMENT_PAIR,
  UNI_MAI_USDC_QI_INVESTMENT_PAIR_BLOCK,
  UNI_PEARL_WMATIC_PAIR,
  UNI_PEARL_WMATIC_PAIR_BLOCK,
  UNI_QI_WMATIC_INVESTMENT_PAIR,
  UNI_QI_WMATIC_INVESTMENT_PAIR_BLOCK,
  UNI_QI_WMATIC_PAIR,
  UNI_QI_WMATIC_PAIR_BLOCK,
} from './Constants'
import { dayFromTimestamp } from './Dates'
import { toDecimal } from './Decimals'
import {
  getClamUsdRate,
  getDiscountedPairUSD,
  getQuickUsdRate,
  getPairUSD,
  getPairWMATIC,
  getQiUsdRate,
  getwMaticUsdRate,
} from './Price'

export function loadOrCreateProtocolMetric(timestamp: BigInt): ProtocolMetric {
  let dayTimestamp = dayFromTimestamp(timestamp)

  let protocolMetric = ProtocolMetric.load(dayTimestamp)
  if (protocolMetric == null) {
    protocolMetric = new ProtocolMetric(dayTimestamp)
    protocolMetric.timestamp = timestamp
    protocolMetric.clamCirculatingSupply = BigDecimal.fromString('0')
    protocolMetric.sClamCirculatingSupply = BigDecimal.fromString('0')
    protocolMetric.totalSupply = BigDecimal.fromString('0')
    protocolMetric.clamPrice = BigDecimal.fromString('0')
    protocolMetric.marketCap = BigDecimal.fromString('0')
    protocolMetric.totalValueLocked = BigDecimal.fromString('0')
    protocolMetric.treasuryRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryMaiUsdcRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryMaiUsdcQiInvestmentRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryMarketValue = BigDecimal.fromString('0')
    protocolMetric.nextEpochRebase = BigDecimal.fromString('0')
    protocolMetric.nextDistributedClam = BigDecimal.fromString('0')
    protocolMetric.currentAPY = BigDecimal.fromString('0')
    protocolMetric.safeHandAPY = BigDecimal.fromString('0')
    protocolMetric.furryHandAPY = BigDecimal.fromString('0')
    protocolMetric.stoneHandAPY = BigDecimal.fromString('0')
    protocolMetric.diamondHandAPY = BigDecimal.fromString('0')
    protocolMetric.treasuryMaiRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryMaiMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryFraxRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryFraxMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryDaiRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryWmaticRiskFreeValue = BigDecimal.fromString('0')
    protocolMetric.treasuryWmaticMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryQiMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryDquickMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryQiWmaticMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryQiWmaticQiInvestmentMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryOtterClamQiMarketValue = BigDecimal.fromString('0')
    protocolMetric.treasuryClamMaiPOL = BigDecimal.fromString('0')
    protocolMetric.treasuryClamFraxPOL = BigDecimal.fromString('0')
    protocolMetric.treasuryClamWmaticPOL = BigDecimal.fromString('0')

    protocolMetric.save()
  }
  return protocolMetric as ProtocolMetric
}

function getTotalSupply(): BigDecimal {
  let clam_contract = OtterClamERC20V2.bind(Address.fromString(CLAM_ERC20_CONTRACT))
  let total_supply = toDecimal(clam_contract.totalSupply(), 9)
  log.debug('Total Supply {}', [total_supply.toString()])
  return total_supply
}

function getCirculatingSupply(transaction: Transaction, total_supply: BigDecimal): BigDecimal {
  let circ_supply = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(CIRCULATING_SUPPLY_CONTRACT_BLOCK))) {
    let circulatingSupply_contract = ClamCirculatingSupply.bind(Address.fromString(CIRCULATING_SUPPLY_CONTRACT))
    circ_supply = toDecimal(circulatingSupply_contract.CLAMCirculatingSupply(), 9)
  } else {
    circ_supply = total_supply
  }
  log.debug('Circulating Supply {}', [total_supply.toString()])
  return circ_supply
}

function getSClamSupply(transaction: Transaction): BigDecimal {
  let sclam_supply = BigDecimal.fromString('0')

  let sclam_contract = StakedOtterClamERC20V2.bind(Address.fromString(SCLAM_ERC20_CONTRACT))
  sclam_supply = toDecimal(sclam_contract.circulatingSupply(), 9)

  log.debug('sCLAM Supply {}', [sclam_supply.toString()])
  return sclam_supply
}

function getMaiUsdcValue(): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(UNI_MAI_USDC_PAIR))

  let reserves = pair.getReserves()
  let usdc = toDecimal(reserves.value0, 6)
  let mai = toDecimal(reserves.value1, 18)
  log.debug('pair mai {}, usdc {}', [mai.toString(), usdc.toString()])

  let balance = pair.balanceOf(Address.fromString(TREASURY_ADDRESS)).toBigDecimal()
  let total = pair.totalSupply().toBigDecimal()
  log.debug('pair MAI/USDC LP balance {}, total {}', [balance.toString(), total.toString()])

  let value = usdc
    .plus(mai)
    .times(balance)
    .div(total)
  log.debug('pair MAI/USDC value {}', [value.toString()])
  return value
}

function getMaiUsdcInvestmentValue(): BigDecimal {
  let pair = OtterQiDAOInvestment.bind(Address.fromString(UNI_MAI_USDC_QI_INVESTMENT_PAIR))
  let reserves = pair.getReserves()
  let usdc = toDecimal(reserves.value0, 6)
  let mai = toDecimal(reserves.value1, 18)
  log.debug('investment mai {}, usdc {}', [mai.toString(), usdc.toString()])

  let balance = pair.balanceOf(Address.fromString(TREASURY_ADDRESS)).toBigDecimal()
  let total = pair.totalSupply().toBigDecimal()
  log.debug('investment MAI/USDC LP balance {}, total {}', [balance.toString(), total.toString()])

  let value = usdc
    .plus(mai)
    .times(balance)
    .div(total)
  log.debug('investment MAI/USDC value {}', [value.toString()])
  return value
}

function getQiWmaticMarketValue(): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(UNI_QI_WMATIC_PAIR))
  let reserves = pair.getReserves()
  let wmatic = toDecimal(reserves.value0, 18)
  let qi = toDecimal(reserves.value1, 18)
  log.debug('pair qi {}, wmatic {}', [qi.toString(), wmatic.toString()])

  let balance = pair.balanceOf(Address.fromString(TREASURY_ADDRESS)).toBigDecimal()

  let total = pair.totalSupply().toBigDecimal()
  log.debug('pair WMATIC/Qi LP balance {}, total {}', [balance.toString(), total.toString()])

  let wmaticPerQi = wmatic.div(qi)

  let value = wmatic
    .plus(wmaticPerQi.times(qi))
    .times(getwMaticUsdRate())
    .times(balance)
    .div(total)
  log.debug('pair WMATIC/Qi value {}', [value.toString()])
  return value
}

function getPearlWmaticMarketValue(): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(UNI_PEARL_WMATIC_PAIR))
  let reserves = pair.getReserves()
  let wmatic = toDecimal(reserves.value0, 18)
  let pearl = toDecimal(reserves.value1, 18)
  log.info('pair pearl {}, wmatic {}', [pearl.toString(), wmatic.toString()])

  let balance = pair.balanceOf(Address.fromString(TREASURY_ADDRESS)).toBigDecimal()

  let total = pair.totalSupply().toBigDecimal()
  log.info('pair WMATIC/PEARL LP balance {}, total {}', [balance.toString(), total.toString()])

  let wmaticPerPearl = wmatic.div(pearl)

  let value = wmatic
    .plus(wmaticPerPearl.times(pearl))
    .times(getwMaticUsdRate())
    .times(balance)
    .div(total)
  log.info('pair WMATIC/PEARL value {}', [value.toString()])
  return value
}

function getQiWmaticInvestmentMarketValue(): BigDecimal {
  let pair = OtterQiDAOInvestment.bind(Address.fromString(UNI_QI_WMATIC_INVESTMENT_PAIR))
  let reserves = pair.getReserves()
  let wmatic = toDecimal(reserves.value0, 18)
  let qi = toDecimal(reserves.value1, 18)
  log.debug('investment wmatic {}, qi {}', [qi.toString(), wmatic.toString()])

  let balance = pair.balanceOf(Address.fromString(TREASURY_ADDRESS)).toBigDecimal()

  let total = pair.totalSupply().toBigDecimal()
  log.debug('investment WMATIC/Qi LP balance {}, total {}', [balance.toString(), total.toString()])

  let wmaticPerQi = wmatic.div(qi)

  let value = wmatic
    .plus(wmaticPerQi.times(qi))
    .times(getwMaticUsdRate())
    .times(balance)
    .div(total)
  log.debug('investment WMATIC/Qi value {}', [value.toString()])
  return value
}

export function getdQuickMarketValue(): BigDecimal {
  let usdPerQuick = getQuickUsdRate()
  log.debug('1 Quick = {} USD', [usdPerQuick.toString()])

  let token = dQuick.bind(Address.fromString(DQUICK_CONTRACT))
  let quickBalance = toDecimal(token.QUICKBalance(Address.fromString(TREASURY_ADDRESS)), 18)
  log.debug('quick balance of treasury = {}', [quickBalance.toString()])
  let marketValue = quickBalance.times(usdPerQuick)
  log.debug('quick marketValue = {}', [marketValue.toString()])
  return marketValue
}

export function getQiMarketValue(): BigDecimal {
  let usdPerQi = getQiUsdRate()
  log.debug('1 Qi = {} USD', [usdPerQi.toString()])

  let qiERC20 = ERC20.bind(Address.fromString(QI_ERC20_CONTRACT))
  let qiBalance = toDecimal(qiERC20.balanceOf(Address.fromString(TREASURY_ADDRESS)), 18)
  log.debug('qi balance of treasury = {}', [qiBalance.toString()])
  let marketValue = qiBalance.times(usdPerQi)
  log.debug('qi marketValue = {}', [marketValue.toString()])
  return marketValue
}

export function getOtterClamQiMarketValue(): BigDecimal {
  let usdPerQi = getQiUsdRate()
  log.debug('1 Qi = {} USD', [usdPerQi.toString()])

  let ocQi = ERC20.bind(Address.fromString(OCQI_CONTRACT))
  let ocQiBalance = toDecimal(ocQi.balanceOf(Address.fromString(TREASURY_ADDRESS)), 18)
  log.debug('ocQi balance of treasury = {}', [ocQiBalance.toString()])
  let marketValue = ocQiBalance.times(usdPerQi)
  log.debug('ocQi marketValue = {}', [marketValue.toString()])
  return marketValue
}

function getMV_RFV(transaction: Transaction): BigDecimal[] {
  let maiERC20 = ERC20.bind(Address.fromString(MAI_ERC20_CONTRACT))
  let fraxERC20 = ERC20.bind(Address.fromString(FRAX_ERC20_CONTRACT))
  let daiERC20 = ERC20.bind(Address.fromString(DAI_ERC20_CONTRACT))
  let maticERC20 = ERC20.bind(Address.fromString(MATIC_ERC20_CONTRACT))

  let clamMaiPair = UniswapV2Pair.bind(Address.fromString(UNI_CLAM_MAI_PAIR))
  let clamFraxPair = UniswapV2Pair.bind(Address.fromString(UNI_CLAM_FRAX_PAIR))
  let clamWmaticPair = UniswapV2Pair.bind(Address.fromString(UNI_CLAM_WMATIC_PAIR))

  let treasury_address = Address.fromString(TREASURY_ADDRESS)
  let maiBalance = maiERC20.balanceOf(treasury_address)
  let fraxBalance = fraxERC20.balanceOf(treasury_address)
  let daiBalance = daiERC20.balanceOf(treasury_address)

  let wmaticBalance = maticERC20.balanceOf(treasury_address)
  let wmatic_value = toDecimal(wmaticBalance, 18).times(getwMaticUsdRate())

  //CLAM-MAI & Investment to Quickswap
  let clamMaiBalance = clamMaiPair.balanceOf(treasury_address)
  let dQuickMarketValue = BigDecimal.fromString('0')

  if (transaction.blockNumber.gt(BigInt.fromString(UNI_MAI_CLAM_DQUICK_INVESTMENT_PAIR_BLOCK))) {
    let pair = OtterQuickSwapInvestment.bind(Address.fromString(UNI_MAI_CLAM_DQUICK_INVESTMENT_PAIR))
    let clamMaiInvestmentBalance = pair.balanceOf(treasury_address)
    clamMaiBalance = clamMaiBalance.plus(clamMaiInvestmentBalance)
    dQuickMarketValue = getdQuickMarketValue()
  }

  let clamMaiTotalLP = toDecimal(clamMaiPair.totalSupply(), 18)
  let clamMaiPOL = toDecimal(clamMaiBalance, 18)
    .div(clamMaiTotalLP)
    .times(BigDecimal.fromString('100'))
  let clamMai_value = getPairUSD(clamMaiBalance, UNI_CLAM_MAI_PAIR)
  let clamMai_rfv = getDiscountedPairUSD(clamMaiBalance, UNI_CLAM_MAI_PAIR)

  //CLAM-FRAX
  let clamFraxBalance = BigInt.fromI32(0)
  let clamFrax_value = BigDecimal.fromString('0')
  let clamFrax_rfv = BigDecimal.fromString('0')
  let clamFraxTotalLP = BigDecimal.fromString('0')
  let clamFraxPOL = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_CLAM_FRAX_PAIR_BLOCK))) {
    clamFraxBalance = clamFraxPair.balanceOf(treasury_address)
    clamFrax_value = getPairUSD(clamFraxBalance, UNI_CLAM_FRAX_PAIR)
    clamFrax_rfv = getDiscountedPairUSD(clamFraxBalance, UNI_CLAM_FRAX_PAIR)
    clamFraxTotalLP = toDecimal(clamFraxPair.totalSupply(), 18)
    if (clamFraxTotalLP.gt(BigDecimal.fromString('0')) && clamFraxBalance.gt(BigInt.fromI32(0))) {
      clamFraxPOL = toDecimal(clamFraxBalance, 18)
        .div(clamFraxTotalLP)
        .times(BigDecimal.fromString('100'))
    }
  }

  let clamWmatic = BigInt.fromI32(0)
  let clamWmatic_value = BigDecimal.fromString('0')
  let clamWmatic_rfv = BigDecimal.fromString('0')
  let clamWmaticTotalLP = BigDecimal.fromString('0')
  let clamWmaticPOL = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_CLAM_WMATIC_PAIR_BLOCK))) {
    clamWmatic = clamWmaticPair.balanceOf(treasury_address)
    log.debug('clamMaticBalance {}', [clamWmatic.toString()])

    clamWmatic_value = getPairWMATIC(clamWmatic, UNI_CLAM_WMATIC_PAIR)
    log.debug('clamWmatic_value {}', [clamWmatic_value.toString()])

    clamWmatic_rfv = getDiscountedPairUSD(clamWmatic, UNI_CLAM_WMATIC_PAIR)
    clamWmaticTotalLP = toDecimal(clamWmaticPair.totalSupply(), 18)
    if (clamWmaticTotalLP.gt(BigDecimal.fromString('0')) && clamWmatic.gt(BigInt.fromI32(0))) {
      clamWmaticPOL = toDecimal(clamWmatic, 18)
        .div(clamWmaticTotalLP)
        .times(BigDecimal.fromString('100'))
    }
  }

  let maiUsdcValueDecimal = BigDecimal.fromString('0')
  if (transaction.blockNumber.ge(BigInt.fromString(UNI_MAI_USDC_PAIR_BLOCK))) {
    maiUsdcValueDecimal = getMaiUsdcValue()
  }

  let qiMarketValue = BigDecimal.fromString('0')
  let maiUsdcQiInvestmentValueDecimal = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_MAI_USDC_QI_INVESTMENT_PAIR_BLOCK))) {
    maiUsdcQiInvestmentValueDecimal = getMaiUsdcInvestmentValue()
    qiMarketValue = getQiMarketValue()
  }

  let qiWmaticMarketValue = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_QI_WMATIC_PAIR_BLOCK))) {
    qiWmaticMarketValue = getQiWmaticMarketValue()
  }
  let qiWmaticQiInvestmentMarketValue = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_QI_WMATIC_INVESTMENT_PAIR_BLOCK))) {
    qiWmaticQiInvestmentMarketValue = getQiWmaticInvestmentMarketValue()
  }

  let pearlWmaticMarketValue = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(UNI_PEARL_WMATIC_PAIR_BLOCK))) {
    pearlWmaticMarketValue = getPearlWmaticMarketValue()
  }

  let ocQiMarketValue = BigDecimal.fromString('0')
  if (transaction.blockNumber.gt(BigInt.fromString(QCQI_START_BLOCK))) {
    ocQiMarketValue = getOtterClamQiMarketValue()
  }

  let stableValue = maiBalance.plus(fraxBalance).plus(daiBalance)
  let stableValueDecimal = toDecimal(stableValue, 18)
    .plus(maiUsdcValueDecimal)
    .plus(maiUsdcQiInvestmentValueDecimal)

  let lpValue = clamMai_value
    .plus(clamFrax_value)
    .plus(clamWmatic_value)
    .plus(qiWmaticMarketValue)
    .plus(qiWmaticQiInvestmentMarketValue)
    .plus(pearlWmaticMarketValue)
  let rfvLpValue = clamMai_rfv.plus(clamFrax_rfv).plus(clamWmatic_rfv)

  let mv = stableValueDecimal
    .plus(lpValue)
    .plus(wmatic_value)
    .plus(qiMarketValue)
    .plus(dQuickMarketValue)
    .plus(ocQiMarketValue)
  let rfv = stableValueDecimal.plus(rfvLpValue)

  log.debug('Treasury Market Value {}', [mv.toString()])
  log.debug('Treasury RFV {}', [rfv.toString()])
  log.debug('Treasury MAI value {}', [toDecimal(maiBalance, 18).toString()])
  log.debug('Treasury FRAX value {}', [toDecimal(fraxBalance, 18).toString()])
  log.debug('Treasury DAI value {}', [toDecimal(daiBalance, 18).toString()])
  log.debug('Treasury MAI/USDC value {}', [maiUsdcValueDecimal.toString()])
  log.debug('Treasury Qi Investment MAI/USDC value {}', [maiUsdcQiInvestmentValueDecimal.toString()])
  log.debug('Treasury WMATIC value {}', [wmatic_value.toString()])
  log.debug('Treasury CLAM-MAI RFV {}', [clamMai_rfv.toString()])
  log.debug('Treasury CLAM-FRAX RFV {}', [clamFrax_rfv.toString()])
  log.debug('Treasury Qi Market value {}', [qiMarketValue.toString()])
  log.debug('Treasury dQuick Market value {}', [dQuickMarketValue.toString()])
  log.debug('Treasury Qi/WMATIC Market value {}', [qiWmaticMarketValue.toString()])
  log.debug('Treasury WMATIC/PEARL Market value {}', [pearlWmaticMarketValue.toString()])
  log.debug('Treasury ocQi Market value {}', [ocQiMarketValue.toString()])
  log.debug('Treasury Qi Investment Qi/WMATIC Market value {}', [qiWmaticQiInvestmentMarketValue.toString()])

  return [
    mv,
    rfv,
    maiUsdcValueDecimal,
    maiUsdcQiInvestmentValueDecimal,
    // treasuryMaiRiskFreeValue = MAI RFV * MAI + aMAI
    clamMai_rfv.plus(toDecimal(maiBalance, 18)),
    // treasuryMaiMarketValue = MAI LP * MAI + aMAI
    clamMai_value.plus(toDecimal(maiBalance, 18)),
    // treasuryFraxRiskFreeValue = FRAX RFV * FRAX
    clamFrax_rfv.plus(toDecimal(fraxBalance, 18)),
    // treasuryFraxMarketValue = FRAX LP * FRAX
    clamFrax_value.plus(toDecimal(fraxBalance, 18)),
    // treasuryDaiRiskFreeValue
    toDecimal(daiBalance, 18),
    clamWmatic_rfv.plus(wmatic_value),
    clamWmatic_value.plus(wmatic_value).plus(pearlWmaticMarketValue),
    qiMarketValue,
    dQuickMarketValue,
    qiWmaticMarketValue,
    qiWmaticQiInvestmentMarketValue,
    ocQiMarketValue,
    // POL
    clamMaiPOL,
    clamFraxPOL,
    clamWmaticPOL,
  ]
}

function getNextCLAMRebase(transaction: Transaction): BigDecimal {
  let staking_contract = OtterStaking.bind(Address.fromString(STAKING_CONTRACT))
  let distribution_v1 = toDecimal(staking_contract.epoch().value3, 9)
  log.debug('next_distribution v2 {}', [distribution_v1.toString()])
  let next_distribution = distribution_v1
  log.debug('next_distribution total {}', [next_distribution.toString()])
  return next_distribution
}

function getAPY_Rebase(sCLAM: BigDecimal, distributedCLAM: BigDecimal): BigDecimal[] {
  let nextEpochRebase = distributedCLAM.div(sCLAM).times(BigDecimal.fromString('100'))

  let nextEpochRebase_number = Number.parseFloat(nextEpochRebase.toString())
  let currentAPY = Math.pow(nextEpochRebase_number / 100 + 1, 1095) * 100

  let currentAPYdecimal = BigDecimal.fromString(currentAPY.toString())

  log.debug('next_rebase {}', [nextEpochRebase.toString()])
  log.debug('current_apy total {}', [currentAPYdecimal.toString()])

  return [currentAPYdecimal, nextEpochRebase]
}

function getAPY_PearlChest(nextEpochRebase: BigDecimal): BigDecimal[] {
  let lake = OtterLake.bind(Address.fromString(OTTER_LAKE_ADDRESS))
  let pearl = OtterPearlERC20.bind(Address.fromString(PEARL_ERC20_CONTRACT))
  let termsCount = lake.termsCount().toI32()
  log.debug('pearl chest termsCount {}', [termsCount.toString()])
  let rebaseRate = Number.parseFloat(nextEpochRebase.toString()) / 100
  log.debug('pearl chest rebaseRate {}', [rebaseRate.toString()])
  let epoch = lake.epochs(lake.epoch())
  let totalNextReward = Number.parseFloat(
    toDecimal(epoch.value4, 18).toString(), // reward
  )
  log.debug('pearl chest totalNextReward {}', [totalNextReward.toString()])
  let totalBoostPoint = 0.0

  let safeBoostPoint = 0.0
  let safePearlBalance = 0.0
  let furryBoostPoint = 0.0
  let furryPearlBalance = 0.0
  let stoneBoostPoint = 0.0
  let stonePearlBalance = 0.0
  let diamondBoostPoint = 0.0
  let diamondPearlBalance = 0.0

  for (let i = 0; i < termsCount; i++) {
    let termAddress = lake.termAddresses(BigInt.fromI32(i))
    let term = lake.terms(termAddress)
    let pearlBalance = Number.parseFloat(toDecimal(pearl.balanceOf(term.value0), 18).toString()) // note
    let boostPoint = (pearlBalance * term.value3) / 100 // multiplier
    log.debug('pearl chest terms i = {}, boostPoint = {}, lockPeriod = {}, pearlBalance = {}', [
      i.toString(),
      boostPoint.toString(),
      term.value2.toString(),
      pearlBalance.toString(),
    ])

    totalBoostPoint += boostPoint
    if (term.value2.equals(BigInt.fromI32(42))) {
      // lock days = 14 -> safe hand
      safeBoostPoint += boostPoint
      safePearlBalance += pearlBalance
    }
    if (term.value2.equals(BigInt.fromI32(84))) {
      // lock days = 28 -> furry hand
      furryBoostPoint += boostPoint
      furryPearlBalance += pearlBalance
    }
    if (term.value2.equals(BigInt.fromI32(270))) {
      // lock days = 90 -> stone hand
      stoneBoostPoint += boostPoint
      stonePearlBalance += pearlBalance
    }
    if (term.value2.equals(BigInt.fromI32(540))) {
      // lock days = 189 -> diamond hand
      diamondBoostPoint += boostPoint
      diamondPearlBalance += pearlBalance
    }
  }
  log.debug('pearl chest totalBoostPoint = {}', [totalBoostPoint.toString()])
  log.debug('pearl chest safeBoostPoint = {}, safePearlBalance = {}', [
    safeBoostPoint.toString(),
    safePearlBalance.toString(),
  ])
  let safeHandAPY =
    Math.pow(1 + (safeBoostPoint / totalBoostPoint) * (totalNextReward / safePearlBalance) + rebaseRate, 1095) * 100
  log.debug('pearl chest safeHandAPY = {}', [safeHandAPY.toString()])
  log.debug('pearl chest furryBoostPoint = {}, furryPearlBalance = {}', [
    furryBoostPoint.toString(),
    furryPearlBalance.toString(),
  ])
  let furryHandAPY =
    Math.pow(1 + (furryBoostPoint / totalBoostPoint) * (totalNextReward / furryPearlBalance) + rebaseRate, 1095) * 100
  log.debug('pearl chest furryHandAPY = {}', [furryHandAPY.toString()])
  log.debug('pearl chest stoneBoostPoint = {}, stonePearlBalance = {}', [
    stoneBoostPoint.toString(),
    stonePearlBalance.toString(),
  ])
  let stoneHandAPY =
    Math.pow(1 + (stoneBoostPoint / totalBoostPoint) * (totalNextReward / stonePearlBalance) + rebaseRate, 1095) * 100
  log.debug('pearl chest stoneHandAPY = {}', [stoneHandAPY.toString()])
  log.debug('pearl chest diamonBoostPoint = {}, diamondPearlBalance = {}', [
    diamondBoostPoint.toString(),
    diamondPearlBalance.toString(),
  ])
  let diamondHandAPY =
    Math.pow(1 + (diamondBoostPoint / totalBoostPoint) * (totalNextReward / diamondPearlBalance) + rebaseRate, 1095) *
    100
  log.debug('pearl chest diamondHandAPY = {}', [stoneHandAPY.toString()])
  return [
    BigDecimal.fromString(safeHandAPY.toString()),
    BigDecimal.fromString(furryHandAPY.toString()),
    BigDecimal.fromString(stoneHandAPY.toString()),
    BigDecimal.fromString(diamondHandAPY.toString()),
  ]
}

function getRunway(totalSupply: BigDecimal, rfv: BigDecimal): BigDecimal[] {
  let runway2dot5k = BigDecimal.fromString('0')
  let runway5k = BigDecimal.fromString('0')
  let runway7dot5k = BigDecimal.fromString('0')
  let runway10k = BigDecimal.fromString('0')
  let runway20k = BigDecimal.fromString('0')
  let runway50k = BigDecimal.fromString('0')
  let runway70k = BigDecimal.fromString('0')
  let runway100k = BigDecimal.fromString('0')
  let runwayCurrent = BigDecimal.fromString('0')

  let rebaseRate = BigDecimal.fromString('0')
  let distirbutor = OtterStakingDistributor.bind(Address.fromString(STAKING_DISTRIBUTOR_CONTRACT))

  for (let i = 0; i < 10; i++) {
    let info = distirbutor.try_info(BigInt.fromI32(i))
    if (info.reverted) {
      break
    }
    let rate = toDecimal(info.value.value0, 4) // 1% =  10000
    rebaseRate = rebaseRate.plus(rate)
    log.debug('i = {}, distribute rate = {}%', [i.toString(), rate.toString()])
  }
  log.debug('total distribute rate = {}%', [rebaseRate.toString()])

  if (
    totalSupply.gt(BigDecimal.fromString('0')) &&
    rfv.gt(BigDecimal.fromString('0')) &&
    rebaseRate.gt(BigDecimal.fromString('0'))
  ) {
    let treasury_runway = Number.parseFloat(rfv.div(totalSupply).toString())

    let runway2dot5k_num = Math.log(treasury_runway) / Math.log(1 + 0.0029438) / 3
    let runway5k_num = Math.log(treasury_runway) / Math.log(1 + 0.003579) / 3
    let runway7dot5k_num = Math.log(treasury_runway) / Math.log(1 + 0.0039507) / 3
    let runway10k_num = Math.log(treasury_runway) / Math.log(1 + 0.00421449) / 3
    let runway20k_num = Math.log(treasury_runway) / Math.log(1 + 0.00485037) / 3
    let runway50k_num = Math.log(treasury_runway) / Math.log(1 + 0.00569158) / 3
    let runway70k_num = Math.log(treasury_runway) / Math.log(1 + 0.00600065) / 3
    let runway100k_num = Math.log(treasury_runway) / Math.log(1 + 0.00632839) / 3
    let nextEpochRebase_number = Number.parseFloat(rebaseRate.toString()) / 100
    let runwayCurrent_num = Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number) / 3

    runway2dot5k = BigDecimal.fromString(runway2dot5k_num.toString())
    runway5k = BigDecimal.fromString(runway5k_num.toString())
    runway7dot5k = BigDecimal.fromString(runway7dot5k_num.toString())
    runway10k = BigDecimal.fromString(runway10k_num.toString())
    runway20k = BigDecimal.fromString(runway20k_num.toString())
    runway50k = BigDecimal.fromString(runway50k_num.toString())
    runway70k = BigDecimal.fromString(runway70k_num.toString())
    runway100k = BigDecimal.fromString(runway100k_num.toString())
    runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString())
  }

  return [runway2dot5k, runway5k, runway7dot5k, runway10k, runway20k, runway50k, runway70k, runway100k, runwayCurrent]
}

export function updateProtocolMetrics(transaction: Transaction): void {
  let pm = loadOrCreateProtocolMetric(transaction.timestamp)

  //Total Supply
  pm.totalSupply = getTotalSupply()

  //Circ Supply
  pm.clamCirculatingSupply = getCirculatingSupply(transaction, pm.totalSupply)

  //sClam Supply
  pm.sClamCirculatingSupply = getSClamSupply(transaction)

  //CLAM Price
  pm.clamPrice = getClamUsdRate()

  //CLAM Market Cap
  pm.marketCap = pm.clamCirculatingSupply.times(pm.clamPrice)

  //Total Value Locked
  pm.totalValueLocked = pm.sClamCirculatingSupply.times(pm.clamPrice)

  //Treasury RFV and MV
  let mv_rfv = getMV_RFV(transaction)
  pm.treasuryMarketValue = mv_rfv[0]
  pm.treasuryRiskFreeValue = mv_rfv[1]
  pm.treasuryMaiUsdcRiskFreeValue = mv_rfv[2]
  pm.treasuryMaiUsdcQiInvestmentRiskFreeValue = mv_rfv[3]
  pm.treasuryMaiRiskFreeValue = mv_rfv[4]
  pm.treasuryMaiMarketValue = mv_rfv[5]
  pm.treasuryFraxRiskFreeValue = mv_rfv[6]
  pm.treasuryFraxMarketValue = mv_rfv[7]
  pm.treasuryDaiRiskFreeValue = mv_rfv[8]
  pm.treasuryWmaticRiskFreeValue = mv_rfv[9]
  pm.treasuryWmaticMarketValue = mv_rfv[10]
  pm.treasuryQiMarketValue = mv_rfv[11]
  pm.treasuryDquickMarketValue = mv_rfv[12]
  pm.treasuryQiWmaticMarketValue = mv_rfv[13]
  pm.treasuryQiWmaticQiInvestmentMarketValue = mv_rfv[14]
  pm.treasuryOtterClamQiMarketValue = mv_rfv[15]
  pm.treasuryClamMaiPOL = mv_rfv[16]
  pm.treasuryClamFraxPOL = mv_rfv[17]
  pm.treasuryClamWmaticPOL = mv_rfv[18]

  // Rebase rewards, APY, rebase
  pm.nextDistributedClam = getNextCLAMRebase(transaction)
  let apy_rebase = getAPY_Rebase(pm.sClamCirculatingSupply, pm.nextDistributedClam)
  pm.currentAPY = apy_rebase[0]
  pm.nextEpochRebase = apy_rebase[1]
  if (transaction.blockNumber.gt(BigInt.fromString(PEARL_CHEST_BLOCK))) {
    let chestAPYs = getAPY_PearlChest(pm.nextEpochRebase)
    pm.safeHandAPY = chestAPYs[0]
    pm.furryHandAPY = chestAPYs[1]
    pm.stoneHandAPY = chestAPYs[2]
    pm.diamondHandAPY = chestAPYs[3]
  }

  //Runway
  let runways = getRunway(pm.totalSupply, pm.treasuryRiskFreeValue)
  pm.runway2dot5k = runways[0]
  pm.runway5k = runways[1]
  pm.runway7dot5k = runways[2]
  pm.runway10k = runways[3]
  pm.runway20k = runways[4]
  pm.runway50k = runways[5]
  pm.runway70k = runways[6]
  pm.runway100k = runways[7]
  pm.runwayCurrent = runways[8]

  pm.save()
}
