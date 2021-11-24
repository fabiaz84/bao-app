import React, { useState } from 'react'
import { getComptrollerContract } from 'bao/utils'
import Table from 'components/Table'
import { commify } from 'ethers/lib/utils'
import { useAccountLiquidity } from 'hooks/hard-synths/useAccountLiquidity'
import {
	useAccountBalances,
	useBorrowBalances,
	useSupplyBalances,
} from 'hooks/hard-synths/useBalances'
import { useExchangeRates } from 'hooks/hard-synths/useExchangeRates'
import { useAccountMarkets, useMarkets } from 'hooks/hard-synths/useMarkets'
import { usePrices } from 'hooks/hard-synths/usePrices'
import useBao from 'hooks/useBao'
import { FormCheck } from 'react-bootstrap'
import { SupportedMarket } from '../../../bao/lib/types'
import { decimate } from '../../../utils/numberFormat'
import {
	Flex,
	HeaderWrapper,
	ItemWrapper,
	MarketContainer,
	MarketHeader,
	MarketHeaderContainer,
	MarketHeaderStack,
	MarketHeaderSubText,
	MarketHeaderText,
	MarketTableContainer,
	OverviewTableContainer,
} from './styles'

export const Supply: React.FC = () => {
	// const [modalAsset, setModalAsset] = useState<Market>()
	// const { isOpen, onOpen, onClose } = useDisclosure()

	// const handleSupply = (asset: Market) => {
	// 	setModalAsset(asset)
	// 	onOpen()
	//   }

	const balances = useAccountBalances()
	const markets = useMarkets()

	const columns = [
		{
			header: <HeaderWrapper>Asset</HeaderWrapper>,
			value(market: SupportedMarket) {
				// underlying symbol
				const { symbol } = balances.find(
					(balance) =>
						balance.address.toLowerCase() === market.underlying.toLowerCase(),
				)

				return (
					<ItemWrapper>
						<img src={market.icon} />
						<p>{symbol}</p>
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper
					style={{ justifyContent: 'center', textAlign: 'center' }}
				>
					APY
				</HeaderWrapper>
			),
			value({ supplyApy }: SupportedMarket) {
				return (
					<ItemWrapper
						style={{ justifyContent: 'center', textAlign: 'center' }}
					>
						{supplyApy ? `${supplyApy.toFixed(2)}%` : '-'}
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
					Wallet
				</HeaderWrapper>
			),
			value(market: SupportedMarket) {
				// underlying balance & symbol
				const { balance, symbol } = balances.find(
					(balance) =>
						balance.address.toLowerCase() === market.underlying.toLowerCase(),
				)

				return (
					<ItemWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
						{`${balance.toFixed(2)} ${symbol}`}
					</ItemWrapper>
				)
			},
		},
	]

	return (
		<>
			<Flex>
				<MarketContainer>
					<MarketHeaderContainer>
						<MarketHeaderStack>
							<MarketHeader>
								<Flex>
									<MarketHeaderText>Supply</MarketHeaderText>
								</Flex>
								<Flex>
									<MarketHeaderSubText>
										Earn interest on your deposits
									</MarketHeaderSubText>
								</Flex>
							</MarketHeader>
						</MarketHeaderStack>
					</MarketHeaderContainer>
					<MarketTableContainer>
						<Table columns={columns} items={markets} />
					</MarketTableContainer>
				</MarketContainer>
			</Flex>
		</>
	)
}

export const Borrow = () => {
	// const [handleBorrow] = useModal(<MarketBorrowModal />)
	const [modalAsset, setModalAsset] = useState<SupportedMarket>()

	const balances = useAccountBalances()
	const markets = useMarkets()
	const { prices } = usePrices()

	const columns = [
		{
			header: <HeaderWrapper>Asset</HeaderWrapper>,
			value(market: SupportedMarket) {
				// underlying symbol
				const { symbol } = balances.find(
					(balance) =>
						balance.address.toLowerCase() === market.underlying.toLowerCase(),
				)

				return (
					<ItemWrapper>
						<img src={market.icon} />
						<p>{symbol}</p>
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper
					style={{ justifyContent: 'center', textAlign: 'center' }}
				>
					APR
				</HeaderWrapper>
			),
			value({ borrowApy }: SupportedMarket) {
				return (
					<ItemWrapper
						style={{ justifyContent: 'center', textAlign: 'center' }}
					>
						{borrowApy ? `${borrowApy.toFixed(2)}%` : '-'}
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
					Liquidity
				</HeaderWrapper>
			),
			value(market: SupportedMarket) {
				return (
					<ItemWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
						{market.liquidity && prices
							? `$${commify(
									(
										(market.liquidity *
											(prices[market.coingeckoId]?.usd || 1)) /
										1e6
									).toFixed(2),
							  )}M`
							: '-'}
					</ItemWrapper>
				)
			},
		},
	]

	return (
		<>
			<Flex>
				<MarketContainer>
					<MarketHeaderContainer>
						<MarketHeaderStack>
							<MarketHeader>
								<Flex>
									<MarketHeaderText>Borrow</MarketHeaderText>
								</Flex>
								<Flex>
									<MarketHeaderSubText>
										Borrow against your supplied collateral
									</MarketHeaderSubText>
								</Flex>
							</MarketHeader>
						</MarketHeaderStack>
					</MarketHeaderContainer>
					<MarketTableContainer>
						<Table columns={columns} items={markets} />
					</MarketTableContainer>
				</MarketContainer>
			</Flex>
		</>
	)
}

export const Supplied: React.FC = () => {
	const bao = useBao()
	const markets = useMarkets()
	// const accountLiquidity = useAccountLiquidity()
	const balances = useSupplyBalances()
	const { exchangeRates } = useExchangeRates()
	const accountMarkets = useAccountMarkets()
	const [modalAsset, setModalAsset] = useState<SupportedMarket>()

	// const [handleSupply] = useModal(<MarketSupplyModal />)

	const columns = [
		{
			header: <HeaderWrapper>Asset</HeaderWrapper>,
			value(market: SupportedMarket) {
				// underlying symbol

				return (
					<ItemWrapper>
						<img src={market.icon} />
						<p>{market.underlyingSymbol}</p>
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper
					style={{ justifyContent: 'center', textAlign: 'center' }}
				>
					APY
				</HeaderWrapper>
			),
			value({ supplyApy }: SupportedMarket) {
				return (
					<ItemWrapper
						style={{ justifyContent: 'center', textAlign: 'center' }}
					>
						{supplyApy ? `${supplyApy.toFixed(2)}%` : '-'}
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
					Balance
				</HeaderWrapper>
			),
			value({ token, underlyingSymbol }: SupportedMarket) {
				// underlying balance & symbol
				const balanceRes =
					balances &&
					balances.find(
						(balance) => balance.address.toLowerCase() === token.toLowerCase(),
					)
				const balance = balanceRes ? balanceRes.balance : 0
				const exchangeRate = decimate(exchangeRates[token])
				const suppliedBalance = balance * exchangeRate.toNumber()

				return (
					<ItemWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
						{`${suppliedBalance.toFixed(2)} ${underlyingSymbol}`}
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
					Collateral
				</HeaderWrapper>
			),
			value(market: SupportedMarket) {
				const isEnabled =
					accountMarkets && accountMarkets.find((market) => market.token)

				return (
					// underlying balance & symbol
					<ItemWrapper
						style={{ justifyContent: 'center', textAlign: 'center' }}
						onClick={(event: React.MouseEvent<HTMLElement>) => {
							event.stopPropagation()
							const contract = getComptrollerContract(bao)
							if (isEnabled) {
								contract.methods.exitMarket(market.token)
							} else {
								contract.methods.enterMarket([market.token])
							}
						}}
					>
						<FormCheck type="switch" id="custom-switch" checked={!!isEnabled} />
					</ItemWrapper>
				)
			},
		},
	]

	return (
		<>
			<OverviewTableContainer>
				<Table
					columns={columns}
					items={
						markets &&
						balances &&
						markets.filter(
							(market: SupportedMarket) =>
								balances.find((balance) => balance.address === market.token) &&
								balances.find((balance) => balance.address === market.token)
									.balance *
									exchangeRates[market.token].toNumber() >=
									0.01,
						)
					}
				/>
			</OverviewTableContainer>
		</>
	)
}

export const Borrowed: React.FC = () => {
	const markets = useMarkets()
	const accountLiquidity = useAccountLiquidity()
	const balances = useBorrowBalances()
	const { exchangeRates } = useExchangeRates()
	// const accountMarkets = useAccountMarkets()
	const [modalAsset, setModalAsset] = useState<SupportedMarket>()

	// const [handleSupply] = useModal(<MarketSupplyModal />)

	const columns = [
		{
			header: <HeaderWrapper>Asset</HeaderWrapper>,
			value(market: SupportedMarket) {
				// underlying symbol

				return (
					<ItemWrapper>
						<img src={market.icon} />
						<p>{market.symbol}</p>
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper
					style={{ justifyContent: 'center', textAlign: 'center' }}
				>
					APR
				</HeaderWrapper>
			),
			value({ borrowApy }: SupportedMarket) {
				return (
					<ItemWrapper
						style={{ justifyContent: 'center', textAlign: 'center' }}
					>
						{borrowApy ? `${borrowApy.toFixed(2)}%` : '-'}
					</ItemWrapper>
				)
			},
		},
		{
			header: (
				<HeaderWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
					Balance
				</HeaderWrapper>
			),
			value(market: SupportedMarket) {
				// underlying balance & symbol
				const balanceRes =
					balances &&
					balances.find(
						(balance) =>
							balance.address.toLowerCase() === market.token.toLowerCase(),
					)
				const { balance } = balanceRes || { balance: 0, symbol: null }

				return (
					<ItemWrapper style={{ justifyContent: 'flex-end', textAlign: 'end' }}>
						{`${balance.toFixed(2)} ${market.symbol}`}
					</ItemWrapper>
				)
			},
		},
	]

	return (
		<>
			<OverviewTableContainer>
				{accountLiquidity ? (
					<Table
						columns={columns}
						items={markets.filter(
							(market: SupportedMarket) =>
								balances.find((balance) => balance.address === market.token) &&
								balances.find((balance) => balance.address === market.token)
									.balance *
								exchangeRates[market.token].toNumber() >=
								0.01,
						)}
					/>
				) : (
					<ItemWrapper> You don't have any borrowed assets. </ItemWrapper>
				)}
			</OverviewTableContainer>
		</>
	)
}
