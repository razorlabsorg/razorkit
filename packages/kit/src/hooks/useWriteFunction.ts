import { InputEntryFunctionData } from "@aptos-labs/ts-sdk"
import { useModule } from "./useModule"
import { useQuery } from "@tanstack/react-query"

export function useWriteFunction(args: {
  address: string
  moduleName: string
  functionName: string
  functionArguments: InputEntryFunctionData['functionArguments']
  typeArguments?: InputEntryFunctionData['typeArguments']
}) {
  const { write } = useModule(args.address, args.moduleName)

  const writeFunction = async () => {
    return await write(args.functionName, args.functionArguments, args.typeArguments)
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: [args.address, args.moduleName, args.functionName, args.functionArguments, args.typeArguments],
    queryFn: writeFunction,
    retry: 5,
  })

  return { isLoading, data, refetch }
}