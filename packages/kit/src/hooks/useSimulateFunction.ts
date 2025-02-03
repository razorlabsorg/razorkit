import { InputEntryFunctionData } from "@aptos-labs/ts-sdk"
import { useModule } from "./useModule"
import { useQuery } from "@tanstack/react-query"

export function useSimulateFunction(args: {
  address: string
  moduleName: string
  functionName: string
  functionArguments: InputEntryFunctionData['functionArguments']
  typeArguments?: InputEntryFunctionData['typeArguments']
}) {
  const { simulate } = useModule(args.address, args.moduleName)

  const simulateFunction = async () => {
    return await simulate(args.functionName, args.functionArguments, args.typeArguments)
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: [args.address, args.moduleName, args.functionName, args.functionArguments, args.typeArguments],
    queryFn: simulateFunction,
    retry: 5,
  })

  return { isLoading, data, refetch }
}