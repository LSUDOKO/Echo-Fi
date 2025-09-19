"use client"

import { useWriteContract, useReadContract } from 'wagmi'
import { stakingContractAbi } from '@/lib/abi/stakingContract'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useAccount } from 'wagmi'

const STAKING_CONTRACT_ADDRESS = '0x5e44F178E8cF9B2F5409B6f18ce936aB817C5a11'; // Example Address, replace with your actual contract address

export function Staking() {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();

  const { writeContract } = useWriteContract()
  const { data: stakedBalance, refetch } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingContractAbi,
    functionName: 'staked',
    args: [address],
  });

  const handleStake = async () => {
    if (!amount) return;
    writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingContractAbi,
      functionName: 'stake',
      args: [parseEther(amount)],
    },
    {
      onSuccess: () => {
        refetch();
      }
    })
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Stake Your Tokens</h3>
      <div className="mb-4">
        Your staked balance: {stakedBalance ? (stakedBalance as bigint).toString() : '0'}
      </div>
      <div className="flex gap-2">
        <Input 
          type="text" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount to stake"
        />
        <Button onClick={handleStake}>Stake</Button>
      </div>
    </div>
  )
}
