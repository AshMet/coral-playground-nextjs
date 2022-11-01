/*eslint-disable*/
import React from 'react';
import { Flex, Icon, Text, Link } from '@chakra-ui/react';
import { BrandLogo } from 'components/icons/Icons';
export default function Footer() {
	return (
		<Link href='https://coralplayground.com/'>
			<Flex
				px={{
					base: '20px',
					xl: 'unset'
				}}
				bg={'linear-gradient(180deg, #603CFF 0%, #3609FF 100%)'}
				w='100%'
				bgPosition='center'
				h={{ base: '60px', lg: '60px' }}
				bgSize='cover'>
				<Flex mx='auto' my='auto' align='center' w='100%' maxW='1170px' justifyContent='space-between'>
					<Flex flexDirection='row' mx='auto'>
						<Icon me={{ base: '10px', lg: '10px' }} as={BrandLogo} color='white' w='16px' h='16px' />
						<Text
							fontSize={{ base: 'sm', md: 'sm' }}
							mb='unset'
							color='white'
							lineHeight='120%'
							textAlign='center'
							fontWeight='700'>
							We've just released the Horizon UI's feedback hub! A better way to submit your feedback and
							ideas! 🏆
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
}
