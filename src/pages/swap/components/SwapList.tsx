import { ListHeader } from '@/components/List'
import Tooltipped from '@/components/Tooltipped'
import Typography from '@/components/Typography'
import Image from 'next/future/image'
import React, { useState } from 'react'
import Config from '@/bao/lib/config'
import { SwapToken } from '@/bao/lib/types'
import Modal from '@/components/Modal'

export const SwapList: React.FC = () => {
	const swapTokens = Config.swapTokens

	return (
		<>
			<ListHeader headers={['Token', 'Platform']} />
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					{swapTokens && swapTokens.map(swapToken => <SwapListItem token={swapToken} key={swapToken.id} />)}
				</div>
			</div>
		</>
	)
}

const SwapListItem: React.FC<SwapListItemProps> = ({ token }) => {
	// const balance = useBalancerPoolInfo(token)
	// const [formattedBalance, setFormattedBalance] = useState(null)
	const [showIframe, setShowIframe] = useState(false)
	const [platform, setPlatform] = useState(null)

	//	useEffect(() => {
	//		if (balance) setFormattedBalance(getDisplayBalance(balance.tokenBalance, balance.tokenDecimals))
	//	}, [balance])

	const handleClick = (platform: any) => {
		setPlatform(platform)
		setShowIframe(!showIframe)
	}

	return (
		<>
			{token.platforms.map((platform: any, index) => {
				return (
					<button
						className='glassmorphic-card w-full px-4 py-3 duration-300 hover:border-baoRed hover:bg-baoRed hover:bg-opacity-20'
						onClick={() => handleClick(platform)}
						key={index}
					>
						<div className='flex w-full flex-row'>
							<div className='flex w-full'>
								<div className='my-auto flex place-items-center'>
									<Image src={token.icon} alt={token.name} className={`inline-block`} height={32} width={32} />
									<span className='inline-block text-left align-middle'>
										<Typography variant='lg' className='ml-2 font-bakbak'>
											{token.name}
										</Typography>
									</span>
								</div>
							</div>

							{/*
								<div className='mx-auto my-0 flex w-full items-center font-bakbak text-lg justify-center'>
									{formattedBalance ? formattedBalance : <Loader />}
						</div>
						*/}

							<div className='mx-auto my-0 flex w-full flex-auto items-end justify-end text-right'>
								<Tooltipped content={platform.name} key={platform.name} placement='bottom'>
									<span className={`ml-5 select-none duration-200 flex place-items-center`}>
										<Image src={platform.icon} alt={platform.name} height={32} width={32} />
									</span>
								</Tooltipped>
							</div>
						</div>
					</button>
				)
			})}
			<Modal
				isOpen={showIframe}
				onDismiss={() => setShowIframe(!showIframe)}
				background={platform && platform.background}
				backgroundOpacity='bg-opacity-100'
			>
				<iframe
					title={platform && platform.name + ' Widget'}
					name={platform && platform.name + ' Widget'}
					src={platform && platform.url}
					width='450px'
					height='750px'
					allow='fullscreen'
					marginWidth={parseInt('0')}
					marginHeight={parseInt('0')}
					frameBorder={parseInt('0')}
					scrolling='no'
					loading='eager'
				></iframe>
			</Modal>
		</>
	)
}

export default SwapList

type SwapListItemProps = {
	token: SwapToken
}
