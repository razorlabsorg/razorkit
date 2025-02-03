import { InputViewFunctionData } from "@aptos-labs/ts-sdk"
import { useModule } from "./useModule"
import { useQuery } from "@tanstack/react-query"

export function useViewFunction(args: {
  address: string
  moduleName: string
  functionName: string
  functionArguments: InputViewFunctionData['functionArguments']
  typeArguments?: InputViewFunctionData['typeArguments']
}) {
  const { view } = useModule(args.address, args.moduleName)

  const viewFunction = async () => {
    return await view(args.functionName, args.functionArguments, args.typeArguments)
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: [args.address, args.moduleName, args.functionName, args.functionArguments, args.typeArguments],
    queryFn: viewFunction,
    retry: 5,
  })

  return { isLoading, data, refetch }
}